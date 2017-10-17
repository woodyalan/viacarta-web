import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'

// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'
import Logoff from '../components/GeneralViews/Logoff.vue'

// Dashboard pages
import Overview from 'src/components/Dashboard/Views/Dashboard/Overview.vue'

// Pages
import Login from 'src/components/Dashboard/Views/Pages/Login.vue'

// Cadastros
import CadastroMenus from 'src/components/Dashboard/Views/Menus/CadastroMenus.vue'
import ListaMenus from 'src/components/Dashboard/Views/Menus/ListaMenus.vue'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/dashboard/overview'
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
    path: '/dashboard',
    component: DashboardLayout,
    redirect: '/dashboard/overview',
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
        path: 'menus/new',
        name: 'Novo Menu',
        component: CadastroMenus
      },
      {
        path: 'menus/edit/:id?',
        name: 'Editar Menu',
        component: CadastroMenus
      },
      {
        path: 'menus',
        name: 'Menus',
        component: ListaMenus
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
