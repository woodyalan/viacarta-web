<template>
  <div class="wrapper">

    <side-bar type="sidebar" :sidebar-links="sidebarLinks">
      <user-menu></user-menu>
      <form class="navbar-form navbar-left navbar-search-form navbar-search-form-mobile" role="search">
        <div class="input-group">
          <span class="input-group-addon"><i class="fa fa-search"></i></span>
          <input type="text" value="" class="form-control" placeholder="Search...">
        </div>
      </form>
      <mobile-menu></mobile-menu>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  import MovingArrow from 'src/components/UIComponents/SidebarPlugin/MovingArrow.vue'
  import UserMenu from 'src/components/UIComponents/SidebarPlugin/UserMenu.vue'
  import MobileMenu from 'src/components/UIComponents/SidebarPlugin/MobileMenu.vue'

  export default {
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MovingArrow,
      UserMenu,
      MobileMenu
    },
    computed: {
      sidebarLinks() {
        let app = this;
        let sidebarLinks = [];
        

        let sidebarLinksUser = this.$store.state.menus.map(m => {
          let telas = m.telas.map(t => {
              return {
                name: t.nome,
                path: `/${m.path}/${t.route}`
              }
          })
      
          return {
            name: m.nome,
            icon: m.icon,
            collapsed: true,
            children: telas
          }
        });

        sidebarLinksUser.forEach(function(element) {
          sidebarLinks.push(element)
        }, this);

        app.$sidebar.sidebarLinks = sidebarLinks;

        return app.$sidebar.sidebarLinks;
      }
      
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      }
    }
  }

</script>
