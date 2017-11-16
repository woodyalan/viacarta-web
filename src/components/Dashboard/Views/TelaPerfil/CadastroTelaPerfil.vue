<template lang="pug">
  cadastro(
    :route='route',
    :param-value='$route.params.perfilId'
  )
    .row(slot='fields')
      .col-xs-12
        .row
          .col-md-6
            fg-select(
              v-if='telas',
              label='Tela',
              placeholder='Tela', 
              v-model='telaPerfil.tela', 
              name='tela', 
              :rules='{ required: true }',
              :options='telas',
              :disabled='edit'
            )
          
          .col-md-2
            .form-group
              label Salvar
              .clearfix
              p-switch(v-model="telaPerfil.salvar")
                i.fa.fa-check(slot="on")
                i.fa.fa-times(slot="off")
          
          .col-md-2
            .form-group
              label Excluir
              .clearfix
              p-switch(v-model="telaPerfil.excluir")
                i.fa.fa-check(slot="on")
                i.fa.fa-times(slot="off")

    button.btn.btn-fill.btn-info(
      :class='{ disabled: loading }'
      @click='salvar()',
      type='button',
      slot='actions'
    ) Salvar
</template>
<script>
import Cadastro from 'src/components/GeneralViews/Cadastro.vue'
import TelaPerfilService from 'src/domain/telaPerfil/TelaPerfilService'
import TelaService from 'src/domain/tela/TelaService'
import TelaPerfil from 'src/domain/telaPerfil/TelaPerfil'
import PSwitch from 'src/components/UIComponents/Switch.vue'
import swal from 'sweetalert2'

export default {
  $validates: true,
  components: {
    'cadastro': Cadastro,
    PSwitch
  },
  computed: {
      edit() {
        return this.telaPerfil.createdAt != null
      }
  },
  data () {
    return {
      route: `telaPerfil`,
      param: this.$route.params.perfilId,
      loading: false,
      telaPerfil: {
        perfil: null,
        tela: null,
        salvar: true,
        excluir: true
      }
    }
  },
  asyncComputed: {
    telas() {
      this.service = new TelaService(this.$resource);
      return this.service
        .get()
        .then(telas => {
          return telas.map(item => {
            return {
              value: item.id,
              text: item.descricao
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

            this.service = new TelaPerfilService(this.$http);

            this.telaPerfil.salvar = this.telaPerfil.salvar ? 1 : 0;
            this.telaPerfil.excluir = this.telaPerfil.excluir ? 1 : 0;

            if(this.telaPerfil.createdAt) {
              this.service
                .update(this.telaPerfil.perfil, this.telaPerfil.tela, this.telaPerfil)
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
                .save(this.telaPerfil)
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
    this.telaPerfil = new TelaPerfil(this.$route.params.perfilId, null, true, true);

    if(this.$route.params.telaId) {
      this.service = new TelaPerfilService(this.$http);
      this.service
        .get(this.$route.params.perfilId, this.$route.params.telaId)
        .then(telaPerfil => {
          this.telaPerfil = telaPerfil;
          this.telaPerfil.salvar = telaPerfil.salvar == 1;
          this.telaPerfil.excluir = telaPerfil.excluir == 1;
        });
    }
  }
}
</script>

