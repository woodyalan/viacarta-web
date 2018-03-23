<template lang="pug">
.row
  .col-sm-6.col-lg-4
    saldos-funcionarios

  .col-sm-6.col-lg-4
    despesas-projetos

</template>
<script>
import SaldosFuncionarios from 'src/components/Dashboard/Views/Dashboard/SaldosFuncionarios.vue';
import DespesasProjetos from 'src/components/Dashboard/Views/Dashboard/DespesasProjetos.vue';

export default {
  components: {
    'saldos-funcionarios': SaldosFuncionarios,
    'despesas-projetos': DespesasProjetos
  }
};
</script>
