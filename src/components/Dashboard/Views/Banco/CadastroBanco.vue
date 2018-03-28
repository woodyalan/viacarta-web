<template lang="pug">
  cadastro(
    :route='route'
  )
    .row(slot='fields')
      .col-xs-12
        .row
          .col-md-3
            fg-input(
              type='number',
              label='Código',
              placeholder='Código', 
              v-model='banco.codigo', 
              name='codigo', 
              :rules='{ required: true, numeric: true, min_value: 1 }'
            )

          .col-md-6
            fg-input(
              type='text',
              label='Nome',
              placeholder='Nome', 
              v-model='banco.nome', 
              name='nome', 
              :rules='{ required: true }'
            )
          
          .col-md-3
            fg-select(
              label='Ativo',
              placeholder='Ativo', 
              v-model='banco.ativo', 
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
import BancoService from 'src/domain/banco/BancoService'
import Banco from 'src/domain/banco/Banco'
import swal from 'sweetalert2'

export default {
  $validates: true,
  components: {
    'cadastro': Cadastro
  },
  data () {
    return {
      route: 'banco',
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
      banco: {
        nome: null,
        codigo: null
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

            this.service = new BancoService(this.$resource);

            if(this.$route.params.id) {
              this.service
                .update(this.$route.params.id, this.banco)
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
                  }, err => {
                    this.loading = false;
                    
                    swal({
                      title: 'Ops!',
                      html: `Falha ao salvar o registro. ${err}`,
                      buttonsStyling: false,
                      type: 'error',
                      confirmButtonClass: 'btn btn-danger btn-fill',
                      allowOutsideClick: false
                    })
                  });
                });
            } else {
              this.service
                .save(this.banco)
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
    this.banco = new Banco();

    if(this.$route.params.id) {
      this.service = new BancoService(this.$resource);
      this.service
        .get(this.$route.params.id)
        .then(banco => this.banco = banco);
    }
  }
}
</script>

