<template lang="pug">
  cadastro(
    :route='route'
    :param-value='param'
  )
    .row(slot='fields')
      .col-xs-12
        .row
          .col-md-6
            fg-input(
              type='text',
              label='Nome',
              placeholder='Nome', 
              v-model='contato.nome', 
              name='nome', 
              :rules='{ required: true }'
            )

          .col-md-3
            fg-input(
              type='email',
              label='E-mail',
              placeholder='E-mail', 
              v-model='contato.email', 
              name='email', 
              :rules='{ required: true }'
            )

          .col-md-3
            fg-input-mask(
              label='Celular',
              placeholder='Celular', 
              v-model='contato.celular', 
              name='celular', 
              :rules='{ required: false, min: 14 }',
              :mask="['(##) ####-####', '(##) #####-####']"
            )
          
        .row
          .col-md-3
            fg-input-mask(
              label='Telefone',
              placeholder='Telefone', 
              v-model='contato.telefone', 
              name='telefone', 
              :rules='{ required: false, min: 14 }',
              :mask="['(##) ####-####']"
            )

          .col-md-3
            fg-input(
              label='Setor',
              placeholder='Setor', 
              v-model='contato.setor', 
              name='setor', 
              :rules='{ required: false }'
            )
  
    button.btn.btn-fill.btn-info(
      :class='{ disabled: loading }'
      @click='salvar()',
      type='button',
      slot='actions'
    ) Salvar
</template>
<script>
import Vue from 'vue'

import Cadastro from 'src/components/GeneralViews/Cadastro.vue'
import ContatoService from 'src/domain/contato/ContatoService'
import Contato from 'src/domain/contato/Contato'
import swal from 'sweetalert2'

export default {
  $validates: true,
  components: {
    'cadastro': Cadastro
  },
  data () {
    return {
      route: 'contato',
      param: this.$route.params.pessoaId,
      loading: false,
      contato: {
        nome: null,
        email: null,
        telefone: null,
        celular: null,
        setor: null
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

            this.service = new ContatoService(this.$http);
            
            this.contato.telefone = this.contato.telefone || null;
            this.contato.celular = this.contato.celular || null;

            if(this.$route.params.id) {
              this.service
                .update(this.$route.params.id, this.contato)
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
                .save(this.contato)
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
    this.contato = new Contato(this.$route.params.pessoaId);

    if(this.$route.params.id) {
      this.service = new ContatoService(this.$http);
      this.service
        .get(this.$route.params.id)
        .then(contato => this.contato = contato);
    }
  }
}
</script>

