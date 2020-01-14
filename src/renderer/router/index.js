import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'chatRecord',
      mode: 'hash',
      component: require('@/components/chatRecord').default
    },
    {
      path: '/webview',
      name:'webview',
      component: require('@/components/webview').default,
    },
    {
      mode: 'hash',
      path: '*',
      redirect: '/'
    }
  ]
})
