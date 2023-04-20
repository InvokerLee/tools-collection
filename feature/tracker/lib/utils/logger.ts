import { InitOptions } from '../types/index'
import { deepClone } from '../utils'

const PREFIX: string = 'TRACKER'

class Logger {
  private _console: Console = {} as Console
  open: boolean = false
  
  constructor(options: InitOptions) {
    if (!console) return
    // this._console = window.console
    this._console = deepClone(window.console); // 可以防止window.console被重写后触发里面的方法
    
    const { debug } = options
    if (debug) {
      this.open = debug
    }
  }
  
  log(...args: any[]) {
    if (!this.open) return
    this._console.log(`${PREFIX}[Log]:`, ...args)
  }
  warn(...args: any[]): void {
    if (!this.open) return

    this._console.warn(`${PREFIX}[Warn]:`, ...args)
  }
  error(...args: any[]): void {
    if (!this.open) return
    this._console.error(`${PREFIX}[Error]:`, ...args)
  }
}

let logger: Logger
export function initLogger(options: InitOptions = {}): void {
  logger = logger || new Logger(options)
}

export { logger }