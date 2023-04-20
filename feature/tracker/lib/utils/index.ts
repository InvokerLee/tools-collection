function isType(type: string) {
  return function (val: any): boolean {
    return Object.prototype.toString.call(val) === `[object ${type}]`
  }
}
export const isNumber = isType('Number')
export const isString = isType('String')
export const isObject = isType('Object')
export const isArray = isType('Array')

export function getLocationHref(): string {
  if (!document || !document.location) return ''
  return document.location.href
}

export function getTimestamp(): number {
  return Date && Date.now()
}

export function deepClone(val: any): any{
  if (isObject(val)) {
    const res: { [key: string]: any } = {}
    for (const key in val) {
      res[key] = deepClone(val[key])
    }
    return res
  } else if (Array.isArray(val)) {
    return val.slice()
  } else {
    return val
  }
}

export function formatErrorStack(error: Error): string {
  if (!error.stack) return ''
  const symobol = ' @:';
  // 格式化stack
  let stack = error.stack
    .replace(/\n/g, "")
    .split(/\bat\b/)
    .slice(0, 9)
    .map(v => v.trim())
    .join(symobol)
    .replace(/\?[^:]+/gi, "");

  const errStr = error.toString();
  if (stack.indexOf(errStr) < 0) {
    stack = errStr + symobol + stack;
  }
  return stack;
}

/**
 *
 * 重写对象的某个属性
 * ../param source 需要被重写的对象
 * ../param name 需要被重写对象的key
 * ../param replacement 以原有的函数作为参数，执行并重写原有函数
 */
export function replaceAttr(source: {[key: string]: any}, name: string, replacement: (...args: any[]) => any) {
  if (!source) return
  if (name in source) {
    const original = source[name]
    const wrapped = replacement(original)
    if (typeof wrapped === 'function') {
      source[name] = wrapped
    }
  }
}

// 节流
export function throttle(fn: Function, delay: number): Function {
  let enable = true
  return function (this: any, ...args: any) {
    if (!enable) return
    fn.apply(this, args)
    enable = false
    setTimeout(() => {
      enable = true
    }, delay)
  }
}

// html转string
export function htmlEleToString(target: HTMLElement): string {
  const tagName = target.tagName.toLowerCase()
  if (['html', 'body'].includes(tagName)) { return '' }
  let classNames = target.classList.value
  classNames = classNames !== '' ? ` class="${classNames}"` : ''
  const id = target.id ? ` id="${target.id}"` : ''
  const innerText = target.innerText
  return `<${tagName}${id}${classNames !== '' ? classNames : ''}>${innerText}</${tagName}>`
}

export function getUserAgent() {
  if (!navigator) return '';
  return 'userAgent' in navigator ? navigator.userAgent : 'unknow';
}
