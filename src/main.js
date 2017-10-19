import Vue from 'vue'
import VueRouter from 'vue-router'
import VueNotify from 'vue-notifyjs'
import VueResource from 'vue-resource'
import VeeValidate, { Validator } from 'vee-validate'
import lang from 'element-ui/lib/locale/lang/pt-br'
import locale from 'element-ui/lib/locale'
import AsyncComputed from 'vue-async-computed'
import VueTheMask from 'vue-the-mask'
import store from './store'
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
import './assets/sass/paper-dashboard-override.scss'
import './assets/sass/demo.scss'
import 'es6-promise/auto'

// import sidebarLinks from './sidebarLinks'

// plugin setup
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(GlobalDirectives)
Vue.use(GlobalComponents)
Vue.use(VueNotify)
Vue.use(SideBar)
Vue.use(AsyncComputed)
Vue.use(VueTheMask)

Validator.addLocale(messagesBR)
Vue.use(VeeValidate, {
    locale: 'pt_BR',
    inject: false
})

locale.use(lang)

// configure router
const router = new VueRouter({
    routes, // short for routes: routes
    linkActiveClass: 'active'
})
  
Vue.http.options.root = "http://localhost:3000/";
  

Vue.http.interceptors.push(function(request, next) {
    const removeAuthHeaders = false;

    request.headers.set('Accept', 'application/json');
    
    if (removeAuthHeaders){
        request.headers.delete('x-access-token');
    } else {
        let token = store.state.token;
        request.headers.set('x-access-token', token);
    }
    
    next(function (res) {
        if(res.status === 401) {
            router.push('/logoff');
        }
    });
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
