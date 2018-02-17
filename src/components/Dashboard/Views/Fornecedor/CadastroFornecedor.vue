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
              :mask="['###.###.###-##']"
            )

          .col-md-3(v-if='tipoPessoa == "J"')
            fg-input-mask(
              label='CNPJ',
              placeholder='CNPJ', 
              v-model='pessoaJuridica.cnpj', 
              name='cnpj', 
              :rules='{ required: true, min: 18, cnpj: true }',
              :mask="['##.###.###/####-##']"
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
              v-model='fornecedor.ativo', 
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
import FornecedorService from 'src/domain/fornecedor/FornecedorService'
import PessoaFisica from 'src/domain/pessoaFisica/PessoaFisica'
import PessoaJuridica from 'src/domain/pessoaJuridica/PessoaJuridica'
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
      route: 'fornecedor',
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
      fornecedor: {
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

            let fornecedor = {
              tipo: this.tipo,
              fornecedor: this.fornecedor,
              pessoaFisica: this.pessoaFisica,
              pessoaJuridica: this.pessoaJuridica,
              pessoa: this.pessoa
            }

            if(this.tipoPessoa == 'F') {
              let nascimento = fornecedor.pessoaFisica.nascimento; 
              nascimento = moment(nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD');
              fornecedor.pessoaFisica.nascimento = nascimento;

              fornecedor.pessoaFisica.apelido = fornecedor.pessoaFisica.apelido || null;
              fornecedor.pessoaFisica.rg = fornecedor.pessoaFisica.rg || null;
              fornecedor.pessoaFisica.email = fornecedor.pessoaFisica.email || null;

              fornecedor.pessoaJuridica = new PessoaJuridica();
            } else {
              fornecedor.pessoaJuridica.inscricaoEstadual = fornecedor.pessoaJuridica.inscricaoEstadual || null;
              
              fornecedor.pessoaFisica = new PessoaFisica();
            }
            
            
            fornecedor.pessoa.celular = fornecedor.pessoa.celular || null;
            fornecedor.pessoa.telefone = fornecedor.pessoa.telefone || null;
            fornecedor.pessoa.complemento = fornecedor.pessoa.complemento || null;

            this.service = new FornecedorService(this.$resource);

            if(this.$route.params.id) {
              this.service
                .update(this.$route.params.id, fornecedor)
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
                .save(fornecedor)
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
        this.service = new FornecedorService(this.$resource);
        this.service
          .get(this.$route.params.id)
          .then(fornecedor => {
            this.fornecedor = {
              id: fornecedor.id,
              ativo: fornecedor.ativo
            }

            if(fornecedor.pessoaFisicaObject) {
              let nascimento = fornecedor.pessoaFisicaObject.nascimento;
              nascimento = moment(nascimento, 'YYYY-MM-DD').format('DD/MM/YYYY');
              fornecedor.pessoaFisicaObject.nascimento = nascimento;

              this.tipoPessoa = 'F';
              this.pessoaFisica = fornecedor.pessoaFisicaObject;
            } else {
              this.tipoPessoa = 'J';
              this.pessoaJuridica = fornecedor.pessoaJuridicaObject;
            }
            
            this.pessoa = fornecedor.pessoaObject;
          });
      } else {
        this.$store.dispatch('setEndereco', new Endereco());
      }
  }
}
</script>

