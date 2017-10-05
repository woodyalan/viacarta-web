<template>
  <div>
    <nav class="navbar navbar-transparent navbar-absolute">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navigation-example-2"
                  @click="toggleNavbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <router-link class="navbar-brand" to="/admin">Viacarta Web</router-link>
        </div>
      </div>
    </nav>

    <div class="wrapper wrapper-full-page">
      <div class="full-page login-page" data-color="green"
           data-image="static/img/background/background-2.jpg">
        <!--   you can change the color of the filter page using: data-color="blue | azure | green | orange | red | purple" -->
        <div class="content">
          <div class="container">
            <div class="row">
              <div class="col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3">
                <form @submit.prevent="validar()" autocomplete="off" novalidate>
                  <div class="card" data-background="color" data-color="green">
                    <div class="card-header">
                      <h3 class="card-title">Acesso</h3>
                    </div>
                    <div class="card-content">
                      <div class="form-group">
                        <label>E-mail</label>
                        <input type="email" 
                          placeholder="E-mail" 
                          class="form-control input-no-border" 
                          v-model="login.email" 
                          name="email"
                          v-validate="'required|email'">
                          <small class="text-danger" v-show="errors.has('email')">
                            {{ errors.first('email') }}
                          </small>
                      </div>
                      <div class="form-group">
                        <label>Senha</label>
                        <input type="password" 
                          placeholder="Senha" 
                          class="form-control input-no-border" 
                          v-model="login.senha" 
                          name="senha"
                          v-validate="'required'">
                        <small class="text-danger" v-show="errors.has('senha')">
                          {{ errors.first('senha') }}
                        </small>
                      </div>

                      <p class="text-center text-danger"><small>{{ login.mensagem }}</small></p>
                    </div>
                    <div class="card-footer text-center">
                      <button type="submit" class="btn btn-fill btn-wd ">Acessar</button>
                      <div class="forgot">
                        <router-link to="/register">
                          Esqueceu sua senha?
                        </router-link>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <footer class="footer footer-transparent">
          <div class="container">
            <div class="copyright">
              &copy; Desenvolvido por
              <a href="#" target="_blank">Alan Santos</a>
            </div>
          </div>
        </footer>
        <div class="full-page-background" style="background-image: url(static/img/background/viacarta.jfif) "></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        login: {
          email: 'teste@teste.com',
          senha: '123',
          mensagem: ''
        }
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
      validar() {
        this.$validator
          .validateAll()
          .then(success => {
              if(success) {
                if((this.login.email == 'teste@teste.com') && (this.login.senha == '123'))
                  this.$router.push('/');
                else
                  this.login.mensagem = 'E-mail ou senha inválidos'
              }
          }).catch((err) => {
              console.log(err)
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
