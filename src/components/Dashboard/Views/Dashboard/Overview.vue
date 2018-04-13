<template lang="pug">
.row
  .col-sm-6
    .row
      .col-xs-12
        saldos-funcionarios

    .row
      .col-xs-12
        despesas-projetos

  .col-sm-6
    .row
      .col-xs-12
        manutencoes-veiculos

    .row
      .col-xs-12
        calendario

</template>
<script>
import SaldosFuncionarios from 'src/components/Dashboard/Views/Dashboard/SaldosFuncionarios.vue';
import DespesasProjetos from 'src/components/Dashboard/Views/Dashboard/DespesasProjetos.vue';
import ManutencoesVeiculos from 'src/components/Dashboard/Views/Dashboard/ManutencoesVeiculos.vue';
import Calendario from 'src/components/Dashboard/Views/Dashboard/Calendario.vue';

export default {
  components: {
    'saldos-funcionarios': SaldosFuncionarios,
    'despesas-projetos': DespesasProjetos,
    'manutencoes-veiculos': ManutencoesVeiculos,
    'calendario': Calendario
  }
};
</script>
