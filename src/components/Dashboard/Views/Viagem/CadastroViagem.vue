<template lang="pug">
  cadastro(
    :route='route'
  )
    .row(slot='fields')
      .col-xs-12
        .row
          .col-md-6
            fg-select(
              v-if='veiculos',
              label='Veículo',
              placeholder='Veículo', 
              v-model='viagem.veiculo', 
              name='veiculo', 
              :rules='{ required: true }',
              :options='veiculos'
            )

          .col-md-6
            fg-select(
              v-if='funcionarios',
              label='Funcionário',
              placeholder='Funcionário', 
              v-model='viagem.funcionario', 
              name='funcionario', 
              :rules='{ required: true }',
              :options='funcionarios'
            )

        .row
          .col-sm-6.col-md-3
            fg-input(
              type="number",
              label='Odômetro Inicial',
              placeholder='Odômetro Inicial', 
              v-model="viagem.odometroInicio",
              name="odometroInicio",
              :rules='{ required: true }'
            )

          .col-sm-6.col-md-3
            fg-input(
              type="number",
              label='Odômetro Final',
              placeholder='Odômetro Final', 
              v-model="viagem.odometroTermino",
              name="odometroTermino",
              :rules='{ required: true }'
            )

          .col-sm-6.col-md-3
            fg-datepicker(
              label='Data da Saída',
              placeholder='Selecione', 
              v-model="viagem.saida",
              name="data",
              format='dd/MM/yyyy',
              value-format='yyyy-MM-dd',
              :rules="{ required: true }",
              :mask="['##/##/####']"
            )

          .col-sm-6.col-md-3
            fg-datepicker(
              label='Data da Chegada',
              placeholder='Selecione', 
              v-model="viagem.chegada",
              name="data",
              format='dd/MM/yyyy',
              value-format='yyyy-MM-dd',
              :rules="{ required: true }",
              :mask="['##/##/####']"
            )

        .row
          .col-md-12
            fg-textarea(
              label='Observações',
              placeholder='Observações sobre esta Viagem', 
              v-model='viagem.observacoes', 
              name='observacoes', 
              :rules='{ required: false }',
              :rows='8'
            )

        hr

        p.category.mb20 Projetos Atendidos na Viagem
        .row
          .col-sm-9.col-md-10
            fg-select(
              label='Projetos Disponíveis',
              placeholder='Selecione', 
              v-model='projetoViagem.projeto', 
              name='projeto',
              :rules='{ required: false }',
              :options='projetosFuncionario'
            )   

          .col-sm-3.col-md-2   
            label.control-label &nbsp;
            .clearfix  
            button.btn.btn-fill.btn-info.btn-block(
              @click="addProjeto()"
            ) Adicionar  

        .row
          .col-xs-12
            el-table.table.table-striped.table-no-bordered.table-hover(
              :data='viagem.projetos', 
              style='width: 100%'
            )
              el-table-column(
                prop='projetoObject.nome', 
                label='Projeto'
              )
              el-table-column(width='150' class-name='text-center', fixed='right')
                template(scope='props')
                  a.btn.btn-simple.btn-danger.btn-xs.btn-icon.remove(
                    @click='removeProjeto(props.$index)'
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
import VeiculoService from 'src/domain/veiculo/VeiculoService'
import FuncionarioService from 'src/domain/funcionario/FuncionarioService'
import FuncionarioProjetoService from 'src/domain/funcionarioProjeto/FuncionarioProjetoService'
import ViagemService from 'src/domain/viagem/ViagemService'
import ProjetoService from 'src/domain/projeto/ProjetoService'
import ProjetoViagemService  from 'src/domain/projetoViagem/ProjetoViagemService'
import Viagem from 'src/domain/viagem/Viagem'
import swal from 'sweetalert2'
import moment from 'moment'

export default {
  $validates: true,
  components: {
    'cadastro': Cadastro
  },
  data () {
    return {
      route: 'viagem',
      loading: false,
      viagem: {
        funcionario: null,
        veiculo: null,
        odometroInicio: null,
        odometroTermino: null,
        saida: null, 
        chegada: null, 
        observacoes: null, 
        projetos: null
      },
      projetoViagem: {
        projeto: null
      }
    }
  },
  watch: {
    veiculo(value) {
      if(value){
        this.service = new VeiculoService(this.$resource);
        this.service
          .get(value)
          .then(veiculo => {
            if(!this.$route.params.id){
              this.viagem.odometroInicio = veiculo.odometro;
              this.viagem.odometroTermino = veiculo.odometro;
            }
          });
      }
    }
  },
  computed: {
    veiculo() {
      return this.viagem.veiculo;
    }
  },
  asyncComputed: {
    projetosFuncionario() {
      if(this.viagem.funcionario) {
        this.service = new FuncionarioProjetoService(this.$http);
        return this.service
          .getProjetos(this.viagem.funcionario)
          .then(projetos => {
            return projetos.map(projeto => {
              return {
                value: projeto.projeto,
                text: projeto.projetoObject.nome
              }
            });
          })
      }

      return;
    },
    veiculos() {
      this.service = new VeiculoService(this.$resource);
      return this.service
        .get()
        .then(veiculos => {
          return veiculos.map(veiculo => {
            return {
              value: veiculo.id,
              text: veiculo.nome + " (" + veiculo.placa + ")"
            }
          });
        });
    },
    funcionarios() {
      this.service = new FuncionarioService(this.$resource);
      return this.service
        .get()
        .then(funcionarios => {
          return funcionarios.map(funcionario => {
            return {
              value: funcionario.id,
              text: funcionario.pessoaFisicaObject.pessoaObject.nome
            }
          });
        });
    }
  },
  methods: {
    addProjeto() {
      if(!this.projetoViagem.projeto) {
        swal({
          title: 'Ops!',
          html: `Você deve selecionar um projeto.`,
          buttonsStyling: false,
          type: 'info',
          confirmButtonClass: 'btn btn-success btn-fill',
          allowOutsideClick: false
        });
      } else {
        let projetoSelecionado = this.projetosFuncionario.filter(p => {
          if(p.value == this.projetoViagem.projeto) {
            return p;
          }
        });

        let projeto = {
          projeto: this.projetoViagem.projeto,
          projetoObject: {
            nome: projetoSelecionado[0].text
          }
        };

        this.viagem.projetos.push(projeto);
        this.projetoViagem.projeto = null;
      }
    },
    removeProjeto(index) {
      if(index != undefined) {
        let app = this;

        swal({
          title: 'Atenção!',
          html: `Confirma a remoção do projeto?`,
          type: 'question',
          buttonsStyling: false,
          showCancelButton: true,
          confirmButtonClass: 'btn btn-success btn-fill',
          cancelButtonClass: 'btn btn-danger btn-fill',
          allowOutsideClick: false
        }).then(function() {
          let projeto = app.viagem.projetos[index];
          app.viagem.projetos.splice(index, 1);

          if (app.$route.params.id) {
            app.service = new ProjetoViagemService(app.$http);
            app.service
              .delete(app.$route.params.id, projeto.projeto)
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
            if(this.viagem.projetos.length > 0) {
              this.loading = true;

              // let viagem = Object.assign({}, this.viagem);

              // viagem.saida = moment(viagem.saida, 'DD/MM/YYYY').format('YYYY-MM-DD');
              // viagem.chegada = moment(viagem.chegada, 'DD/MM/YYYY').format('YYYY-MM-DD');

              this.service = new ViagemService(this.$resource);

              if(this.$route.params.id) {
                this.service
                  .update(this.$route.params.id, this.viagem)
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
                  .save(this.viagem)
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
            } else {
              swal({
                title: 'Ops!',
                html: `Você deve adicionar projetos a esta viagem.`,
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
    this.viagem = new Viagem();

    if(this.$route.params.id) {
      this.service = new ViagemService(this.$resource);
      this.service
        .get(this.$route.params.id)
        .then(viagem => {
          viagem.saida = moment(viagem.saida, 'YYYY-MM-DD');
          viagem.chegada = moment(viagem.chegada, 'YYYY-MM-DD');

          this.viagem = viagem;
        });
    }
  }
}
</script>

