<template lang="pug">
  .contact-us.full-screen
    .wrapper.wrapper-full-page.section.content
      div
        .container
          div(
            v-if="fichaCadastro"
          )
            h4.title Ficha de Cadastro

            .row 
              .col-xs-3.form-group
                p Número
                | {{fichaCadastro.numero}}

              .col-xs-6.form-group
                p Instalação
                | {{fichaCadastro.instalacao}}

              .col-xs-3.form-group
                p Criado em
                | {{moment(fichaCadastro.createdAt).format('DD/MM/YYYY')}}

            .page-header
              h6.title Imóvel

            .row 
              .col-xs-3.form-group
                p Tipo
                | {{fichaCadastro.imovelFichaCadastro.tipo}}

              .col-xs-3.form-group
                p Natureza
                | {{fichaCadastro.imovelFichaCadastro.natureza}}
            
              .col-xs-3.form-group
                p IPTU
                | {{fichaCadastro.imovelFichaCadastro.iptu || '-'}}

              .col-xs-3.form-group
                p INCRA
                | {{fichaCadastro.imovelFichaCadastro.incra || '-'}}
            
            .row 
              .col-xs-3.form-group
                p CEP
                | {{fichaCadastro.imovelFichaCadastro.cep}}

              .col-xs-6.form-group
                p Endereço
                | {{fichaCadastro.imovelFichaCadastro.endereco}}
            
              .col-xs-3.form-group
                p Número
                | {{fichaCadastro.imovelFichaCadastro.numero}}

            .row
              .col-xs-3.form-group
                p Complemento
                | {{fichaCadastro.imovelFichaCadastro.complemento || '-'}}

              .col-xs-3.form-group
                p Bairro
                | {{fichaCadastro.imovelFichaCadastro.bairro}}
            
              .col-xs-3.form-group
                p Municipio
                | {{fichaCadastro.imovelFichaCadastro.municipio}}

              .col-xs-3.form-group
                p UF
                | {{fichaCadastro.imovelFichaCadastro.uf}}

            .row
              .col-xs-3.form-group
                p Lote
                | {{fichaCadastro.imovelFichaCadastro.lote || '-'}}

              .col-xs-3.form-group
                p Quadra
                | {{fichaCadastro.imovelFichaCadastro.quadra || '-'}}
            
              .col-xs-3.form-group
                p Área Total
                | {{fichaCadastro.imovelFichaCadastro.areaTotal}}

              .col-xs-3.form-group
                p Localização
                a {{localizacao || '-'}}

            .row
              .col-xs-3.form-group
                p Observações
                | {{fichaCadastro.imovelFichaCadastro.obervacoes || '-'}}

            .page-header
              h6.title Documentação

            .row
              .col-xs-3.form-group
                p Tipo
                | {{fichaCadastro.documentacaoImovelFichaCadastro.tipo || '-'}}

              .col-xs-3.form-group
                p Cartório
                | {{fichaCadastro.documentacaoImovelFichaCadastro.cartorio || '-'}}
            
              .col-xs-3.form-group
                p Comarca
                | {{fichaCadastro.documentacaoImovelFichaCadastro.comarca || '-'}}

              .col-xs-3.form-group
                p Matrícula
                | {{fichaCadastro.documentacaoImovelFichaCadastro.matricula || '-'}}

            .row
              .col-xs-3.form-group
                p Livro
                | {{fichaCadastro.documentacaoImovelFichaCadastro.livro || '-'}}
            
              .col-xs-3.form-group
                p Folha
                | {{fichaCadastro.documentacaoImovelFichaCadastro.folha || '-'}}

              .col-xs-3.form-group
                p Data do Registro
                | {{fichaCadastro.documentacaoImovelFichaCadastro.dataRegistro || '-'}}
              
              .col-xs-3.form-group
                p UF
                | {{fichaCadastro.documentacaoImovelFichaCadastro.uf || '-'}}

            .page-header
              h6.title Proprietário

            .row 
              .col-xs-6.form-group
                p Nome
                | {{fichaCadastro.proprietarioFichaCadastro.nome}}

              .col-xs-3.form-group
                p Profissão
                | {{fichaCadastro.proprietarioFichaCadastro.profissao || '-'}}
            
              .col-xs-3.form-group
                p Número
                | {{fichaCadastro.proprietarioFichaCadastro.nacionalidade || '-'}}

            .row 
              .col-xs-3.form-group
                p CEP
                | {{fichaCadastro.proprietarioFichaCadastro.cep}}

              .col-xs-6.form-group
                p Endereço
                | {{fichaCadastro.proprietarioFichaCadastro.endereco}}
            
              .col-xs-3.form-group
                p Número
                | {{fichaCadastro.proprietarioFichaCadastro.numero}}

            .row
              .col-xs-3.form-group
                p Complemento
                | {{fichaCadastro.proprietarioFichaCadastro.complemento || '-'}}

              .col-xs-3.form-group
                p Bairro
                | {{fichaCadastro.proprietarioFichaCadastro.bairro}}
            
              .col-xs-3.form-group
                p Municipio
                | {{fichaCadastro.proprietarioFichaCadastro.municipio}}

              .col-xs-3.form-group
                p UF
                | {{fichaCadastro.proprietarioFichaCadastro.uf}}
              
            .row
              .col-xs-3.form-group
                p Telefone
                | {{fichaCadastro.proprietarioFichaCadastro.telefone}}
                
              .col-xs-3.form-group
                p E-mail
                | {{fichaCadastro.proprietarioFichaCadastro.email || '-'}}

              .col-xs-3.form-group
                p CPF
                | {{fichaCadastro.proprietarioFichaCadastro.cpf}}

              .col-xs-3.form-group
                p RG
                | {{fichaCadastro.proprietarioFichaCadastro.rg}}   

            .row
              .col-xs-3.form-group
                p Estado Civil
                | {{fichaCadastro.proprietarioFichaCadastro.estadoCivil}}

              .col-xs-6.form-group
                p Conjuge
                | {{fichaCadastro.proprietarioFichaCadastro.conjuge || '-'}}        
            
            .row
              .col-xs-12.form-group
                p Observações
                | {{fichaCadastro.proprietarioFichaCadastro.obervacoes || '-'}}

            .page-break
              div(
                v-if="fichaCadastro.fotoImovelFichaCadastros.length > 0"
              ) 
                .page-header
                  h6.title Fotos do Imóvel

                .row 
                  .col-xs-4(
                    v-for="foto in fichaCadastro.fotoImovelFichaCadastros"
                  )
                    img.img-responsive.img-rounded(
                      :src="`${apiUrl}${foto.arquivo}`"
                    )

              div(
                v-if="fichaCadastro.fotoDocumentoFichaCadastros.length > 0"
              ) 
                .page-header
                  h6.title Fotos dos Documentos

                .row 
                  .col-xs-4(
                    v-for="foto in fichaCadastro.fotoDocumentoFichaCadastros"
                  )
                    img.img-responsive.img-rounded(
                      :src="`${apiUrl}${foto.arquivo}`"
                    )

          h4.title(
            v-else
          ) Ficha não localizada
