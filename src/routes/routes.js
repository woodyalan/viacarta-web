import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'

// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'
import Logoff from '../components/GeneralViews/Logoff.vue'

// Dashboard pages
import Overview from 'src/components/Dashboard/Views/Dashboard/Overview.vue'

// Pages
import Login from 'src/components/Dashboard/Views/Pages/Login.vue'

// Cadastros
import Veiculos from 'src/components/Dashboard/Views/Veiculos/Cadastro.vue'
import ListVeiculos from 'src/components/Dashboard/Views/Veiculos/Lista.vue'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/overview'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/logoff',
    name: 'Logoff',
    component: Logoff
  },
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/overview',
    children: [
      {
        path: 'overview',
        name: 'Visão Geral',
        component: Overview
      }
    ]
  },
  {
    path: '/cadastros',
    component: DashboardLayout,
    children: [
      {
        path: 'veiculos/new',
        name: 'Novo Veículo',
        component: Veiculos
      },
      {
        path: 'veiculos/edit/:id',
        name: 'Editar Veículo',
        component: Veiculos
      },
      {
        path: 'veiculos',
        name: 'Veículos',
        component: ListVeiculos
      }
    ]
  },
  {path: '*', component: NotFound}
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
 function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
