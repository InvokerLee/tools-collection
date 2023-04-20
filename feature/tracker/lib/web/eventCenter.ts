import { TRACE_DATA_TYPE, LEVEL, ERROR_TYPE } from '@/shared/constant'
import { ReportData, ResourceTarget, ConsoleData, DomData, RouteData } from '@/types'
import { trace, report } from '@/core'
import { getLocationHref, getTimestamp, formatErrorStack, htmlEleToString } from '@/utils'

export const eventCenter = {
  onError(e: ErrorEvent) {
    const isResc = [HTMLScriptElement, HTMLLinkElement, HTMLImageElement].some((ele) => e.target instanceof ele);
    // 资源加载错误
    if (isResc) {
      const t = e.target as ResourceTarget
      const data: ReportData = {
        type: ERROR_TYPE.RESOURCE_ERROR,
        location: getLocationHref(),
        time: getTimestamp(),
        message: `Tag(${t.tagName})加载失败: ${t.src || t.href}`,
        name: t.tagName,
        level: LEVEL.LOW
      };
      
      trace.push({
        type: TRACE_DATA_TYPE.CODE_ERROR,
        group: trace.getTypeGroup(TRACE_DATA_TYPE.CODE_ERROR),
        data
      })
      report.send(data)
      return
    }

    // 运行时错误
    const { message, lineno, colno, error } = e
    const data: ReportData = {
      type: ERROR_TYPE.JAVASCRIPT_ERROR,
      location: getLocationHref(),
      time: getTimestamp(),
      message,
      colno,
      lineno,
      level: LEVEL.HIGH,
    }

    if (error && error.stack) {
      data.name = error.name;
      data.stack = formatErrorStack(error)
    }

    trace.push({
      type: TRACE_DATA_TYPE.CODE_ERROR,
      group: trace.getTypeGroup(TRACE_DATA_TYPE.CODE_ERROR),
      data
    })
    report.send(data)
  },

  onXhr(xhrInfo: ReportData) {
    const { response } = xhrInfo;
    const isError = !response || response.status === 0 || response.status > 401;
    const data: ReportData = {
      ...xhrInfo,
      location: getLocationHref(),
      message: 'Ok',
    }
    // 不是错误不需要上报，仅记录
    if (!isError) {
      trace.push({
        type: TRACE_DATA_TYPE.XHR,
        group: trace.getTypeGroup(TRACE_DATA_TYPE.XHR),
        data
      })
      return;
    }

    data.type = ERROR_TYPE.HTTP_ERROR
    data.level = LEVEL.HIGH
    trace.push({
      type: TRACE_DATA_TYPE.CODE_ERROR,
      group: trace.getTypeGroup(TRACE_DATA_TYPE.CODE_ERROR),
      data,
    })
    report.send(data)
  },

  onConsole(data: ConsoleData) {
    trace.push({
      type: TRACE_DATA_TYPE.CONSOLE,
      group: trace.getTypeGroup(TRACE_DATA_TYPE.CONSOLE),
      data,
    })
  },

  onUnhandledRejection(pre: PromiseRejectionEvent) {
    const data: ReportData = {
      type: ERROR_TYPE.PROMISE_ERROR,
      name: pre.type,
      message: pre.reason,
      location: getLocationHref(),
      time: getTimestamp(),
      level: LEVEL.LOW,
    }
    trace.push({
      type: TRACE_DATA_TYPE.CODE_ERROR,
      group: trace.getTypeGroup(TRACE_DATA_TYPE.CODE_ERROR),
      data,
    })
    report.send(data)
  },

  onDom(data: DomData) {
    const { target } = data;
    if (!target) return;
    const tagStr = htmlEleToString(target);
    if (!tagStr) return;
    trace.push({
      type: TRACE_DATA_TYPE.CLICK,
      group: trace.getTypeGroup(TRACE_DATA_TYPE.CLICK),
      data,
    })
  },

  onHistory(data: RouteData) {
    trace.push({
      type: TRACE_DATA_TYPE.ROUTE,
      group: trace.getTypeGroup(TRACE_DATA_TYPE.ROUTE),
      data,
    })
  },

  onHashChange(e: HashChangeEvent) {
    const { oldURL, newURL } = e;
    const data: RouteData = {
      from: oldURL,
      to: newURL,
    }
    trace.push({
      type: TRACE_DATA_TYPE.ROUTE,
      group: trace.getTypeGroup(TRACE_DATA_TYPE.ROUTE),
      data,
    })
  }
};
