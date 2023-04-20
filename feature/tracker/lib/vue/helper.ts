import { ReportData } from '@/types'
import { ERROR_TYPE, LEVEL, TRACE_DATA_TYPE } from '@/shared/constant'
import { getLocationHref, getTimestamp, isString } from '@/utils'
import { trace, report } from '@/core'

function formatVm(vm: any) {
  if (!vm) return null;

  let componentName: String = '';
  if (vm.$root === vm) {
    componentName = 'root';
  } else {
    componentName = vm._isVue 
      ? vm.$options && (vm.$options.name || vm.$options._componentTag)
      : vm.name
  }

  return {
    componentName: componentName,
    componentProps: vm.$options && vm.$options.propsData,
  }
}

export function onVueError(err: Error, vm: any, info: String, Vue: any) {
  const ver = Vue?.version
  let data: ReportData = {
    type: ERROR_TYPE.VUE_ERROR,
    location: getLocationHref(),
    time: getTimestamp(),
    level: LEVEL.HIGH,
    message: `[Vue${ver}]${err.message}(${info})`,
    name: err.name,
  }

  if (isString(ver) && ver.startsWith('2.')) {
    Object.assign(data, formatVm(vm))
  }

  trace.push({
    type: TRACE_DATA_TYPE.VUE,
    group: trace.getTypeGroup(TRACE_DATA_TYPE.VUE),
    data,
  })

  report.send(data)
}