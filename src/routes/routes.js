import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'

// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'
import Logoff from '../components/GeneralViews/Logoff.vue'

// Dashboard pages
import Overview from 'src/components/Dashboard/Views/Dashboard/Overview.vue'

// Pages
import Login from 'src/components/Dashboard/Views/Pages/Login.vue'

// Cadastros
import CadastroCentroCusto from 'src/components/Dashboard/Views/CentroCusto/CadastroCentroCusto.vue'
import ListaCentroCusto from 'src/components/Dashboard/Views/CentroCusto/ListaCentroCusto.vue'

import CadastroMenus from 'src/components/Dashboard/Views/Menus/CadastroMenus.vue'
import ListaMenus from 'src/components/Dashboard/Views/Menus/ListaMenus.vue'

import CadastroPerfis from 'src/components/Dashboard/Views/Perfis/CadastroPerfis.vue'
import ListaPerfis from 'src/components/Dashboard/Views/Perfis/ListaPerfis.vue'

import CadastroTiposVeiculo from 'src/components/Dashboard/Views/TiposVeiculo/CadastroTiposVeiculo.vue'
import ListaTiposVeiculo from 'src/components/Dashboard/Views/TiposVeiculo/ListaTiposVeiculo'

import CadastroSeguradora from 'src/components/Dashboard/Views/Seguradora/CadastroSeguradora.vue'
import ListaSeguradora from 'src/components/Dashboard/Views/Seguradora/ListaSeguradora.vue'

import CadastroVeiculo from 'src/components/Dashboard/Views/Veiculo/CadastroVeiculo.vue'
import ListaVeiculo from 'src/components/Dashboard/Views/Veiculo/ListaVeiculo.vue'

import CadastroUsuario from 'src/components/Dashboard/Views/Usuario/CadastroUsuario.vue'
import ListaUsuario from 'src/components/Dashboard/Views/Usuario/ListaUsuario.vue'

import CadastroTela from 'src/components/Dashboard/Views/Tela/CadastroTela.vue'
import ListaTela from 'src/components/Dashboard/Views/Tela/ListaTela.vue'

import CadastroTelaPerfil from 'src/components/Dashboard/Views/TelaPerfil/CadastroTelaPerfil.vue'
import ListaTelaPerfil from 'src/components/Dashboard/Views/TelaPerfil/ListaTelaPerfil.vue'

import CadastroTipoOcorrencia from 'src/components/Dashboard/Views/TipoOcorrencia/CadastroTipoOcorrencia.vue'
import ListaTipoOcorrencia from 'src/components/Dashboard/Views/TipoOcorrencia/ListaTipoOcorrencia.vue'

import CadastroServico from 'src/components/Dashboard/Views/Servico/CadastroServico.vue'
import ListaServico from 'src/components/Dashboard/Views/Servico/ListaServico.vue'

import CadastroSeguroVeiculo from 'src/components/Dashboard/Views/SeguroVeiculo/CadastroSeguroVeiculo.vue'
import ListaSeguroVeiculo from 'src/components/Dashboard/Views/SeguroVeiculo/ListaSeguroVeiculo.vue'

import CadastroPlanoManutencao from 'src/components/Dashboard/Views/PlanoManutencao/CadastroPlanoManutencao.vue'
import ListaPlanoManutencao from 'src/components/Dashboard/Views/PlanoManutencao/ListaPlanoManutencao.vue'

