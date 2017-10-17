<template lang="pug">
  .row
    .col-md-12
      .card
        form(@submit.prevent='salvar()')
          .card-header
            h4.title
              | {{ title }}
              router-link.pull-right(to='/cadastros/veiculos')
                a.btn.btn-default.btn-icon(href='#')
                  i.ti-view-list-alt
            p.category {{ description }}
          .card-content
            .row
              .col-md-6
                .form-group
                  label Nome
                  input.form-control(type='text', name='nome', placeholder='Nome do Veículo')
              .col-md-3
                .form-group
                  label Ano
                  input.form-control(type='number', name='ano', placeholder='Ano do Veículo', step='1', min='1')
              .col-md-3
                .form-group
                  label Placa
                  input.form-control(type='text', name='placa', placeholder='Placa do Veículo')
            .row
              .col-md-3
                .form-group
                  label Odômetro
                  input.form-control(type='number', name='odometro', placeholder='Odômetro do Veículo')
              .col-md-3
                .form-group
                  label Tipo do Veículo
                  select.form-control(name='tipoVeiculo')
                    option(value='') Selecione
              .col-md-3
                .form-group
                  label Plano de Manutenção
                  select.form-control(name='planoManutencao')
                    option(value='') Selecione
              .col-md-3
                .form-group
                  label Ativo
                  .clearfix
                  p-switch(v-model='veiculo.ativo')
                    i.fa.fa-check(slot='on')
                    i.fa.fa-times(slot='off')
          .card-footer
            hr
            .row
              .col-xs-6
                router-link(to='/cadastros/veiculos')
                  a.btn.btn-default(href='#')
                    i.ti-view-list-alt
                    |  Listagem
              .col-xs-6.text-right
                button.btn.btn-fill.btn-info(type='submit') Salvar
</template>
<script>
  import PSwitch from 'src/components/UIComponents/Switch.vue'

  export default {
    components: {
      PSwitch
    },
    data () {
      return {
        title: 'Cadastro de Veículos',
        description: 'Dados Cadastrais',
        veiculo: {
          ativo: true
        }
      }
    },
    methods: {
      salvar() {

      }
    }
  }
</script>
<style>
</style>
