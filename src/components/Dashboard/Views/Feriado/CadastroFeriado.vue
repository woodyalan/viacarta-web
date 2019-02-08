<template lang="pug">
  cadastro(
    :route='route'
    :param-value='param'
  )
    .row(slot='fields')
      .col-xs-12
        .row
          .col-md-3
            fg-input(
              type='text',
              label='Nome',
              placeholder='Nome', 
              v-model='feriado.nome', 
              name='nome', 
              :rules='{ required: true }'
            )

          .col-md-3
            fg-datepicker(
              label='Data do Feriado',
              placeholder='Selecione', 
              v-model="feriado.dia",
              name="data", 
              format='dd/MM/yyyy',
              value-format='yyyy-MM-dd',
              :rules="{ required: true }",
              :mask="['##/##/####']"
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
import moment from 'moment'

import Cadastro from 'src/components/GeneralViews/Cadastro.vue'
import FeriadoService from 'src/domain/feriado/FeriadoService'
import CalendarioService from 'src/domain/calendario/CalendarioService'
import Feriado from 'src/domain/feriado/Feriado'
import swal from 'sweetalert2'

export default {
  $validates: true,
  components: {
    'cadastro': Cadastro
  },
  data () {
    return {
      route: 'feriado',
      param: this.$route.params.calendarioId,
      loading: false,
      feriado: {
        calendario: null,
        dia: new Date(),
        nome: null
      }      
    }
  },
  asyncComputed: {
    calendarios() {
      this.service = new CalendarioService(this.$resource);
      return this.service
        .get()
        .then(calendarios => {
          return calendarios.map(item => {
            return {
              value: item.id,
              text: item.nome
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

            // let feriado = Object.assign({}, this.feriado);

            // let dia = feriado.dia; 
            // dia = moment(dia, 'DD/MM/YYYY').format('YYYY-MM-DD');
            // feriado.dia = dia;

            this.service = new FeriadoService(this.$http);
            
            if(this.$route.params.id) {
              this.service
                .update(this.$route.params.id, this.feriado)
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
                .save(this.feriado)
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
    this.feriado = new Feriado(this.$route.params.calendarioId);

    if(this.$route.params.id) {
      this.service = new FeriadoService(this.$http);
      this.service
        .get(this.$route.params.id)
        .then(feriado => {
          let dia = feriado.dia;
          feriado.dia = moment(dia, 'YYYY-MM-DD');

          this.feriado = feriado;
        });
    }
  }
}
</script>

