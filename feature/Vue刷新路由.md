### 场景：自定义刷新代替F5

- router新增路由
  ```
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/components/Redirect')
      }
    ]
  },
  ```

- 创建组件
  ```
  <script>
  export default {
    created() {
      const { params, query } = this.$route;
      const { path } = params;
      this.$router.replace({ path: '/' + path, query });
    },
    render: function(h) {
      return h(); // avoid warning message
    }
  };
  </script>
  ```

- 使用：
  ```
  const path = '';
  this.$router.replace({
    path: '/redirect' + path
  })
  ```
