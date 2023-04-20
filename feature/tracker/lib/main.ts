// 入口文件
import { InitOptions } from '@/types'
import { initTrace, initReport } from '@/core'
import { initLogger } from '@/utils/logger'
import { setupMonitor } from '@/web/monitor'
import { SDK_VERSON } from '@/shared/config'

function init(options: InitOptions = {}): void {
  if (options.disabled) return;
  initTrace(options)
  initLogger(options)
  initReport(options)
  setupMonitor(options.uninstall)
}

export { SDK_VERSON, init }
