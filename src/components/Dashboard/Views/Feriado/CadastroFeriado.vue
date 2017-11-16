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
              label='Data',
              placeholder='Selecione', 
              v-model="feriado.dia",
              name="dia",
              format='dd/MM/yyyy',
              value-format='yyyy-MM-dd',
              :rules='{ required: true }'
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
import { DatePicker } from 'element-ui'

import Cadastro from 'src/components/GeneralViews/Cadastro.vue'
import FeriadoService from 'src/domain/feriado/FeriadoService'
import CalendarioService from 'src/domain/calendario/CalendarioService'
import Feriado from 'src/domain/feriado/Feriado'
import swal from 'sweetalert2'

Vue.use(DatePicker);

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

            this.service = new FeriadoService(this.$resource);

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
                });
            }
          }
        });
    }
  },
  mounted() {
    this.feriado = new Feriado(this.param);

    if(this.$route.params.id) {
      this.service = new FeriadoService(this.$resource);
      this.service
        .get(this.$route.params.id)
        .then(feriado => this.feriado = feriado);
    }
  }
}
</script>

