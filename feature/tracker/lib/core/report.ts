import { ReportData, FinalData, InitOptions } from '../types'
import { logger } from '../utils/logger'
import { getUserAgent } from '../utils'
import { trace } from './trace'
import { SDK_VERSON } from '../shared/config'

export class Report {
  api: string = ''
  appId: string = ''

  constructor(options: InitOptions) {
    const { api, appId } = options
    api && (this.api = api);
    appId && (this.appId = appId)
  }
  async send(info: ReportData) {
    if(!this.api) {
      logger.error('未定义上报 api')
      return
    }
    if(!this.appId) {
      logger.error('未定义应用 id')
      return
    }
    const data: FinalData = await this.getRequestData(info)
    this.sendByImg(data, this.api)
  }
  
  private sendByImg(data: any, url: string) {
    let img: any = new Image()
    const char = url.indexOf('?') === -1 ? '?' : '&'
    img.src = `${url}${char}data=${encodeURIComponent(JSON.stringify(data))}`
    logger.log('Report:' + img.src)
    img = null 
  }

  // 最终上报的信息
  private getRequestData(info: ReportData): FinalData {
    return {
      // sdk版本，用于后期后台排查问题
      sdkVersion: SDK_VERSON,
      // 应用
      appId: this.appId,
      // 设备
      ua: getUserAgent(),
      // 用户行为轨迹
      traces: trace.getPayload(),
      // 上报的信息
      data: info,
    }
  }
}

let report: Report
export function initReport(options: InitOptions = {}): void {
  report = report || new Report(options)
}

export { report }