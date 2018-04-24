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
import LoginService from 'src/domain/login/LoginService.js';
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
  },
  computed: {
    token() {
      return this.$store.state.token;
    }
  },
  mounted() {
    if(this.token) {
      this._service = new LoginService(this.$http);
      this._service
        .getUserInfo(this.$store.state.user.email);
    } else {
      this.$router.push('/login');
    }
  }
};
</script>
