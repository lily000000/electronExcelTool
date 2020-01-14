import Vue from 'vue'

import App from './App'
import router from './router'
import {API,URL} from '../api';
import Http from '../utils/http'
import axios from "axios";
import moment from 'moment'
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.prototype.$Http = Http;
Vue.config.productionTip = false
Vue.prototype.$API = API;
Vue.prototype.$axios = axios;
Vue.prototype.URL = URL;
Vue.prototype.moment = moment;
import Loading from "muse-ui-loading"
Vue.use(Loading);

import ElementUI from 'element-ui'
import 'muse-ui-loading/dist/muse-ui-loading.css'; // load css
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  template: '<App/>'
}).$mount('#app')
