<template lang="pug">
  .row
    .col-md-12
      .card
        .card-header
          h4.title
            | {{ title }}
            router-link.pull-right(:to='route')
              a.btn.btn-default.btn-icon(href='#')
                i.ti-view-list-alt
        
          p.category Dados Cadastrais
        form(@submit.prevent='', autocomplete='off', novalidate='')
          .card-content
            slot(name='fields')
          .card-footer
            .row
              .col-xs-6
                router-link(:to='route')
                  a.btn.btn-default(href='#')
                    i.ti-view-list-alt
                    |  Listagem
              .col-xs-6.text-right
                slot(name='actions')
</template>
<script>
  export default {
    props: {
      title: {
        type: String,
        required: true
      },
      route: {
        type: String,
        required: true
      }
    },
    methods: {
      salvar() {

      }
    }
  }
</script>