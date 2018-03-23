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
          .col-sm-4.col-md-3
            fg-timepicker(
              label='Horário',
              placeholder='Horário', 
              v-model='horarioTrabalho.horario', 
              name='horario',
              :rules='{ required: false }',
              :mask="['##:##']"
            )   

          .col-sm-4.col-md-3.col-lg-2
            label.control-label &nbsp;
            .clearfix  
            button.btn.btn-fill.btn-info.btn-block(
              @click="addHorario()"
            ) Adicionar  

        .row
          .col-xs-12
            el-table.table.table-striped.table-no-bordered.table-hover(
              :data='diaTrabalho.horarios', 
              style='width: 100%'
            )
              el-table-column(
                prop='horario', 
                label='Horário'
              )
              el-table-column(width='150' class-name='text-center', fixed='right')
                template(scope='props')
                  a.btn.btn-simple.btn-warning.btn-xs.btn-icon.edit(
                    @click='editHorario(props.$index)'
                  )
                    i.ti-pencil-alt
                  a.btn.btn-simple.btn-danger.btn-xs.btn-icon.remove(
                    @click='removeHorario(props.$index)'
                  )
                    i.ti-close
  
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
        horarios: []
      },
      horarioTrabalho: {
        index: null,
        horario: null,
        horarios: []
      }
    }
  },
  methods: {
    editHorario(index) {
      let horario = this.diaTrabalho.horarios[index];
      this.horarioTrabalho.index = index;
      this.horarioTrabalho.horario = moment(horario.horario, 'HH:mm').format('YYYY-MM-DD HH:mm');
    },
    addHorario() {
      if(!this.horarioTrabalho.horario) {
        swal({
          title: 'Ops!',
          html: `Você deve informar um horário.`,
          buttonsStyling: false,
          type: 'info',
          confirmButtonClass: 'btn btn-success btn-fill',
          allowOutsideClick: false
        });
      } else {
        let horario = moment(this.horarioTrabalho.horario, 'HH:mm').format('HH:mm');

        if(this.horarioTrabalho.index != undefined) {
          let horarioEdit = this.diaTrabalho.horarios[this.horarioTrabalho.index];
          horarioEdit.horario = horario;

          this.diaTrabalho.horarios[this.horarioTrabalho.index] = horarioEdit;
        } else {
          this.diaTrabalho.horarios.push({ horario });
        }

        this.horarioTrabalho.index = null;
        this.horarioTrabalho.horario = null;
      }
    },
    removeHorario(index) {
      if(index != undefined) {
        let app = this;

        swal({
          title: 'Atenção!',
          html: `Confirma a remoção do horário?`,
          type: 'question',
          buttonsStyling: false,
          showCancelButton: true,
          confirmButtonClass: 'btn btn-success btn-fill',
          cancelButtonClass: 'btn btn-danger btn-fill',
          allowOutsideClick: false
        }).then(function() {
          let horario = app.diaTrabalho.horarios[index];
          app.diaTrabalho.horarios.splice(index, 1);

          if (horario.id != undefined) {
            app.service = new HorarioDiaTrabalhoService(app.$resource);
            app.service
              .delete(horario.id)
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
            if(this.diaTrabalho.horarios.length > 0) {
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
                  });
              }
            } else {
              swal({
                title: 'Ops!',
                html: `Você deve adicionar horários a este dia de trabalho.`,
                buttonsStyling: false,
                type: 'info',
                confirmButtonClass: 'btn btn-success btn-fill',
                allowOutsideClick: false
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
    }
  }
}
</script>

