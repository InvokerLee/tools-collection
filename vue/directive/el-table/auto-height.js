/**
 * 监听 resize事件 使element ui 的table组件的 max-height属性值能够根据屏幕大小自适应
 Vue.directive('auto-height', autoHeight)
 v-auto-height:tableHeight="-30"
 :max-height="tableHeight"
 */
export default {
  componentUpdated(el, binding, vnode) {
    const ctx = vnode.context;
    if (!ctx || typeof ctx[binding.arg] === 'undefined' || ctx.autoHeightResizeListener) return;
    ctx.autoHeightResizeListener = () => {
      let top = el.offsetTop;
      let cur = el.offsetParent;
      while (cur !== null) {
        top += cur.offsetTop;
        cur = cur.offsetParent;
      }
      const h = (window.innerHeight - top) + binding.value;
      ctx[binding.arg] = Math.max(h, 250);
    };
    window.addEventListener('resize', ctx.autoHeightResizeListener, false);
    setTimeout(ctx.autoHeightResizeListener, 50);
  },
  unbind(el, binding, vnode) {
    const ctx = vnode.context;
    if (ctx && ctx.autoHeightResizeListener) {
      window.removeEventListener('resize', ctx.autoHeightResizeListener, false);
      ctx.autoHeightResizeListener = null;
    }
  },
};