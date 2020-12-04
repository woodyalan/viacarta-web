import Vue from 'vue';
import VueRouter from 'vue-router';
import VueNotify from 'vue-notifyjs';
import VueResource from 'vue-resource';
import VeeValidate, { Validator } from 'vee-validate';
import lang from 'element-ui/lib/locale/lang/pt-br';
import locale from 'element-ui/lib/locale';
import AsyncComputed from 'vue-async-computed';
// import 'vue-googlemaps/dist/vue-googlemaps.css';
// import VueGoogleMaps from 'vue-googlemaps';
import VueTheMask from 'vue-the-mask';
import money from 'v-money';
import store from './store';
import App from './App.vue';

import messagesBR from 'vee-validate/dist/locale/pt_BR';
import moment from 'moment';

import CpfValidator from './components/Validators/cpf.validator';
import CnpjValidator from './components/Validators/cnpj.validator';
import Dictionary from './components/Validators/dictionary';

// Plugins
import GlobalComponents from './gloablComponents';
import GlobalDirectives from './globalDirectives';
import SideBar from './components/UIComponents/SidebarPlugin';

// router setup
import routes from './routes/routes';

// library imports

import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import './assets/sass/paper-dashboard.scss';
import './assets/sass/demo.scss';
import './assets/sass/paper-dashboard-override.scss';
import './assets/sass/demo.scss';
import './assets/sass/dropzone.scss';
import 'es6-promise/auto';

// import sidebarLinks from './sidebarLinks'

Vue.prototype.moment = moment;

// plugin setup
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(GlobalDirectives);
Vue.use(GlobalComponents);
Vue.use(VueNotify);
Vue.use(SideBar);
Vue.use(AsyncComputed);
Vue.use(VueTheMask);
Vue.use(money);

// Vue.use(VueGoogleMaps, {
//   load: {
//     apiKey: 'AIzaSyAgoO0ZL2Z9mL8j2s1YqFnJVpHitVZf4oQ',
//     libraries: ['places'],
//     useBetaRenderer: false
//   }
// });

Validator.extend('cpf', CpfValidator);
Validator.extend('cnpj', CnpjValidator);

// Validator.addLocale();
Vue.use(VeeValidate, {
  locale: 'pt_BR',
  // dictionary: messagesBR,
  inject: false,
  dictionary: Dictionary,
});

locale.use(lang);

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  mode: 'history',
  linkActiveClass: 'active',
});

Vue.http.options.root = process.env.API_URL;

Vue.http.interceptors.push(function (request, next) {
  const removeAuthHeaders = request.url.includes('republicavirtual.com.br');

  request.headers.set('Accept', 'application/json');

  if (removeAuthHeaders) {
    request.headers.delete('x-access-token');
  } else {
    let token = store.state.token;
    request.headers.set('x-access-token', token);
  }

  next(function (res) {
    if (res.status === 401) {
      router.push('/logoff');
    }
  });
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
});
