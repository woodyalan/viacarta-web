<template lang="pug">
.card
  .card-header
    h4.card-title Saldos
    p.category Saldo dos Funcionários 
  .card-content(
    v-if='saldosFuncionarios && saldosFuncionarios.length > 0'
  )
    table.table
      tbody
        tr(
          v-for='saldo in saldosFuncionarios'
        )
          td {{ saldo.nome }}
          td.text-right.col-xs-4 R$ {{ saldo.saldo }} 
      tfoot
        tr.active
          th.text-right 
              th.text-right R$ {{ saldoTotal.toFixed(2) }}
  .card-content(
    v-else
  )
    card-message(
      message='Nenhum saldo para exibir'
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
    saldosFuncionarios() {
      this.service = new DashboardService(this.$http);
      return this.service
        .getSaldosFuncionarios(saldosFuncionarios => saldosFuncionarios);
    }
  },
  computed: {
    saldoTotal() {
      let total = 0;

      this.saldosFuncionarios.forEach(saldo => {
        total += parseFloat(saldo.saldo);
      });

      return total
    }
  }
}
</script>
