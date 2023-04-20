// 用户行为分组
export enum TRACE_DATA_GROUP {
  UI = 'UI',
  HTTP = 'HTTP',
  DEBUG = 'DEBUG',
  OTHER = 'OTHER',
}

// 用户行为类型
export enum TRACE_DATA_TYPE {
  // UI
  CLICK = 'CLICK',
  ROUTE = 'ROUTE',
  // HTTP
  XHR = 'XHR',
  // DEBUG
  CONSOLE = 'CONSOLE',
  CUSTOM = 'CUSTOM',
  // OTHER
  CODE_ERROR = 'CODE_ERROR',
  VUE = 'VUE',
  // REACT = 'REACT',
}

// 上报错误类型
export enum ERROR_TYPE {
  RESOURCE_ERROR = 'RESOURCE_ERROR',
  JAVASCRIPT_ERROR = 'JAVASCRIPT_ERROR',
  HTTP_ERROR = 'HTTP_ERROR',
  PROMISE_ERROR = 'PROMISE_ERROR',
  CUSTOM_ERROR = 'CUSTOM_ERROR',
  VUE_ERROR = 'VUE_ERROR',
}

// 重写事件
export enum MONITOR_EVENTS {
  ERROR = 'ERROR',
  XHR = 'XHR',
  CONSOLE = 'CONSOLE',
  UNHANDLEDREJECTION = 'UNHANDLEDREJECTION',
  DOM = 'DOM',
  HISTORY = 'HISTORY',
  HASHCHANGE = 'HASHCHANGE',
}

export enum LEVEL {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export enum BURIED_POINT_TYPE {
  PAGE = 'PAGE', // 页面
  EVENT = 'EVENT', // 事件
  VIEW = 'VIEW', // 区域曝光
  DURATION_VIEW = 'DURATION_VIEW', // 区域曝光时长
  DURATION = 'DURATION', // 功能时长
}


  // RangerEr0ror 越界，例如new Array(Number.MAX_VALUE)；
  // ReferenceError 引用错误，最常见的是不存在变量被引用
  // SyntaxError 语法错误，运行时才检测到
  // TypeError 类型错误，常见于访问不存在的属性
  // URIError encodeURI和decodeURI参数不正确
  // EvalError eval执行的参数不正确
  // unhandledrejection
  // win.onerror
  
