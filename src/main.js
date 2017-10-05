import Vue from 'vue'
import VueRouter from 'vue-router'
import VueNotify from 'vue-notifyjs'
import VeeValidate, { Validator } from 'vee-validate'
import lang from 'element-ui/lib/locale/lang/pt-br'
import locale from 'element-ui/lib/locale'
import App from './App.vue'

import messagesBR from 'vee-validate/dist/locale/pt_BR'

// Plugins
import GlobalComponents from './gloablComponents'
import GlobalDirectives from './globalDirectives'
import SideBar from './components/UIComponents/SidebarPlugin'

// router setup
import routes from './routes/routes'

// library imports

import './assets/sass/paper-dashboard.scss'
import './assets/sass/demo.scss'
import 'es6-promise/auto'

import sidebarLinks from './sidebarLinks'
// plugin setup
Vue.use(VueRouter)
Vue.use(GlobalDirectives)
Vue.use(GlobalComponents)
Vue.use(VueNotify)
Vue.use(SideBar, {sidebarLinks: sidebarLinks})

Validator.addLocale(messagesBR)
Vue.use(VeeValidate, {
    locale: 'pt_BR'
})

locale.use(lang)

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'active'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
