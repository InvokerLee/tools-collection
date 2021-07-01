import { cached } from '../shared/util.js'

// 10000 => "10,000"
export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * 
 * @desc   url参数转对象
 * @param  {String} url  default: window.location.href
 * @return {Object} 
 */
 export function parseQuery(url) {
  url = !url ? window.location.href : url;
  if(url.indexOf('?') === -1) {
      return {};
  }
  var search = url[0] === '?' ? url.substr(1) : url.substring(url.lastIndexOf('?') + 1);
  if (search === '') {
      return {};
  }
  search = search.split('&');
  var query = {};
  for (var i = 0; i < search.length; i++) {
      var pair = search[i].split('=');
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
}

/**
* 
* @desc   对象序列化
* @param  {Object} obj 
* @return {String}
*/
export function stringfyQuery(obj) {
  if (!obj) return '';
  var queryArr = [];

  for (var key in obj) {
      var value = obj[key];

      if (value instanceof Array) {
          for (var i = 0; i < value.length; ++i) {
              queryArr.push(encodeURIComponent(key + '[' + i + ']') + '=' + encodeURIComponent(value[i]));
          }
          continue;
      }

      queryArr.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
  }

  return queryArr.join('&');
}

/**
 * Camelize a hyphen-delimited string.
 */
 const camelizeRE = /-(\w)/g
 export const camelize = cached((str) => {
   return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
 })

/**
* Hyphenate a camelCase string.
*/
const hyphenateRE = /\B([A-Z])/g
export const hyphenate = cached((str) => {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
})
 
/**
 * Capitalize a string.
 */
export const capitalize = cached((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
})