import CadastroServicoPlanoManutencao from 'src/components/Dashboard/Views/ServicoPlanoManutencao/CadastroServicoPlanoManutencao.vue'
import ListaServicoPlanoManutencao from 'src/components/Dashboard/Views/servicoPlanoManutencao/ListaServicoPlanoManutencao.vue'

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
    path: '/sistema',
    component: DashboardLayout,
    children: [
      //Menu
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
      },
      //Perfil
      {
        path: 'perfis/new',
        name: 'Novo Perfil',
        component: CadastroPerfis
      },
      {
        path: 'perfis/edit/:id?',
        name: 'Editar Perfis',
        component: CadastroPerfis
      },
      {
        path: 'perfis',
        name: 'Perfis',
        component: ListaPerfis
      },
      //Tela do Perfil
      {
        path: 'telaPerfil/:perfilId/new',
        name: 'Nova Tela do Perfil',
        component: CadastroTelaPerfil
      },
      {
        path: 'telaPerfil/:perfilId/edit/:telaId',
        name: 'Editar Telas do Perfil',
        component: CadastroTelaPerfil
      },
      {
        path: 'telaPerfil/:perfilId',
        name: 'Telas do Perfil',
        component: ListaTelaPerfil
      },//Usuário
      {
        path: 'usuario/new',
        name: 'Novo Usuário',
        component: CadastroUsuario
      },
      {
        path: 'usuario/edit/:id?',
        name: 'Editar Usuário',
        component: CadastroUsuario
      },
      {
        path: 'usuario',
        name: 'Usuário',
        component: ListaUsuario
      },
      //Tela
      {
        path: 'tela/new',
        name: 'Nova Tela',
        component: CadastroTela
      },
      {
        path: 'tela/edit/:id?',
        name: 'Editar Tela',
        component: CadastroTela
      },
      {
        path: 'tela',
        name: 'Tela',
        component: ListaTela
      },
    ]
  },
  {
    path: '/veiculos',
    component: DashboardLayout,
    children: [
      //Tipo de Veículo
      {
        path: 'tiposVeiculo/new',
        name: 'Novo Tipo de Veículo',
        component: CadastroTiposVeiculo
      },
      {
        path: 'tiposVeiculo/edit/:id?',
        name: 'Editar Tipo de Veículo',
        component: CadastroTiposVeiculo
      },
      {
        path: 'tiposVeiculo',
        name: 'Tipos de Veículo',
        component: ListaTiposVeiculo
      },
      //Seguradora
      {
        path: 'seguradora/new',
        name: 'Nova Seguradora',
        component: CadastroSeguradora
      },
      {
        path: 'seguradora/edit/:id?',
        name: 'Editar Seguradora',
        component: CadastroSeguradora
      },
      {
        path: 'seguradora',
        name: 'Seguradora',
        component: ListaSeguradora
      },
      //Veículo
      {
        path: 'veiculo/new',
        name: 'Novo Veículo',
        component: CadastroVeiculo
      },
      {
        path: 'veiculo/edit/:id?',
        name: 'Editar Veiculo',
        component: CadastroVeiculo
      },
      {
        path: 'veiculo',
        name: 'Veiculo',
        component: ListaVeiculo
      },
      //Tipo de Ocorrencia
      {
        path: 'tipoOcorrencia/new',
        name: 'Novo Tipo de Ocorrência',
        component: CadastroTipoOcorrencia
      },
      {
        path: 'tipoOcorrencia/edit/:id?',
        name: 'Editar Tipo de Ocorrência',
        component: CadastroTipoOcorrencia
      },
      {
        path: 'tipoOcorrencia',
        name: 'Tipo de Ocorrência',
        component: ListaTipoOcorrencia
      },
      //Serviços
      {
        path: 'servico/new',
        name: 'Novo Serviço',
        component: CadastroServico
      },
      {
        path: 'servico/edit/:id?',
        name: 'Editar Serviço',
        component: CadastroServico
      },
      {
        path: 'servico',
        name: 'Serviço',
        component: ListaServico
      },
      //Seguros de Veículos
      {
        path: 'seguroVeiculo/new',
        name: 'Novo Seguro de Veículo',
        component: CadastroSeguroVeiculo
      },
      {
        path: 'seguroVeiculo/edit/:id?',
        name: 'Editar Seguro de Veículo',
        component: CadastroSeguroVeiculo
      },
      {
        path: 'seguroVeiculo',
        name: 'Seguro de Veículo',
        component: ListaSeguroVeiculo
      },
      //Planos de Manutenção
      {
        path: 'planoManutencao/new',
        name: 'Novo Plano de Manutenção',
        component: CadastroPlanoManutencao
      },
      {
        path: 'planoManutencao/edit/:id?',
        name: 'Editar Plano de Manutenção',
        component: CadastroPlanoManutencao
      },
      {
        path: 'planoManutencao',
        name: 'Plano de Manutenção',
        component: ListaPlanoManutencao
      },
      //Serviços dos Planos de Manutenção
      {
        path: 'servicoPlanoManutencao/:planoManutencaoId/new',
        name: 'Novo Serviço do Plano de Manutenção',
        component: CadastroServicoPlanoManutencao
      },
      {
        path: 'servicoPlanoManutencao/:planoManutencaoId/edit/:servicoId?',
        name: 'Editar Serviço do Plano de Manutenção',
        component: CadastroServicoPlanoManutencao
      },
      {
        path: 'servicoPlanoManutencao/:planoManutencaoId',
        name: 'Serviços do Plano de Manutenção',
        component: ListaServicoPlanoManutencao
      }
    ]
  },
  {
    path: '/cadastros',
    component: DashboardLayout,
    children: [
      //Centro de Custo
      {
        path: 'centroCusto/new',
        name: 'Novo Centro de Custo',
        component: CadastroCentroCusto
      },
      {
        path: 'centroCusto/edit/:id?',
        name: 'Editar Centro de Custo',
        component: CadastroCentroCusto
      },
      {
        path: 'centroCusto',
        name: 'Centro de Custo',
        component: ListaCentroCusto
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
