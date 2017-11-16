<template lang="pug">
  cadastro(
    :route='route'
  )
    .row(slot='fields')
      .col-xs-12
        .row
          .col-md-6
            fg-input(
              type='text',
              label='Nome',
              placeholder='Nome', 
              v-model='usuario.nome', 
              name='nome', 
              :rules='{ required: true }'
            )

          .col-md-3
            fg-input(
              label='E-mail',
              placeholder='E-mail', 
              v-model='usuario.email', 
              name='email',
              type='email', 
              :rules='{ required: true, email: true }'
            )

          .col-md-3
            fg-input-mask(
              label='Celular',
              placeholder='Celular', 
              v-model='usuario.celular', 
              name='celular', 
              :rules='{ required: false, min: 14 }',
              :mask="['(##) ####-####', '(##) #####-####']"
            )
        
        .row
          .col-md-3
            fg-input(
              label='Senha',
              placeholder='Senha', 
              v-model='usuario.senha', 
              name='senha',
              type='password', 
              :rules='{ required: true }'
            )

          .col-md-3
            fg-select(
              v-if='perfis',
              label='Perfil',
              placeholder='Perfil', 
              v-model='usuario.perfil', 
              name='perfil', 
              :rules='{ required: true }',
              :options='perfis'
            )

          .col-md-3
            fg-select(
              label='Ativo',
              placeholder='Ativo', 
              v-model='usuario.ativo', 
              name='ativo', 
              :rules='{ required: false }',
              :options='options.ativo'
            )

    button.btn.btn-fill.btn-info(
      :class='{ disabled: loading }'
      @click='salvar()',
      type='button',
      slot='actions'
    ) Salvar
</template>
<script>
import Cadastro from 'src/components/GeneralViews/Cadastro.vue'
import UsuarioService from 'src/domain/usuario/UsuarioService'
import PerfilService from 'src/domain/perfil/PerfilService'
import Usuario from 'src/domain/usuario/Usuario'
import swal from 'sweetalert2'

export default {
  $validates: true,
  components: {
    'cadastro': Cadastro
  },
  data () {
    return {
      route: 'usuario',
      loading: false,
      options: {
        ativo: [
          {
            value: 1,
            text: 'Sim'
          },
          {
            value: 0,
            text: 'Não'
          }
        ]
      },
      usuario: {
        nome: null,
        email: null,
        celular: null,
        senha: null,
        ativo: null,
        perfil: null
      }
    }
  },
  asyncComputed: {
    perfis() {
      this.service = new PerfilService(this.$resource);
      return this.service
        .get()
        .then(perfis => {
          return perfis.map(tp => {
            return {
              value: tp.id,
              text: tp.nome
            }
          });
        });
    }
  },
  methods: {
    validate() {
      return this.$validator
        .validateAll()
        .then(success => success)
        .catch((err) => {
          console.log(err)
        })
    },
    salvar() {
      let app = this;

      this.validate()
        .then(success => {
          if(success && !this.loading) {
            this.loading = true;

            this.service = new UsuarioService(this.$resource);

            if(this.$route.params.id) {
              this.service
                .update(this.$route.params.id, this.usuario)
                .then(response => {
                  let success = response.success;

                  swal({
                    title: success ? 'Muito bem!' : 'Ops!',
                    html: success ? `O registro foi atualizado com sucesso` : `Falha ao salvar o registro. ${response.error}`,
                    buttonsStyling: false,
                    type: success ? 'success' : 'error',
                    confirmButtonClass: 'btn btn-success btn-fill',
                    allowOutsideClick: false
                  }).then(function() {
                    if(success)
                      app.$store.dispatch('setBackToList', true);
                  });
                });
            } else {
              this.service
                .save(this.usuario)
                .then(response => {
                  let success = response.success;

                  swal({
                    title: success ? 'Muito bem!' : 'Ops!',
                    html: success ? `O registro foi salvo com sucesso` : `Falha ao salvar o registro. ${response.error}`,
                    buttonsStyling: false,
                    type: success ? 'success' : 'error',
                    confirmButtonClass: 'btn btn-success btn-fill',
                    allowOutsideClick: false
                  }).then(function() {
                    if(success)
                      app.$store.dispatch('setBackToList', true);
                  });
                });
            }
          }
        });
    }
  },
  mounted() {
    this.usuario = new Usuario();

    if(this.$route.params.id) {
      this.service = new UsuarioService(this.$resource);
      this.service
        .get(this.$route.params.id)
        .then(usuario => this.usuario = usuario);
    }
  }
}
</script>

