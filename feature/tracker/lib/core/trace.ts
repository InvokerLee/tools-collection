import { TraceData, InitOptions } from '../types/index'
import { logger } from '../utils/logger'
import { TRACE_DATA_GROUP, TRACE_DATA_TYPE } from '../shared/constant'

const defaultLength = 10;
const maxLength = 50;
class Trace {
  private maxTraceLength: number = defaultLength
  private payload: TraceData[] = []

  constructor(options: InitOptions) {
    const { maxTraceLength } = options
    if (maxTraceLength) {
      this.maxTraceLength = maxTraceLength > maxLength ? maxLength : maxTraceLength
    }
  }

  push(data: TraceData): void {
    if (this.payload.length >= this.maxTraceLength) {
      this.payload.shift()
    }
    
    this.payload.push(data)
    logger.log('Trace:', data)
  }
  clear(): void {
    this.payload = []
  }
  getPayload(): TraceData[] {
    return this.payload
  }
  getTypeGroup(type: TRACE_DATA_TYPE): TRACE_DATA_GROUP {
    switch (type) {
      case TRACE_DATA_TYPE.CLICK:
      case TRACE_DATA_TYPE.ROUTE:
        return TRACE_DATA_GROUP.UI;    
      case TRACE_DATA_TYPE.XHR:
        return TRACE_DATA_GROUP.HTTP;
      case TRACE_DATA_TYPE.CONSOLE:
      case TRACE_DATA_TYPE.CUSTOM:
        return TRACE_DATA_GROUP.DEBUG;
      case TRACE_DATA_TYPE.CODE_ERROR:
      case TRACE_DATA_TYPE.VUE:
      // case TRACE_DATA_TYPE.REACT:
        return TRACE_DATA_GROUP.OTHER;
    }
  }
}

let trace: Trace
export function initTrace(options: InitOptions = {}): void {
  trace = trace || new Trace(options)
}

export { trace }