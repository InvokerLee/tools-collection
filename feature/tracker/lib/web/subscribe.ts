import { MONITOR_EVENTS } from '@/shared/constant'
import { THROTTLE_TIME } from '@/shared/config'
import { SubscribeHandler, SubscribeCallback, VoidFunc } from '@/types'
import { logger } from '@/utils/logger'
import { replaceAttr, getTimestamp, throttle, getLocationHref } from '@/utils'

// 事件订阅和发布
const handlers: { [key in MONITOR_EVENTS]?: SubscribeCallback } = {}
function subscribe(handler: SubscribeHandler) {
  const { type, callback } = handler;
  if (type && callback) {
    handlers[type] = callback;
  }
}
function notify(type: MONITOR_EVENTS, data: any) {
  if (!type) return
  try {
    handlers[type]?.(data)
  } catch (error) {
    logger.error(`注册${type}事件的回调发生错误\n${error}`)
  }
}

export function subscribeAndReplace(handler: SubscribeHandler) {
  subscribe(handler)
  replace(handler.type)
}

function replace(type: MONITOR_EVENTS) {
  if (!window) return;
  switch (type) {
    case MONITOR_EVENTS.ERROR:
      errorHandle()
      break
    case MONITOR_EVENTS.XHR:
      xhrHandle()
      break
    case MONITOR_EVENTS.CONSOLE:
      consoleHandle()
      break
    case MONITOR_EVENTS.UNHANDLEDREJECTION:
      unhandledRejectionHandle()
      break
    case MONITOR_EVENTS.DOM:
      domHandle()
      break
    case MONITOR_EVENTS.HISTORY:
      histroyHandle()
      break
    case MONITOR_EVENTS.HASHCHANGE:
      hashChangeHandle()
      break
    default:
      break
  }
}

function errorHandle() {
  window.addEventListener('error', (e: ErrorEvent) => {
    notify(MONITOR_EVENTS.ERROR, e)
  }, true)
}

function xhrHandle() {
  if (!('XMLHttpRequest' in window) ) return
  const oldXhrPrototype = XMLHttpRequest.prototype;
  // 重写XMLHttpRequest.prototype.open
  replaceAttr(oldXhrPrototype, 'open', (oldOpen: VoidFunc): VoidFunc => {
    return function(this: any, ...args: any[]): void {
      this.xhr_temp_data = {
        method: String(args[0]).toUpperCase(),
        url: args[1],
      }
      oldOpen.apply(this, <any>args)
    }
  })

  replaceAttr(oldXhrPrototype, 'send', (oldSend: VoidFunc): VoidFunc => {
    return function(this: any, ...args: any[]) {
      const time = getTimestamp();
      this.addEventListener('loadend', (event: ProgressEvent) => {
        // ***event.currentTarget === this(xhr对象)***
        const { status, response, responseType } = event.currentTarget as XMLHttpRequest;
        if (!this.xhr_temp_data) return

        const { method, url } = this.xhr_temp_data;
        let resData = '';
        if (['', 'json', 'text'].includes(responseType)) {
          resData = typeof response === 'object' ? JSON.stringify(response) : response
        }
        notify(MONITOR_EVENTS.XHR, {
          time,
          request: {
            method,
            url,
            data: args[0]
          },
          response: {
            status,
            data: resData,
            duration: getTimestamp() - time
          }
        })
      }, true)
      oldSend.apply(this, <any>args)
    }
  })
}

function consoleHandle() {
  if (!('console' in window) ) return
  const _console = window.console;
  const supportType: string[] = ['log', 'warn', 'error', 'dsjkah'];
  for (let i = 0; i < supportType.length; i++) {
    const type = supportType[i];
    if (!(type in _console)) continue
    replaceAttr(_console, type, (oldFunc: VoidFunc): VoidFunc => {
      return function(...args: any[]) {
        if (oldFunc) {
          notify(MONITOR_EVENTS.CONSOLE, { type, args })
          oldFunc.apply(_console, <any>args)
        }
      }
    })
  }
}

function unhandledRejectionHandle() {
  window.addEventListener('unhandledrejection', (pre: PromiseRejectionEvent) => {
    notify(MONITOR_EVENTS.UNHANDLEDREJECTION, pre)
  })
}

function domHandle() {
  if (!('document' in window) ) return
  const throttleNotify = throttle(notify, THROTTLE_TIME)
  document.addEventListener('click', ({ target, type }: Event) => {
    throttleNotify(MONITOR_EVENTS.DOM, { target, type })
  }, true)
}

let lastHref: string = getLocationHref()
function histroyHandle() {
  if (!('history' in window) ) return
  if (!('pushState' in window.history) || !('replaceState' in window.history)) return
  const oldHistory = window.history;
  const handleFn = (oldFn: VoidFunc): VoidFunc => {
    return function(this: History, ...args: any[]) {
      const url = args.length > 2 ? String(args[2]) : null
      if (url) {
        const from = lastHref
        const to = url;
        lastHref = to
        notify(MONITOR_EVENTS.HISTORY, {
          from,
          to
        })
      }
      oldFn.apply(this, <any>args)
    }
  }
  replaceAttr(oldHistory, 'pushState', handleFn)
}

function hashChangeHandle() {
  window.addEventListener('hashchange', (e: HashChangeEvent) => {
    notify(MONITOR_EVENTS.HASHCHANGE, e)
  })
}
