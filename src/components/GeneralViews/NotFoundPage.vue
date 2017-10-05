<template lang="pug">
  .contact-us.full-screen
    //nav.navbar.navbar-ct-default(role='navigation-demo')
    nav.navbar.navbar-default(role='navigation-demo')
      .container
        .navbar-header
          button.navbar-toggle(type='button', data-toggle='collapse', data-target='#navigation-example-2')
            span.sr-only Toggle navigation
            span.icon-bar
            span.icon-bar
            span.icon-bar
          router-link.navbar-brand(:to="{path:'/'}") Via Carta
        #navigation-example-2.collapse.navbar-collapse
          ul.nav.navbar-nav.navbar-right
            li
              router-link(:to="{path:'/'}") Início
    .wrapper.wrapper-full-page.section.content
      div
        .container
          .row
            .col-md-8.col-md-offset-2.text-center
              h2.title.text-danger 404 Não Encontrada
              h2.title Oops! A página que você está tentando visualizar não existe.
    footer.footer-demo
      .container
        nav.pull-left
          ul
            li
              router-link(:to="'/'") Início
        .copyright.pull-right
          | © Desenvolvido por Alan Santos

</template>

<script>
  export default {
    
  }
</script>
