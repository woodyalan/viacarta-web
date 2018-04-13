<template lang="pug">
.card
  .card-header
    h4.card-title Despesas
    p.category Despesas em Projetos 
  .card-content(
    v-if='despesasProjetos && despesasProjetos.length > 0'
  )
    table.table
      tbody
        tr(
          v-for='despesa in despesasProjetos'
        )
          td {{ despesa.nome }}
          td.text-right.col-xs-4 R$ {{ despesa.despesas }} 
      tfoot
        tr.active
          th.text-right 
              th.text-right R$ {{ despesaTotal.toFixed(2) }}
  .card-content(
    v-else
  )
    card-message(
      message='Nenhuma despesa para exibir'
    )
</template>
<script>
import DashboardService from 'src/domain/dashboard/DashboardService';
import CardMessage from 'src/components/UIComponents/Messages/CardMessage.vue';

export default {
  components: {
    'card-message': CardMessage
  },
  asyncComputed: {
    despesasProjetos() {
      this.service = new DashboardService(this.$http);
      return this.service
        .getDespesasProjetos(despesasProjetos => despesasProjetos);
    }
  },
  computed: {
    despesaTotal() {
      let total = 0;

      this.despesasProjetos.forEach(despesa => {
        total += parseFloat(despesa.despesas);
      });

      return total;
    }
  }
}
</script>
