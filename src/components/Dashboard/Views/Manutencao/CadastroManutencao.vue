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
              v-model='manutencao.veiculo', 
              name='veiculo', 
              :rules='{ required: true }',
              :options='veiculos'
            )

          .col-md-6
            fg-select(
              v-if='fornecedores',
              label='Fornecedor',
              placeholder='Fornecedor', 
              v-model='manutencao.fornecedor', 
              name='fornecedor', 
              :rules='{ required: true }',
              :options='fornecedores'
            )

        .row
          .col-sm-6.col-md-3
            fg-input(
              label='Odômetro',
              placeholder='Odômetro', 
              v-model="manutencao.odometro",
              name="odometro",
              :rules='{ required: true }'
            )

          .col-sm-6.col-md-3
            fg-datepicker(
              label='Data da Manutenção',
              placeholder='Selecione', 
              v-model="manutencao.data",
              name="data", 
              format='dd/MM/yyyy',
              value-format='yyyy-MM-dd',
              :rules="{ required: true }",
              :mask="['##/##/####']"
            )

          .col-sm-6.col-md-3
            fg-select(
              v-if='options.ativo',
              label='Ativa',
              placeholder='Ativa', 
              v-model='manutencao.ativo', 
              name='ativo', 
              :rules='{ required: true }',
              :options='options.ativo'
            )

        hr

        p.category.mb20 Serviços Realizados
        .row
          .col-sm-9.col-md-10
            fg-select(
              label='Serviços Disponíveis',
              placeholder='Selecione', 
              v-model='servicoManutencao.servico', 
              name='ativo',
              :rules='{ required: false }',
              :options='servicoManutencao.servicos'
            )   

          .col-sm-3.col-md-2   
            label.control-label &nbsp;
            .clearfix  
            button.btn.btn-fill.btn-info.btn-block(
              @click="addServico()"
            ) Adicionar  

        .row
          .col-xs-12
            el-table.table.table-striped.table-no-bordered.table-hover(
              :data='manutencao.servicos', 
              style='width: 100%'
            )
              el-table-column(
                prop='servicoObject.nome', 
                label='Serviço'
              )
              el-table-column(width='150' class-name='text-center', fixed='right')
                template(scope='props')
                  a.btn.btn-simple.btn-danger.btn-xs.btn-icon.remove(
                    @click='removeServico(props.$index)'
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
import FornecedorService from 'src/domain/fornecedor/FornecedorService'
import ManutencaoService from 'src/domain/manutencao/ManutencaoService'
import ServicoAvisoManutencaoService from 'src/domain/servicoAvisoManutencao/ServicoAvisoManutencaoService'
import ServicoPlanoManutencaoService  from 'src/domain/servicoPlanoManutencao/ServicoPlanoManutencaoService'
import Manutencao from 'src/domain/manutencao/Manutencao'
import swal from 'sweetalert2'
import moment from 'moment'

export default {
  $validates: true,
  components: {
    'cadastro': Cadastro
  },
  data () {
    return {
      route: 'manutencao',
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
      manutencao: {
        fornecedor: null,
        veiculo: null,
        data: null,
        odometro: null,
        ativo: null, 
        servicos: null
      },
      servicoManutencao: {
        servico: null,
        servicos: []
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
            if(!this.$route.params.id)
              this.manutencao.odometro = veiculo.odometro;

            this.service = new ServicoPlanoManutencaoService(this.$http);
            this.service
              .getTelas(veiculo.planoManutencao)
              .then(servicos => {
                this.servicoManutencao.servicos = servicos.map(servico => {
                  return {
                    value: servico.servicoObject.id,
                    text: servico.servicoObject.nome
                  }
                });
              })
          });
      }
    }
  },
  computed: {
    veiculo() {
      return this.manutencao.veiculo;
    }
  },
  asyncComputed: {
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
    fornecedores() {
      this.service = new FornecedorService(this.$resource);
      return this.service
        .get()
        .then(fornecedores => {
          return fornecedores.map(fornecedor => {
            return {
              value: fornecedor.id,
              text: fornecedor.pessoaObject.nome
            }
          });
        });
    }
  },
  methods: {
    addServico() {
      if(!this.servicoManutencao.servico) {
        swal({
          title: 'Ops!',
          html: `Você deve selecionar um serviço.`,
          buttonsStyling: false,
          type: 'info',
          confirmButtonClass: 'btn btn-success btn-fill',
          allowOutsideClick: false
        });
      } else {
        let servicoSelecionado = this.servicoManutencao.servicos.filter(s => {
          if(s.value == this.servicoManutencao.servico) {
            return s;
          }
        });

        let servico = {
          servico: this.servicoManutencao.servico,
          servicoObject: {
            nome: servicoSelecionado[0].text
          }
        };

        this.manutencao.servicos.push(servico);
        this.servicoManutencao.servico = null;
      }
    },
    removeServico(index) {
      if(index != undefined) {
        let app = this;

        swal({
          title: 'Atenção!',
          html: `Confirma a remoção do serviço?`,
          type: 'question',
          buttonsStyling: false,
          showCancelButton: true,
          confirmButtonClass: 'btn btn-success btn-fill',
          cancelButtonClass: 'btn btn-danger btn-fill',
          allowOutsideClick: false
        }).then(function() {
          let servico = app.manutencao.servicos[index];
          app.manutencao.servicos.splice(index, 1);

          if (app.$route.params.id) {
            app.service = new ServicoAvisoManutencaoService(app.$http);
            app.service
              .delete(app.$route.params.id, servico.servico)
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
            if(this.manutencao.servicos.length > 0) {
              this.loading = true;

              // let manutencao = Object.assign({}, this.manutencao);

              // let data = manutencao.data; 
              // data = moment(data, 'DD/MM/YYYY').format('YYYY-MM-DD');
              // manutencao.data = data;

              this.service = new ManutencaoService(this.$resource);

              if(this.$route.params.id) {
                this.service
                  .update(this.$route.params.id, this.manutencao)
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
                  .save(this.manutencao)
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
            } else {
              swal({
                title: 'Ops!',
                html: `Você deve adicionar serviços a esta manutenção.`,
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
    this.manutencao = new Manutencao();

    if(this.$route.params.id) {
      this.service = new ManutencaoService(this.$resource);
      this.service
        .get(this.$route.params.id)
        .then(manutencao => {
          let data = manutencao.data;
          data = moment(data, 'YYYY-MM-DD');
          manutencao.data = data;

          this.manutencao = manutencao;
        });
    }
  }
}
</script>

