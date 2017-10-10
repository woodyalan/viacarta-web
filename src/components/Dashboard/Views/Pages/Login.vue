<template lang="pug">
  div
    nav.navbar.navbar-transparent.navbar-absolute
      .container
        .navbar-header
          button.navbar-toggle(type='button', data-toggle='collapse', data-target='#navigation-example-2', @click='toggleNavbar')
            span.sr-only Toggle navigation
            span.icon-bar
            span.icon-bar
            span.icon-bar
          router-link.navbar-brand(to='/') Viacarta Web
    .wrapper.wrapper-full-page
      .full-page.login-page(data-color='green', data-image='static/img/background/background-2.jpg')
        // you can change the color of the filter page using: data-color="blue | azure | green | orange | red | purple"
        .content
          .container
            .row
              .col-md-4.col-sm-6.col-md-offset-4.col-sm-offset-3
                form(@submit.prevent='doLogin()', autocomplete='off', novalidate='')
                  .card(data-background='color', data-color='green')
                    .card-header
                      h3.card-title Acesso
                    .card-content
                      fg-input(
                        type='email',
                        label='E-mail',
                        placeholder='E-mail', 
                        v-model='login.email', 
                        name='email', 
                        :rules='{ required: true, email: true }'
                      )
                      fg-input(
                        type='password',
                        label='Senha',
                        placeholder='Senha', 
                        v-model='login.senha', 
                        name='senha', 
                        :rules='{ required: true }'
                      )
                      p.text-center.text-danger
                        small {{ mensagem }}
                    .card-footer.text-center
                      button.btn.btn-fill.btn-wd(type='submit') Acessar
                      .forgot
                        router-link(to='/register')
                          | Esqueceu sua senha?
        footer.footer.footer-transparent
          .container
            .copyright
              | © Desenvolvido por
              a(href='#', target='_blank') Alan Santos
        .full-page-background(style='background-image: url(static/img/background/viacarta.jfif) ')

</template>
<script>
  import LoginService from '../../../../domain/login/LoginService'

  export default {
    data() {
      return {
        login: {
          email: 'alan.afs89@gmail.com',
          senha: '1234'
        },
        mensagem: ''
      }
    },
    methods: {
      toggleNavbar () {
        document.body.classList.toggle('nav-open')
      },
      closeMenu () {
        document.body.classList.remove('nav-open')
        document.body.classList.remove('off-canvas-sidebar')
      },
      validate() {
        return this.$validator
          .validateAll()
          .then(success => success)
          .catch((err) => {
            console.log(err)
          })
      },
      getUserInfo() {
        this.service = new LoginService(this.$http);
        return this.service
          .getUserInfo(this.login.email)
          .then(userInfo => {
            this.$store.dispatch('setUser', userInfo.result);
            return userInfo.result;
          });
      },
      getUserMenus(perfil) {
        this.service = new LoginService(this.$http);
        return this.service
          .getUserMenus(perfil)
          .then(menus => {
            this.$store.dispatch('setMenus', menus.result);
          });
      },
      doLogin() {
        this.validate()
          .then(success => {
            if(success) {
              this.service = new LoginService(this.$http);
              this.service
                .login(this.login.email, this.login.senha)
                .then(result => {
                  this.mensagem = '';

                  if(result.success) {
                    this.$store.dispatch('setToken', result.token)
                      .then(() => {
                        this.getUserInfo()
                          .then(userInfo => {
                            this.getUserMenus(userInfo.perfil)
                              .then(() => {
                                this.$router.push('/');
                              });
                          });
                      });
                  } else {
                    this.mensagem = result.message;
                  }
                });
            }
          })
      }
    },
    beforeDestroy () {
      this.closeMenu()
    }
  }
</script>

<style>
.forgot {
  margin-top: 10px;
}
</style>
