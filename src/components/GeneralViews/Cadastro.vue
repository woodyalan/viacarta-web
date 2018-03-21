<template lang="pug">
  .row
    .col-md-12
      .card(
        v-if='telaInfo'
      )
        .card-header
          h4.title
            | {{ telaInfo.title }}
            router-link.pull-right(:to='rota')
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
                router-link(:to='rota')
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
      },
      rota() {
        let param = this.paramValue ? `/${this.paramValue}` : '';
        return this.$route.params.backRoute ? `/${this.telaInfo.menuPath}/${this.$route.params.backRoute}/${this.telaInfo.tela}${param}` : this.telaInfo.rota;
      }
    },
    watch: {
      backToList(value) {
        if(value)
          this.$router.push(this.rota);
      }
    },
    asyncComputed: {
      telaInfo() {
        let app = this;
        this.service = new LoginService(this.$http);
        return this.service
          .getTelaInfo(this.route)
          .then(telaInfo => {
            let param = this.paramValue ? `/${this.paramValue}` : '';
            
            let result = {
              title: telaInfo.descricao,
              menuPath: telaInfo.menuObject.path,
              tela: telaInfo.rota,
              rota: `/${telaInfo.menuObject.path}/${telaInfo.rota}${param}`  
            }
            
            app.$store.dispatch('setLastRoute', result);

            return result;
          });
      }
    },
    mounted() {
      this.$store.dispatch('setBackToList', false);
    }
  }
</script>