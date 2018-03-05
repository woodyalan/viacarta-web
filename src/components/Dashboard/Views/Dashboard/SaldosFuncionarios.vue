<template lang="pug">
.card(
  v-if='saldosFuncionarios'
)
  .card-header
    h4.card-title Saldos
    p.category Saldo dos Funcionários 
  .card-content
    table.table
      tbody
        tr(
          v-for='saldo in saldosFuncionarios'
        )
          td {{ saldo.nome }}
          td.text-right R$ {{ saldo.saldo }} 
      tfoot
        tr.active
          th.text-right 
              th.text-right R$ {{ saldoTotal.toFixed(2) }}
</template>
<script>
import DashboardService from 'src/domain/dashboard/DashboardService';

export default {
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
