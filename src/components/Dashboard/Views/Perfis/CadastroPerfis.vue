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
              v-model='perfil.nome', 
              name='nome', 
              :rules='{ required: true }'
            )

          .col-md-3
            fg-select(
              label='Ativo',
              placeholder='Ativo', 
              v-model='perfil.ativo', 
              name='ativo', 
              :rules='{ required: true }',
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
import PerfilService from 'src/domain/perfil/PerfilService'
import Perfil from 'src/domain/perfil/Perfil'
import swal from 'sweetalert2'

export default {
  $validates: true,
  components: {
    'cadastro': Cadastro
  },
  data () {
    return {
      route: 'perfis',
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
      perfil: {
        nome: null,
        ativo: null
      }
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

            let perfil = new Perfil(this.perfil.nome, this.perfil.ativo);

            this.service = new PerfilService(this.$resource);

            if(this.$route.params.id) {
              this.service
                .update(this.$route.params.id, perfil)
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
                }, err => {
                  this.loading = false;
                  
                  swal({
                    title: 'Ops!',
                    html: `Falha ao salvar o registro. ${err}`,
                    buttonsStyling: false,
                    type: 'error',
                    confirmButtonClass: 'btn btn-danger btn-fill',
                    allowOutsideClick: false
                  });
                });
            } else {
              this.service
                .save(perfil)
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
                }, err => {
                  this.loading = false;
                  
                  swal({
                    title: 'Ops!',
                    html: `Falha ao salvar o registro. ${err}`,
                    buttonsStyling: false,
                    type: 'error',
                    confirmButtonClass: 'btn btn-danger btn-fill',
                    allowOutsideClick: false
                  });
                });
            }
          }
        });
    }
  },
  mounted() {
    this.perfil = new Perfil();

    if(this.$route.params.id) {
      this.service = new PerfilService(this.$resource);
      this.service
        .get(this.$route.params.id)
        .then(perfil => this.perfil = perfil);
    }
  }
}
</script>

