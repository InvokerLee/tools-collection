import { onVueError } from './helper';
import { logger } from '@/utils/logger'

let _Vue: any
let installed: boolean = false
function install(Vue: any) {
  if (installed && _Vue === Vue) return

  logger.log(`已安装Vue插件(errorHandler)`)

  installed = true;
  _Vue = Vue

  Vue.config.errorHandler = (err: Error, vm: any, info: string) => {
    onVueError(err, vm, info, _Vue);
  }

}

export const VueTracker = {
  install,
}