<template lang="pug">
  cadastro(
    :route='route',
    :param-value='param'
  )
    .row(slot='fields')
      .col-xs-12
        .row
          .col-md-3
            fg-select(
              label='Dia da Semana',
              placeholder='Dia da Semana', 
              v-model='diaTrabalho.diaSemana', 
              name='diaSemana', 
              :rules='{ required: true }',
              :options='options.diasSemana'
            )

        hr

        p.category.mb20 Horários de Trabalho
        .row
          .col-sm-4.col-md-2(
            v-for="(horario, key) in diaTrabalho.horarios"
          )
            fg-input-mask(
              :label='`Batida ${key + 1}`',
              placeholder='Horário', 
              v-model='diaTrabalho.horarios[key].horario', 
              :name='`horario${key + 1}`',
              :rules='{ required: true }',
              :mask="['##:##']"
            )   
            button.btn.btn-fill.btn-xs.btn-danger(
              v-if="diaTrabalho.horarios.length > 2",
              @click='removeHorario(key)',
            ) Remover

          .col-sm-2
            label.control-label &nbsp;
            .clearfix 
            button.btn.btn-info(
              type='button'
              @click='addHorario()',
              title='Adicionar Batida'
            ) 
              i.ti-plus

  
    button.btn.btn-fill.btn-info(
      :class='{ disabled: loading }'
      @click='salvar()',
      type='button',
      slot='actions'
    ) Salvar
</template>
<script>
import Cadastro from 'src/components/GeneralViews/Cadastro.vue'
import DiaTrabalho from 'src/domain/diaTrabalho/DiaTrabalho'
import DiaTrabalhoService from 'src/domain/diaTrabalho/DiaTrabalhoService'
import HorarioDiaTrabalhoService from 'src/domain/horarioDiaTrabalho/HorarioDiaTrabalhoService'
import swal from 'sweetalert2'
import moment from 'moment'

export default {
  $validates: true,
  components: {
    'cadastro': Cadastro
  },
  data () {
    return {
      options: {
        diasSemana: [
          {
            value: 2,
            text: 'Segunda-feira'
          },
          {
            value: 3,
            text: 'Terça-feira'
          },
          {
            value: 4,
            text: 'Quarta-feira'
          },
          {
            value: 5,
            text: 'Quinta-feira'
          },
          {
            value: 6,
            text: 'Sexta-feira'
          },
          {
            value: 7,
            text: 'Sábado'
          },
          {
            value: 1,
            text: 'Domingo'
          }
        ]
      },
      route: 'diaTrabalho',
      loading: false,
      param: this.$route.params.planoTrabalhoId,
      diaTrabalho: {
        planoManutencao: null,
        diaSemana: null,
        horarios: [{ horario: null }]
      }
    }
  },
  methods: {
    addHorario() {
      this.diaTrabalho.horarios.push({ horario: null });
    },
    removeHorario(index) {
      if(index != undefined) {
        let app = this;

        swal({
          title: 'Atenção!',
          html: `Confirma a remoção da batida ${index + 1}?`,
          type: 'question',
          buttonsStyling: false,
          showCancelButton: true,
          confirmButtonClass: 'btn btn-success btn-fill',
          cancelButtonClass: 'btn btn-danger btn-fill',
          allowOutsideClick: false
        }).then(function() {
          let horario = app.diaTrabalho.horarios[index];

          if (horario.id != undefined) {
            app.service = new HorarioDiaTrabalhoService(app.$resource);
            app.service
              .delete(horario.id)
              .then(result => {
                app.diaTrabalho.horarios.splice(index, 1);
              });
          } else {
            app.diaTrabalho.horarios.splice(index, 1);
          }
        });
      }
    },
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

            this.service = new DiaTrabalhoService(this.$http);

            if(this.$route.params.id) {
              this.service
                .update(this.$route.params.id, this.diaTrabalho)
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
                .save(this.diaTrabalho)
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
    let app = this;
    this.diaTrabalho = new DiaTrabalho(this.$route.params.planoTrabalhoId);

    if(this.$route.params.id) {
      this.service = new DiaTrabalhoService(this.$http);
      this.service
        .get(this.$route.params.id)
        .then(diaTrabalho => {
          this.diaTrabalho = diaTrabalho;
        });
    } else {
      this.diaTrabalho.horarios.push({ horario: null });
      this.diaTrabalho.horarios.push({ horario: null });
    }
  }
}
</script>

