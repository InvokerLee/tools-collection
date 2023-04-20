import { MONITOR_EVENTS } from '@/shared/constant'
import { ReportData, DomData, RouteData } from '@/types'
import { subscribeAndReplace } from './subscribe'
import { eventCenter } from './eventCenter'
import { logger } from '@/utils/logger'

const events = [
  {
    type: MONITOR_EVENTS.ERROR,
    callback: (e: ErrorEvent) => {
      eventCenter.onError(e);
    }
  },
  {
    type: MONITOR_EVENTS.XHR,
    callback: (xhrInfo: ReportData) => {
      eventCenter.onXhr(xhrInfo)
    }
  },
  // 暂时不需要
  // {
  //   type: MONITOR_EVENTS.CONSOLE,
  //   callback: (data: ConsoleData) => {
  //     eventCenter.onConsole(data);
  //   }
  // }
  {
    type: MONITOR_EVENTS.UNHANDLEDREJECTION,
    callback: (pre: PromiseRejectionEvent) => {
      eventCenter.onUnhandledRejection(pre)
    }
  },
  {
    type: MONITOR_EVENTS.DOM,
    callback: (data: DomData) => {
      eventCenter.onDom(data);
    }
  },
  {
    type: MONITOR_EVENTS.HISTORY,
    callback: (data: RouteData) => {
      eventCenter.onHistory(data);
    }
  },
  {
    type: MONITOR_EVENTS.HASHCHANGE,
    callback: (e: HashChangeEvent) => {
      eventCenter.onHashChange(e)
    }
  }
]

export function setupMonitor(uninstall: (keyof typeof MONITOR_EVENTS)[] = []) {
  if (!Array.isArray(uninstall)){
    logger.log('unstall字段入参类型错误');
    return;
  }
  // 筛选订阅事件
  const filterEvents = events.filter((v) => !uninstall.includes(v.type))
  logger.log(`已订阅事件(${filterEvents.map(v => v.type).join(',')})`)
  filterEvents.forEach((item) => {
    subscribeAndReplace(item)
  })
}