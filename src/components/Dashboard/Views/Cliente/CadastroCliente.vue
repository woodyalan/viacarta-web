<template lang="pug">
  cadastro(
    :route='route'
  )
    .row(slot='fields')
      .col-xs-12
        .row
          .col-xs-12
            label.control-label Tipo
            .row
              .col-xs-6.col-md-2(v-for='option in options.tiposPessoa')
                p-radio(
                  :label='option.value'
                  v-model='tipoPessoa'
                  :disabled='pessoa.id != null'
                ) {{ option.text }}

        hr

        .row
          .col-md-3(v-if='tipoPessoa == "F"')
            fg-input-mask(
              label='CPF',
              placeholder='CPF', 
              v-model='pessoaFisica.cpf', 
              name='cpf', 
              :rules='{ required: true, min: 14, cpf: true }',
              :mask="['###.###.###-##']",
              :disabled='pessoa.id != null'
            )

          .col-md-3(v-if='tipoPessoa == "J"')
            fg-input-mask(
              label='CNPJ',
              placeholder='CNPJ', 
              v-model='pessoaJuridica.cnpj', 
              name='cnpj', 
              :rules='{ required: true, min: 18, cnpj: true }',
              :mask="['##.###.###/####-##']",
              :disabled='pessoa.id != null'
            )

          .col-md-6
            fg-input(
              type='text',
              label='Nome',
              placeholder='Nome', 
              v-model='pessoa.nome', 
              name='nome', 
              :rules='{ required: true }'
            )

          .col-md-3(v-if='tipoPessoa == "F"')
            fg-input-mask(
              type='text',
              label='Nascimento',
              placeholder='Nascimento', 
              v-model='pessoaFisica.nascimento', 
              name='nascimento', 
              :rules="{ required: true, date_format: 'DD/MM/YYYY' }",
              :mask="['##/##/####']"
            )

          .col-md-3
            fg-select(
              label='Ativo',
              placeholder='Ativo', 
              v-model='cliente.ativo', 
              name='ativo', 
              :rules='{ required: true }',
              :options='options.ativo'
            )

        hr

        p.category.mb20 Documentos
        .row
          .col-md-3(v-if='tipoPessoa == "F"')
            fg-input(
              label='RG',
              placeholder='RG', 
              v-model='pessoaFisica.rg', 
              name='rg', 
              :rules='{ required: false }'
            )

          .col-md-3(v-if='tipoPessoa == "J"')
            fg-input(
              label='Inscrição Estadual',
              placeholder='Inscrição Estadual', 
              v-model='pessoaJuridica.inscricaoEstadual', 
              name='inscricaoEstadual', 
              :rules='{ required: false }'
            )

        hr

        p.category.mb20 Contato
        .row
          .col-md-3(v-if='tipoPessoa == "F"')
            fg-input(
              type='email',
              label='E-mail',
              placeholder='E-mail', 
              v-model='pessoaFisica.email', 
              name='email', 
              :rules='{ required: false }'
            )

          .col-md-3
            fg-input-mask(
              label='Celular',
              placeholder='Celular', 
              v-model='pessoa.celular', 
              name='celular', 
              :rules='{ required: false, min: 14 }',
              :mask="['(##) ####-####', '(##) #####-####']"
            )

          .col-md-3
            fg-input-mask(
              label='Telefone',
              placeholder='Telefone', 
              v-model='pessoa.telefone', 
              name='telefone', 
              :rules='{ required: false, min: 14 }',
              :mask="['(##) ####-####']"
            )

        hr

        p.category.mb20 Endereço
        .row
          .col-md-3
            fg-input-cep(
              type='text',
              label='CEP',
              placeholder='CEP', 
              v-model='pessoa.cep', 
              name='cep',
              :rules='{ required: true, min: 9 }'
            )
          
          .col-md-6
            fg-input-logradouro(
              type='text',
              label='Endereço',
              placeholder='Endereço', 
              v-model='pessoa.endereco', 
              name='endereco', 
              :rules='{ required: true }'
            )
          
          .col-md-3
            fg-input(
              type='text',
              label='Número',
              placeholder='Número', 
              v-model='pessoa.numero', 
              name='numero', 
              :rules='{ required: true }'
            )

        .row
          .col-md-3
            fg-input(
              type='text',
              label='Complemento',
              placeholder='Complemento', 
              v-model='pessoa.complemento', 
              name='complemento', 
              :rules='{ required: false }'
            )

          .col-md-3
            fg-input-bairro(
              type='text',
              label='Bairro',
              placeholder='Bairro', 
              v-model='pessoa.bairro', 
              name='bairro', 
              :readonly='false'
              :rules='{ required: true }'
            )

          .col-md-3
            fg-input-cidade(
              type='text',
              label='Cidade',
              placeholder='Cidade', 
              v-model='pessoa.cidade', 
              name='cidade',
              :readonly='false',
              :rules='{ required: true }'
            )

          .col-md-3
            fg-input-estado(
              type='text',
              label='Estado',
              placeholder='Estado', 
              v-model='pessoa.estado', 
              name='estado', 
              :readonly='false',
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
import Cadastro from 'src/components/GeneralViews/Cadastro.vue'
import ClienteService from 'src/domain/cliente/ClienteService'
import PessoaFisica from 'src/domain/pessoaFisica/PessoaFisica'
import PessoaFisicaService from 'src/domain/pessoaFisica/PessoaFisicaService'
import PessoaJuridica from 'src/domain/pessoaJuridica/PessoaJuridica'
import PessoaJuridicaService from 'src/domain/pessoaJuridica/PessoaJuridicaService'
import Pessoa from 'src/domain/pessoa/Pessoa'
import CargoService from 'src/domain/cargo/CargoService'
import Endereco from 'src/domain/cep/Endereco'
import PlanoTrabalhoService from 'src/domain/planoTrabalho/PlanoTrabalhoService'
import swal from 'sweetalert2'
import moment from 'moment'

export default {
  $validates: true,
  components: {
    'cadastro': Cadastro
  },
  data () {
    return {
      route: 'cliente',
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
        ],
        tiposPessoa: [
          {
            value: 'J',
            text: 'Jurídica'
          },
          {
            value: 'F',
            text: 'Física'
          }
        ]
      },
      tipoPessoa: 'J',
      cliente: {
        id: null,
        ativo: null
      },
      pessoaFisica: {
        pessoa: null,
        email: null,
        cpf: null,
        rg: null,
        nascimento: null
      },
      pessoaJuridica: {
        pessoa: null,
        cnpj: null,
        inscricaoEstadual: null
      },
      pessoa: {
        id: null,
        nome: null,
        telefone: null,
        celular: null,
        cep: null,
        endereco: null,
        numero: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    }
  },
  asyncComputed: {
    cargos() {
      this.service = new CargoService(this.$resource);
      return this.service
        .get()
        .then(cargos => {
          return cargos.map(c => {
            return {
              value: c.id,
              text: c.nome
            }
          });
        });
    },
    planosTrabalho() {
      this.service = new PlanoTrabalhoService(this.$resource);
      return this.service
        .get()
        .then(planosTrabalho => {
          return planosTrabalho.map(p => {
            return {
              value: p.id,
              text: p.nome
            }
          });
        });
    }
  },
  computed: {
    cnpj() {
      return this.pessoaJuridica.cnpj;
    },
    cpf() {
      return this.pessoaFisica.cpf;
    }
  },
  watch: {
    cpf(value) {
      if(value && (value.length == 14) && !this.$route.params.id) {
        this.findPessoaFisica(value);
      }
    },
    cnpj(value) {
      if(value && (value.length == 18) && !this.$route.params.id) {
        this.findPessoaJuridica(value);
      }
    }
  },
  methods: {
    findPessoaFisica(cpf) {
      let app = this;

      this._resource = new PessoaFisicaService(this.$http);
      this._resource
        .get(cpf)
        .then(pessoaFisica => {
          if(pessoaFisica) {
            swal({
              title: 'O que deseja fazer?',
              html: `Encontrei um registro para <strong>${pessoaFisica.pessoaObject.nome}</strong> com o cpf <strong>${pessoaFisica.cpf}</strong>.`,
              buttonsStyling: false,
              type: 'question',
              showCancelButton: true,
              confirmButtonClass: 'btn btn-success btn-fill',
              cancelButtonClass: 'btn btn-danger btn-fill',
              confirmButtonText: 'Utilizar',
              cancelButtonText: 'Cancelar',
              allowOutsideClick: false
            }).then(function(result) {
              if(result) {
                let nascimento = pessoaFisica.nascimento;
                nascimento = moment(nascimento, 'YYYY-MM-DD').format('DD/MM/YYYY');
                pessoaFisica.nascimento = nascimento;

                app.pessoaFisica = pessoaFisica;
                app.pessoa = pessoaFisica.pessoaObject;
              }
            }, function(dismiss) {
              if(dismiss === 'cancel') {
                app.pessoaFisica = new PessoaFisica();
                app.pessoa = new Pessoa();
              }
            });
          } else {
            let cpf = app.cpf;

            app.pessoaFisica = new PessoaFisica();
            app.pessoa = new Pessoa();

            app.pessoaFisica.cpf = cpf;
          }            
        });
    },
    findPessoaJuridica(cnpj) {
      let app = this;

      this._resource = new PessoaJuridicaService(this.$http);
      this._resource
        .get(cnpj)
        .then(pessoaJuridica => {
          if(pessoaJuridica) {
            swal({
              title: 'O que deseja fazer?',
              html: `Encontrei um registro para <strong>${pessoaJuridica.pessoaObject.nome}</strong> com o cnpj <strong>${pessoaJuridica.cnpj}</strong>.`,
              buttonsStyling: false,
              type: 'question',
              showCancelButton: true,
              confirmButtonClass: 'btn btn-success btn-fill',
              cancelButtonClass: 'btn btn-danger btn-fill',
              cancelButtonText: 'Cancelar',
              confirmButtonText: 'Utilizar',
              allowOutsideClick: false
            }).then(function(result) {
              if(result) {
                app.pessoaJuridica = pessoaJuridica;
                app.pessoa = pessoaJuridica.pessoaObject;
              }
            }, function(dismiss) {
              if(dismiss === 'cancel') {
                app.pessoaJuridica = new PessoaJuridica();
                app.pessoa = new Pessoa();
              }
            });
          } else {
            let cnpj = app.cnpj;

            app.pessoaJuridica = new PessoaJuridica();
            app.pessoa = new Pessoa();

            app.pessoaJuridica.cnpj = cnpj;
          }            
        });
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

            let cliente = {
              tipo: this.tipoPessoa,
              cliente: this.cliente,
              pessoaFisica: this.pessoaFisica,
              pessoaJuridica: this.pessoaJuridica,
              pessoa: this.pessoa
            }

            if(this.tipoPessoa == 'F') {
              let nascimento = cliente.pessoaFisica.nascimento; 
              nascimento = moment(nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD');
              cliente.pessoaFisica.nascimento = nascimento;

              cliente.pessoaFisica.apelido = cliente.pessoaFisica.apelido || null;
              cliente.pessoaFisica.rg = cliente.pessoaFisica.rg || null;
              cliente.pessoaFisica.email = cliente.pessoaFisica.email || null;

              cliente.pessoaJuridica = new PessoaJuridica();
            } else {
              cliente.pessoaJuridica.inscricaoEstadual = cliente.pessoaJuridica.inscricaoEstadual || null;
              
              cliente.pessoaFisica = new PessoaFisica();
            }
            
            cliente.pessoa.celular = cliente.pessoa.celular || null;
            cliente.pessoa.telefone = cliente.pessoa.telefone || null;
            cliente.pessoa.complemento = cliente.pessoa.complemento || null;

            this.service = new ClienteService(this.$resource);

            if(this.$route.params.id) {
              this.service
                .update(this.$route.params.id, cliente)
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
                });
            } else {
              this.service
                .save(cliente)
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
                });
            }
          }
        });
    }
  },
  mounted() {
      if(this.$route.params.id) {
        this.service = new ClienteService(this.$resource);
        this.service
          .get(this.$route.params.id)
          .then(cliente => {
            this.cliente = {
              id: cliente.id,
              ativo: cliente.ativo
            }

            if(cliente.pessoaFisicaObject) {
              let nascimento = cliente.pessoaFisicaObject.nascimento;
              nascimento = moment(nascimento, 'YYYY-MM-DD').format('DD/MM/YYYY');
              cliente.pessoaFisicaObject.nascimento = nascimento;

              this.tipoPessoa = 'F';
              this.pessoaFisica = cliente.pessoaFisicaObject;
            } else {
              this.tipoPessoa = 'J';
              this.pessoaJuridica = cliente.pessoaJuridicaObject;
            }
            
            this.pessoa = cliente.pessoaObject;
          });
      } else {
        this.$store.dispatch('setEndereco', new Endereco());
      }
  }
}
</script>

