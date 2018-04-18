<template lang="pug">
  cadastro(
    :route='route'
  )
    .row(slot='fields')
      .col-xs-12
        .row
          .col-md-3
            fg-input-mask(
              label='CPF',
              placeholder='CPF', 
              v-model='pessoaFisica.cpf', 
              name='cpf', 
              :rules='{ required: true, min: 14, cpf: true }',
              :mask="['###.###.###-##']",
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

          .col-md-3
            fg-input-mask(
              type='text',
              label='Nascimento',
              placeholder='Nascimento', 
              v-model='pessoaFisica.nascimento', 
              name='nascimento', 
              :rules="{ required: true, date_format: 'DD/MM/YYYY' }",
              :mask="['##/##/####']"
            )

        .row
          .col-md-3
            fg-select(
              v-if='cargos',
              label='Cargo',
              placeholder='Cargo', 
              v-model='funcionario.cargo', 
              name='cargo', 
              :rules='{ required: true }',
              :options='cargos'
            )

          .col-md-3
            fg-select(
              v-if='planosTrabalho'
              label='Plano de Trabalho',
              placeholder='Plano de Trabalho', 
              v-model='funcionario.planoTrabalho', 
              name='planoTrabalho', 
              :rules='{ required: true }',
              :options='planosTrabalho'
            )

          .col-md-3
            fg-input-mask(
              type='text',
              label='Data do Registro',
              placeholder='Data do Registro', 
              v-model='funcionario.registro', 
              name='registro', 
              :rules="{ required: false, date_format: 'DD/MM/YYYY' }",
              :mask="['##/##/####']"
            )

          .col-md-3
            fg-select(
              label='Ativo',
              placeholder='Ativo', 
              v-model='funcionario.ativo', 
              name='ativo', 
              :rules='{ required: true }',
              :options='options.ativo'
            )

        hr

        p.category.mb20 Documentos
        .row
          .col-md-3
            fg-input(
              label='RG',
              placeholder='RG', 
              v-model='pessoaFisica.rg', 
              name='rg', 
              :rules='{ required: false }'
            )

          .col-md-3
            fg-input(
              label='CNH',
              placeholder='CNH', 
              v-model='funcionario.cnh', 
              name='cnh', 
              :rules='{ required: false }'
            )

          .col-md-3
            fg-input(
              label='Plano de Saúde',
              placeholder='Plano de Saúde', 
              v-model='funcionario.planoSaude', 
              name='planoSaude', 
              :rules='{ required: false }'
            )

        hr

        p.category.mb20 Contato
        .row
          .col-md-3
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

        p.category.mb20 Anexos
        .row
          .col-md-12
            fg-dropzone(
              v-if="dropzoneVisible"
              name="myVueDropzone" 
              id="dropzone"
              label="Anexos"
              :value="funcionario.anexosPessoa"
              :url="uploadUrl"
              @fileRemoved="removerAnexo($event)"
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
import FuncionarioService from 'src/domain/funcionario/FuncionarioService'
import CargoService from 'src/domain/cargo/CargoService'
import Endereco from 'src/domain/cep/Endereco'
import Pessoa from 'src/domain/pessoa/Pessoa'
import PessoaFisica from 'src/domain/pessoaFisica/PessoaFisica'
import PlanoTrabalhoService from 'src/domain/planoTrabalho/PlanoTrabalhoService'
import PessoaFisicaService from 'src/domain/pessoaFisica/PessoaFisicaService'
import swal from 'sweetalert2'
import moment from 'moment'

export default {
  $validates: true,
  components: {
    'cadastro': Cadastro
  },
  data () {
    return {
      route: 'funcionario',
      uploadUrl: process.env.API_URL + 'anexoPessoa/upload',
      filesLoaded: false,
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
      funcionario: {
        id: null,
        cargo: null,
        planoTrabalho: null,
        ativo: null,
        registro: null,
        cnh: null,
        planoSaude: null,
        anexosPessoa: []
      },
      pessoaFisica: {
        pessoa: null,
        email: null,
        cpf: null,
        rg: null,
        nascimento: null,
        apelido: null
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
    cpf() {
      return this.pessoaFisica.cpf;
    },
    dropzoneVisible() {
      if(this.$route.params.id) 
        return this.filesLoaded;
      else
        return true;
    },
    dropzoneFiles() {
      return this.funcionario.anexosPessoa.length;
    }
  },
  watch: {
    cpf(value) {
      if(value && (value.length == 14) && !this.$route.params.id) {
        let pessoaFisica = this.findPessoaFisica(value);
      }
    }
  },
  methods: {
    removerAnexo(id) {
      if(id != undefined) {
        this.service = new AnexoDespesaService(this.$http);
        this.service.delete(id);
      }
    },
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
              cancelButtonText: 'Cancelar',
              confirmButtonText: 'Utilizar',
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

            let funcionario = {
              funcionario: Object.assign({}, this.funcionario),
              pessoaFisica: Object.assign({}, this.pessoaFisica),
              pessoa: Object.assign({}, this.pessoa)
            }

            funcionario.pessoaFisica.nascimento = moment(funcionario.pessoaFisica.nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD');
            
            funcionario.funcionario.registro = funcionario.funcionario.registro || null;
            
            if(funcionario.funcionario.registro) {
              funcionario.funcionario.registro = moment(funcionario.funcionario.registro, 'DD/MM/YYYY').format('YYYY-MM-DD');            
            }

            funcionario.pessoaFisica.apelido = funcionario.pessoaFisica.apelido || null;
            funcionario.pessoaFisica.rg = funcionario.pessoaFisica.rg || null;
            funcionario.pessoaFisica.email = funcionario.pessoaFisica.email || null;
            funcionario.pessoa.celular = funcionario.pessoa.celular || null;
            funcionario.pessoa.telefone = funcionario.pessoa.telefone || null;
            funcionario.pessoa.complemento = funcionario.pessoa.complemento || null;
            funcionario.funcionario.cnh = funcionario.funcionario.cnh || null;
            funcionario.funcionario.planoSaude = funcionario.funcionario.planoSaude || null;

            this.service = new FuncionarioService(this.$resource);

            if(this.$route.params.id) {
              this.service
                .update(this.$route.params.id, funcionario)
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
                .save(funcionario)
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
      if(this.$route.params.id) {
        this.service = new FuncionarioService(this.$resource);
        this.service
          .get(this.$route.params.id)
          .then(funcionario => {
            this.funcionario = {
              id: funcionario.id,
              cargo: funcionario.cargo,
              planoTrabalho: funcionario.planoTrabalho,
              ativo: funcionario.ativo,
              registro: moment(funcionario.registro, 'YYYY-MM-DD').format('DD/MM/YYYY'),
              cnh: funcionario.cnh,
              planoSaude: funcionario.planoSaude,
              anexosPessoa: funcionario.anexosPessoa
            }

            let nascimento = funcionario.pessoaFisicaObject.nascimento;
            nascimento = moment(nascimento, 'YYYY-MM-DD').format('DD/MM/YYYY');
            funcionario.pessoaFisicaObject.nascimento = nascimento;

            this.pessoaFisica = funcionario.pessoaFisicaObject;
            this.pessoa = funcionario.pessoaFisicaObject.pessoaObject;

            this.funcionario.anexosPessoa = this.funcionario.anexosPessoa.map(a => {
              return {
                  id: a.id,
                  size: a.size,
                  path: a.arquivo,
                  name: a.arquivo
              }
            });

            if(this.funcionario.anexosPessoa) {
              this.filesLoaded = true;
            }
          });
      } else {
        this.$store.dispatch('setEndereco', new Endereco());
      }
  }
}
</script>

