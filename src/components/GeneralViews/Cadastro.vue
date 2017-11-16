<template lang="pug">
  .row
    .col-md-12
      .card(
        v-if='telaInfo'
      )
        .card-header
          h4.title
            | {{ telaInfo.title }}
            router-link.pull-right(:to='telaInfo.rota')
              a.btn.btn-default.btn-icon(href='#')
                i.ti-view-list-alt
        
          p.category Dados Cadastrais
        form(@submit.prevent='', autocomplete='off', novalidate='')
          .card-content
            slot(name='fields')
          .card-footer
            hr
            .row
              .col-xs-6
                router-link(:to='telaInfo.rota')
                  a.btn.btn-default(href='#')
                    i.ti-view-list-alt
                    |  Listagem
              .col-xs-6.text-right
                slot(name='actions')
</template>
<script>
  import Vue from 'vue'
  import LoginService from 'src/domain/login/LoginService'

  export default {
    props: {
      route: {
        type: String,
        required: true
      },
      paramValue: {
        type: String
      }
    },
    computed: {
      backToList() {
        return this.$store.state.backToList;
      }
    },
    watch: {
      backToList(value) {
        if(value)
          this.$router.push(this.telaInfo.rota);
      }
    },
    asyncComputed: {
      telaInfo() {
        this.service = new LoginService(this.$http);
        return this.service
          .getTelaInfo(this.route)
          .then(telaInfo => {
            let param = this.paramValue ? `/${this.paramValue}` : '';
            
            return {
              title: telaInfo.descricao,
              menuPath: telaInfo.menuObject.path,
              rota: `/${telaInfo.menuObject.path}/${telaInfo.rota}${param}`  
            }
          });
      }
    },
    mounted() {
      this.$store.dispatch('setBackToList', false);
    }
  }
</script>