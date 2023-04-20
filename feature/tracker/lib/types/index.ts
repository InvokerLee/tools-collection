import {
  TRACE_DATA_GROUP,
  TRACE_DATA_TYPE,
  BURIED_POINT_TYPE,
  MONITOR_EVENTS
} from '../shared/constant'

export type VoidFunc = () => void;

export interface InitOptions {
  api?: string; // 服务器地址
  appId?: string; // 唯一标识
  maxTraceLength?: number; // 最大数据承载长度：默认累积 10 条发送
  disabled?: boolean; // 传入true则禁用
  debug?: boolean; // 是否控制台打印
  uninstall?: (keyof typeof MONITOR_EVENTS)[]; // 卸载的事件
}

// 用户轨迹
export interface TraceData {
  type: TRACE_DATA_TYPE;
  group: TRACE_DATA_GROUP;
  data: ReportData | ConsoleData | RouteData;
}

// 发布订阅
export type SubscribeCallback = (data: any) => void
export interface SubscribeHandler {
  type: MONITOR_EVENTS;
  callback?: SubscribeCallback;
}

export interface ResourceTarget {
  src?: string;
  href?: string;
  tagName?: string;
}

// 上报的数据类型
export interface ReportData {
  type?: string;
  name?: string;
  location?: string;
  time?: number;
  message?: string;

  colno?: number;
  lineno?: number;
  stack?: string;
  level?: string;

  // http
  request?: {
    method: string;
    url: string;
    data: any;
  }
  response?: {
    status: number;
    data: string;
    duration: number;
  }

  // vue
  componentName?: String,
  componentProps?: any,
}

export interface FinalData {
  sdkVersion: string;
  appId: string;
  ua: string;
  traces: TraceData[];
  data: ReportData ;
}

export interface ConsoleData {
  type: string;
  args: any[];
}
export interface DomData {
  type: string;
  target: HTMLElement;
}
export interface RouteData {
  to: string;
  from: string;
}


export interface BuriedPointData {
  type?: BURIED_POINT_TYPE;
  message?: string;
  startTime?: number;
  duration?: number;
  trackTime?: number;
}
