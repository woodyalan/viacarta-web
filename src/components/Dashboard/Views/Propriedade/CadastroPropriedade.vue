<template lang="pug">
  cadastro(
    :route='route'
  )
    .row(slot='fields')
      .col-xs-12
        .row
          .col-sm-4.col-md-3
            fg-input(
              label='Número da Ficha',
              placeholder='Número da Ficha', 
              v-model='fichaCadastro.numero', 
              name='numero',
              :rules='{ required: false, max: 20 }'
            )

          .col-sm-4.col-md-6
            fg-input(
              label='Instalação',
              placeholder='Instalação', 
              v-model='fichaCadastro.instalacao', 
              name='instalacao'
              :rules='{ required: true }'
            )

          .col-sm-3
            fg-select(
              v-if="regioes"
              label='Região',
              placeholder='Região', 
              v-model='fichaCadastro.regiaoId', 
              name='regiaoId'
              :rules='{ required: false }'
              :options='regioes'
            )
          
          .col-sm-4.col-md-3
            fg-select(
              v-if='visitas && this.$route.params.id',
              label='Registro de Visita',
              placeholder='Registro de Visita', 
              v-model='novaVisita', 
              name='visita'
              :options='visitas'
              :rules='{ required: true }'
            )

        p.category.mb20 Dados do Imóvel
        .row
          .col-sm-6.col-md-3
            fg-input(
              label='Tipo',
              placeholder='Tipo', 
              v-model='imovel.tipo', 
              name='tipo'
              :rules='{ required: false }'
            )

          .col-sm-6.col-md-3
            fg-input(
              label='Natureza',
              placeholder='Natureza', 
              v-model='imovel.natureza', 
              name='natureza'
              :rules='{ required: false }'
            )
          
          .col-sm-3
            fg-input(
              label='IPTU',
              placeholder='IPTU', 
              v-model='imovel.iptu', 
              name='iptu'
              :rules='{ required: false }'
            )

          .col-sm-3
            fg-input(
              label='Incra',
              placeholder='Incra', 
              v-model='imovel.incra', 
              name='incra'
              :rules='{ required: false }'
            )

          .col-sm-3
            fg-input(
              label='Lote',
              placeholder='Lote', 
              v-model='imovel.lote', 
              name='lote'
              :rules='{ required: false }'
            )

          .col-sm-3
            fg-input(
              label='Quadra',
              placeholder='Quadra', 
              v-model='imovel.quadra', 
              name='quadra'
              :rules='{ required: false }'
            )

          .col-sm-3
            fg-input(
              label='Latitude',
              placeholder='Latitude', 
              v-model='imovel.latitude', 
              name='latitude'
              :rules='{ required: false }'
            )

          .col-sm-3
            fg-input(
              label='Longitude',
              placeholder='Longitude', 
              v-model='imovel.longitude', 
              name='longitude'
              :rules='{ required: false }'
            )

        .row
          .col-sm-3
            fg-input-mask(
              label='CEP',
              placeholder='CEP', 
              v-model='imovel.cep', 
              name='cepImovel',
              :mask="['#####-###']"
              :rules='{ required: false, min: 9 }'
              @blur="buscarCepImovel()"
            )

          .col-sm-6
            fg-input(
              label='Endereço',
              placeholder='Endereço', 
              v-model='imovel.endereco', 
              name='enderecoImovel'
              :rules='{ required: false }'
            )

          .col-sm-3
            fg-input(
              label='Número',
              placeholder='Número', 
              v-model='imovel.numero', 
              name='numeroImovel'
              :rules='{ required: false }'
            )

          .col-sm-3
            fg-input(
              label='Complemento',
              placeholder='Complemento', 
              v-model='imovel.complemento', 
              name='complementoImovel'
              :rules='{ required: false }'
            )

          .col-sm-3
            fg-input(
              label='Bairro',
              placeholder='Bairro', 
              v-model='imovel.bairro', 
              name='bairroImovel'
              :rules='{ required: false }'
            )

          .col-sm-3
            fg-input(
              label='Cidade',
              placeholder='Cidade', 
              v-model='imovel.municipio', 
              name='cidadeImovel'
              :rules='{ required: false }'
            )

          .col-sm-3
            fg-input(
              label='UF',
              placeholder='UF', 
              v-model='imovel.uf', 
              name='ufImovel'
              :rules='{max: 2, required: false }'
            )

          .col-sm-3
            fg-input-money(
              label='Área Total',
              placeholder='Área Total', 
              v-model='imovel.areaTotal', 
              name='areaTotal',
              :money='meters',
              :rules='{ required: false }'
            )

          .col-sm-3
            fg-input(
              label='Tipo do Documento',
              placeholder='Tipo do Documento', 
              v-model='documento.tipo', 
              name='ufImovel'
              :rules='{required: false }'
            )

          .col-sm-3
            fg-input(
              label='Cartório',
              placeholder='Cartório', 
              v-model='documento.cartorio', 
              name='cartorio'
              :rules='{ required: false }'
            )

          .col-sm-3
            fg-input(
              label='Comarca',
              placeholder='Comarca', 
              v-model='documento.comarca', 
              name='comarca'
              :rules='{ required: false }'
            )

          .col-sm-3
            fg-input(
              label='Matrícula',
              placeholder='Matrícula', 
              v-model='documento.matricula', 
              name='matricula'
              :rules='{ required: false }'
            )

          .col-sm-3
            fg-input(
              label='Livro',
              placeholder='Livro', 
              v-model='documento.livro', 
              name='livro'
              :rules='{ required: false }'
            )
            
          .col-sm-3
            fg-input(
              label='Folha',
              placeholder='Folha', 
              v-model='documento.folha', 
              name='folha'
              :rules='{ required: false }'
            )
            
          .col-sm-3
            fg-datepicker(
              label='Data',
              placeholder='Selecione', 
              v-model="documento.dataRegistro",
              name="data",
              format='dd/MM/yyyy',
              value-format='yyyy-MM-dd',
              :rules="{ required: false, min: 10 }",
              :mask="['##/##/####']"
            )

          .col-sm-3
            fg-input(
              label='UF'
              placeholder='UF', 
              v-model='documento.uf', 
              name='ufDocumento'
              :rules='{required: false, min: 2}'
            )

        // .row
        //   .col-md-12
        //     #mapa

        .row
          .col-sm-12
            fg-textarea(
              label='Observações',
              placeholder='Observações', 
              v-model='imovel.observacoes', 
              name='observacoesImovel',
              :rules='{required: false }'
            )

        p.category.mb20 Dados do Proprietário
        .row
          .col-sm-12.col-md-6
            fg-input(
              label='Nome',
              placeholder='Nome', 
              v-model='proprietario.nome', 
              name='nome'
              :rules='{ required: false }'
            )

          .col-sm-6.col-md-3
            fg-input(
              label='Profissão',
              placeholder='Profissão', 
              v-model='proprietario.profissao', 
              name='profissao'
              :rules='{ required: false }'
            )

          .col-sm-6.col-md-3
            fg-input(
              label='Nacionalidade',
              placeholder='Nacionalidade', 
              v-model='proprietario.nacionalidade', 
              name='nacionalidade'
              :rules='{ required: false }'
            )

        .row
          .col-sm-3
            fg-input-mask(
              label='CEP',
              placeholder='CEP', 
              v-model='proprietario.cep', 
              name='cepProprietario',
              :mask="['#####-###']"
              :rules='{ required: false, min: 9 }'
              @blur="buscarCepProprietario()"
            )

          .col-sm-6
            fg-input(
              label='Endereço',
              placeholder='Endereço', 
              v-model='proprietario.endereco', 
              name='enderecoProprietario'
              :rules='{ required: false }'
            )

          .col-sm-3
            fg-input(
              label='Número',
              placeholder='Número', 
              v-model='proprietario.numero', 
              name='numeroProprietario'
              :rules='{ required: false }'
            )

          .col-sm-3
            fg-input(
              label='Complemento',
              placeholder='Complemento', 
              v-model='proprietario.complemento', 
              name='complementoProprietario'
              :rules='{ required: false }'
            )

          .col-sm-3
            fg-input(
              label='Bairro',
              placeholder='Bairro', 
              v-model='proprietario.bairro', 
              name='bairroProprietario'
              :rules='{ required: false }'
            )

          .col-sm-3
            fg-input(
              label='Cidade',
              placeholder='Cidade', 
              v-model='proprietario.municipio', 
              name='cidadeProprietario'
              :rules='{ required: false }'
            )

          .col-sm-3
            fg-input(
              label='UF',
              placeholder='UF', 
              v-model='proprietario.uf', 
              name='ufProprietario'
              :rules='{max: 2, required: false }'
            )

        .row
          .col-sm-3
            fg-input-mask(
              label='Telefone',
              placeholder='Telefone', 
              v-model='proprietario.telefone', 
              name='telefone'
              :rules='{ required: false, min: 14 }',
              :mask="['(##) ####-####', '(##) #####-####']"
            )

          .col-sm-3
            fg-input(
              label='E-mail',
              placeholder='E-mail', 
              v-model='proprietario.email', 
              name='email'
              :rules='{ required: false, email: true }'
            )

          .col-sm-3
            fg-input-mask(
              label='CPF',
              placeholder='CPF', 
              v-model='proprietario.cpf', 
              name='cpf'
              :rules='{ required: false, min: 14, cpf: true }'
              :mask='["###.###.###-##"]'
            )

          .col-sm-3
            fg-input(
              label='RG',
              placeholder='RG', 
              v-model='proprietario.rg', 
              name='rg'
              :rules='{ required: false }'
            )

          .col-sm-3
            fg-select(
              v-if='estadosCivis',
              label='Estado Civil',
              placeholder='Estado Civil', 
              v-model='proprietario.estadoCivil', 
              name='estadoCivil'
              :options='estadosCivis'
              :rules='{ required: false }'
            )

          .col-sm-9
            fg-input(
              label='Cônjuge',
              placeholder='Cônjuge', 
              v-model='proprietario.conjuge', 
              name='conjuge'
              :rules='{ required: false }'
            )

        .row
          .col-sm-12
            fg-textarea(
              label='Observações',
              placeholder='Observações', 
              v-model='proprietario.observacoes', 
              name='observacoesProprietario',
              :rules='{required: false }'
            )

        p.category.mb20 Fotos
        .row
          .col-md-12
            fg-dropzone(
              v-if="dropzoneVisible"
              name="myVueDropzone" 
              id="dropzone"
              label="Fotos do Imóvel"
              :value="fotosImovel"
              :url="uploadUrl"
              @fileRemoved="removerFotoImovel($event)"
            )

        .row
          .col-md-12
            fg-dropzone(
              v-if="dropzoneVisible"
              name="myVueDropzone" 
              id="dropzone"
              label="Fotos da Documentação"
              :value="fotosDocumentos"
              :url="uploadUrl"
              @fileRemoved="removerFotoDocumento($event)"
            )
  
    button.btn.btn-fill.btn-info(
      :class='{ disabled: loading }'
      @click='salvar()',
      type='button',
      slot='actions'
    ) Salvar
