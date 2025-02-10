import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import './plugins/hljs'

// var mavonEditor = require('mavon-editor');
Vue.use(ElementUI);
Vue.use(mavonEditor)
Vue.use(ViewUI);
Vue.config.productionTip = false;

// 配置修改页面title
router.beforeEach((to, from, next)=>{
  if(to.meta.title){
    document.title = to.meta.title
  }
  next()
})

new Vue({
  router,
  store,
  data() {
    return { value: '' }
  },
  render: h => h(App)
}).$mount('#app')
