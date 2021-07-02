/** 使用场景：当页面使用kepp-alive
 *  注意事项：下面例子是el-table的，如使用其他table，需要替换CSS选择器的参数
 *  
 *  <el-table
 *    recordScrollTop
 *    ...
 *  >
 *  </el-table>
 */

const domAttr = 'recordScrollTop'
export default {
  activated() {
    setTimeout(() => {
      const nodeList = this.$el.querySelectorAll(`[${domAttr}]>.el-table__body-wrapper`);
      if (!nodeList.length) return;
      for (let i = 0; i < nodeList.length; i += 1) {
        const ele = nodeList[i];
        if (ele.dataset) {
          ele.scrollTop = ele.dataset.scrollTop || 0;
        } else {
          ele.scrollTop = ele.getAttribute('scrollTop') || 0;
        }
      }
    }, 0);
  },
  beforeRouteLeave (to, from, next) {
    const nodeList = this.$el.querySelectorAll(`[${domAttr}]>.el-table__body-wrapper`);
    if (!nodeList.length) return;
    for (let i = 0; i < nodeList.length; i += 1) {
      const ele = nodeList[i];
      if (ele.dataset) {
        ele.dataset.scrollTop = ele.scrollTop
      } else {
        ele.setAttribute('scrollTop', ele.scrollTop);
      }
    }
  }
}