</template>
<script>
import PropriedadeService from "src/domain/propriedade/PropriedadeService";
import moment from "moment";

export default {
  $validates: true,
  data() {
    return {};
  },
  computed: {
    localizacao() {
      let localizacao;

      if(this.fichaCadastro) {
        if(this.fichaCadastro.imovelFichaCadastro.latitude && this.fichaCadastro.imovelFichaCadastro.longitude) {
          localizacao = `${this.fichaCadastro.imovelFichaCadastro.latitude}, ${this.fichaCadastro.imovelFichaCadastro.longitude}`;
        }
      }

      return localizacao;
    },
    apiUrl() {
      return process.env.API_URL;
    }
  },
  asyncComputed: {
    fichaCadastro() {
      let app = this;
      this.service = new PropriedadeService(this.$http);
      return this.service.get(this.$route.params.id);
    }
  }
};
</script>

<style scoped>
div.form-group {
  margin-bottom: 15px;
  font-weight: 300;
}

div.form-group > p {
  font-weight: 600;
  font-size: 12px;
  margin-bottom: 5px;
}

@media print {
  div.form-group {
    font-size: 14px;
  }

  div.form-group > p {
    font-size: 9px;
  }

  .page-header {
    margin: 15px 0 10px;
  }

  .page-break {
    page-break-before: always;
  }
}
</style>

