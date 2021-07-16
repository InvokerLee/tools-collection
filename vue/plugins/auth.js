// import store from '@/store'; 权限存储的地方

import { isPrimitive } from '../../utils/index'

const AUTH_KEY = 'permisionKey';
const AUTH_NAME = 'permisionName';

export default {
  install(Vue) {
    Vue.prototype.$isAuthorized = function(value) {
      // const permissions = store.state.permissions.map(v => v[AUTH_KEY]);
      const permissions = [];

      // 判断是否为基础类型
      if (isPrimitive(value)) {
        return permissions.includes(value);
      }

      if (Array.isArray(value)) {
        return value.every(v => permissions.includes(v))
      }

      return false;
    }

    Vue.prototype.$getAuthName = function(value) {
      // const permissions = store.state.permissions;
      const permissions = [];

      if (isPrimitive(value)) {
        const item = permissions.find(v => v[AUTH_KEY] === value)
        return item && item[AUTH_KEY][AUTH_NAME];
      }

      return '';
    }
  }
}