</template>

<script>
import Cadastro from "src/components/GeneralViews/Cadastro.vue";
import PropriedadeService from "src/domain/propriedade/PropriedadeService";
import RegiaoService from "src/domain/regiao/RegiaoService";
import CepService from "src/domain/cep/CepService";
// import gmapsInit from "src/domain/utils/gmaps";
import swal from "sweetalert2";
import moment from "moment";

export default {
  $validates: true,
  components: {
    cadastro: Cadastro
  },
  data() {
    return {
      route: "propriedade",
      loading: false,
      uploadUrl: process.env.API_URL + "propriedade/upload",
      filesDocumentosLoaded: false,
      filesImovelLoaded: false,
      meters: {
        decimal: ",",
        thousands: "",
        precision: 2,
        masked: false
      },
      novaVisita: false,
      fichaCadastro: {
        id: null,
        numero: null,
        instalacao: null,
        regiaoId: null
      },
      imovel: {
        tipo: null,
        natureza: null,
        iptu: null,
        incra: null,
        lote: null,
        quadra: null,
        cep: null,
        endereco: null,
        numero: null,
        complemento: null,
        bairro: null,
        municipio: null,
        uf: null,
        latitude: null,
        longitude: null,
        areaTotal: 0,
        observacoes: null
      },
      documento: {
        tipo: null,
        cartorio: null,
        comarca: null,
        matricula: null,
        livro: null,
        folha: null,
        dataRegistro: null,
        uf: null
      },
      proprietario: {
        nome: null,
        profissao: null,
        cep: null,
        endereco: null,
        numero: null,
        complemento: null,
        bairro: null,
        municipio: null,
        uf: null,
        telefone: null,
        nacionalidade: "Brasileiro",
        estadoCivil: "Solteiro",
        rg: null,
        cpf: null,
        conjuge: null,
        observacoes: null,
        email: null
      },
      fotosImovel: [],
      fotosDocumentos: [],
      estadosCivis: [
        { text: "Solteiro", value: "Solteiro" },
        { text: "Casado", value: "Casado" },
        { text: "Viúvo", value: "Viúvo" },
        { text: "Divorciado", value: "Divorciado" },
        { text: "União Estável", value: "União Estável" }
      ],
      visitas: [
        {
          text: "Registrar Nova Visita",
          value: true
        },
        { text: "Não Registrar Visita", value: false }
      ],
      dropzoneOptions: {
        dictDefaultMessage: "Arraste seus arquivos aqui",
        dictMaxFilesExceeded: "Você não pode adicionar mais arquivos",
        dictRemoveFile: "Remover",
        dictFileTooBig:
          "O arquivo é muito grande. Envie arquivos de até {{maxFilesize}}MB.",
        dictRemoveFileConfirmation: "Confirma a remoção do arquivo?",
        url: process.env.API_URL + "propriedade/upload",
        addRemoveLinks: true,
        acceptedFiles: "image/*, application/pdf",
        thumbnailWidth: 150,
        maxFiles: 20,
        maxFilesize: 2,
        headers: {
          "x-access-token": this.$store.state.token
        }
      }
    };
  },
  asyncComputed: {
    regioes() {
      this.service = new RegiaoService(this.$resource);
      return this.service.get().then(result => {
        return result.map(regiao => {
          return {
            text: regiao.nome,
            value: regiao.id
          };
        });
      });
    }
  },
  computed: {
    position() {
      const center = {
        lat: -23.533773,
        lng: -46.62529
      };

      let position;

      if (this.imovel.latitude && this.imovel.longitude) {
        position = {
          lat: this.imovel.latitude,
          lng: this.imovel.longitude
        };
      }

      return position || center;
    },
    cepImovel() {
      return this.imovel.cep;
    },
    cepProprietario() {
      return this.proprietario.cep;
    },
    dropzoneVisible() {
      if (this.$route.params.id)
        return this.filesDocumentosLoaded && this.filesImovelLoaded;
      else return true;
    },
    dropzoneFotosImovel() {
      return this.fotosImovel.length;
    },
    dropzoneFotosDocumentos() {
      return this.fotosDocumentos.length;
    }
  },
  methods: {
    validateCep: function(value) {
      let cleanValue = value.replace(/[^\d]/g, "");
      return cleanValue.length == 8;
    },
    consultaCep: function(cep) {
      this.service = new CepService(this.$http);
      return this.service.getEndereco(cep).then(endereco => endereco);
    },
    buscarCepImovel(cep) {
      cep = cep || this.imovel.cep;
      if (this.validateCep(cep)) {
        this.consultaCep(cep).then(result => {
          this.imovel = {
            ...this.imovel,
            endereco: null,
            bairro: null,
            municipio: null,
            uf: null
          };

          if (result.valid) {
            this.imovel.cep = result.cep;
            this.imovel.endereco = result.logradouro.toUpperCase();
            this.imovel.bairro = result.bairro.toUpperCase();
            this.imovel.municipio = result.cidade.toUpperCase();
            this.imovel.uf = result.estado.toUpperCase();

            this.buscarCepProprietario(cep);
          }
        });
      }
    },
    buscarCepProprietario(cep) {
      cep = cep || this.proprietario.cep;
      if (this.validateCep(cep)) {
        this.consultaCep(cep).then(result => {
          this.proprietario = {
            ...this.proprietario,
            endereco: null,
            bairro: null,
            municipio: null,
            uf: null
          };

          if (result.valid) {
            this.proprietario.cep = result.cep;
            this.proprietario.endereco = result.logradouro.toUpperCase();
            this.proprietario.bairro = result.bairro.toUpperCase();
            this.proprietario.municipio = result.cidade.toUpperCase();
            this.proprietario.uf = result.estado.toUpperCase();
          }
        });
      }
    },
    validate() {
      return this.$validator
        .validateAll()
        .then(success => success)
        .catch(err => {
          console.log(err);
        });
    },
    removerFotoImovel(id) {
      if (id != undefined) {
        this.service = new PropriedadeService(this.$http);
        this.service.deleteFotoImovel(id);
      }
    },
    removerFotoDocumento(id) {
      if (id != undefined) {
        this.service = new PropriedadeService(this.$http);
        this.service.deleteFotoDocumento(id);
      }
    },
    salvar() {
      let app = this;

      this.validate().then(success => {
        if (success && !this.loading) {
          this.loading = true;

          let fichaCadastro = {
            fichaCadastro: this.fichaCadastro,
            imovel: this.imovel,
            documento: this.documento,
            proprietario: this.proprietario,
            fotosImovel: this.fotosImovel,
            fotosDocumentos: this.fotosDocumentos,
            sync: false
          };

          if (this.novaVisita) {
            fichaCadastro = {
              ...fichaCadastro,
              novaVisita: moment().format("YYYY-MM-DD LTS")
            };
          }

          this.service = new PropriedadeService(this.$http);

          if (this.$route.params.id) {
            this.service.update(this.$route.params.id, fichaCadastro).then(
              response => {
                let success = response.success;

                swal({
                  title: success ? "Muito bem!" : "Ops!",
                  html: success
                    ? `O registro foi atualizado com sucesso`
                    : `Falha ao salvar o registro. ${response.error}`,
                  buttonsStyling: false,
                  type: success ? "success" : "error",
                  confirmButtonClass: "btn btn-success btn-fill",
                  allowOutsideClick: false
                }).then(function() {
                  if (success) app.$store.dispatch("setBackToList", true);
                });
              },
              err => {
                this.loading = false;

                swal({
                  title: "Ops!",
                  html: `Falha ao salvar o registro. ${err}`,
                  buttonsStyling: false,
                  type: "error",
                  confirmButtonClass: "btn btn-danger btn-fill",
                  allowOutsideClick: false
                });
              }
            );
          } else {
            this.service.save(fichaCadastro).then(
              response => {
                let success = response.success;

                swal({
                  title: success ? "Muito bem!" : "Ops!",
                  html: success
                    ? `O registro foi salvo com sucesso`
                    : `Falha ao salvar o registro. ${response.error}`,
                  buttonsStyling: false,
                  type: success ? "success" : "error",
                  confirmButtonClass: "btn btn-success btn-fill",
                  allowOutsideClick: false
                }).then(function() {
                  if (success) app.$store.dispatch("setBackToList", true);
                });
              },
              err => {
                this.loading = false;

                swal({
                  title: "Ops!",
                  html: `Falha ao salvar o registro. ${err}`,
                  buttonsStyling: false,
                  type: "error",
                  confirmButtonClass: "btn btn-danger btn-fill",
                  allowOutsideClick: false
                });
              }
            );
          }
        }
      });
    }
  },
  async mounted() {
    // try {
    //   const google = await gmapsInit();
    //   const el = document.getElementById("mapa");

    //   const position = this.position;

    //   const options = {
    //     zoom: 17,
    //     center: position
    //   }

    //   const map = new google.maps.Map(el, options);
    //   const marker = new google.maps.Marker({position, map, draggable: true});

    //   const app = this;

    //   google.maps.event.addListener(marker, 'dragend', function(evt){
    //     app.imovel.latitude = evt.latLng.lat().toFixed(3);
    //     app.imovel.longitude = evt.latLng.lng().toFixed(3);
    //   });
    //   console.log(location);
    // } catch (error) {
    //   console.error(error);
    // }

    if (this.$route.params.id) {
      this.service = new PropriedadeService(this.$http);
      this.service.get(this.$route.params.id).then(propriedade => {
        propriedade.imovelFichaCadastro.areaTotal =
          parseFloat(propriedade.imovelFichaCadastro.areaTotal) || 0;

        propriedade.documentacaoImovelFichaCadastro.dataRegistro = moment(
          propriedade.documentacaoImovelFichaCadastro.dataRegistro,
          "YYYY-MM-DD"
        );

        this.proprietario = propriedade.proprietarioFichaCadastro;
        this.imovel = propriedade.imovelFichaCadastro;
        this.documento = propriedade.documentacaoImovelFichaCadastro;

        this.service.getFotosImovel(this.$route.params.id).then(fotos => {
          this.fotosImovel = fotos.map(a => {
            return {
              id: a.id,
              size: a.size,
              path: a.arquivo,
              name: a.arquivo
            };
          });

          this.filesImovelLoaded = true;
        });

        this.service.getFotosDocumentos(this.$route.params.id).then(fotos => {
          this.fotosDocumentos = fotos.map(a => {
            return {
              id: a.id,
              size: a.size,
              path: a.arquivo,
              name: a.arquivo
            };
          });

          this.filesDocumentosLoaded = true;
        });

        delete propriedade.proprietarioFichaCadastro;
        delete propriedade.imovelFichaCadastro;
        delete propriedade.documentacaoImovelFichaCadastro;
        delete propriedade.fotoImovelFichaCadastros;
        delete propriedade.fotoDocumentoFichaCadastros;

        this.fichaCadastro = propriedade;
      });
    }
  }
};
</script>

<style>
#mapa {
  height: 400px;
  width: 100%;
  margin-bottom: 40px;
}
</style>
