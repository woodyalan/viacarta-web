<template lang="pug">
.row(
  v-if="widgets"
)
  .col-sm-6(
    v-for="row in widgets"
  )
    .row(
      v-for="widget in row"
    )
      .col-xs-12
        <component :is="widget.widgetObject.nome"></component>

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
  data () {
    return {
      widgets: null
    }
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
        .getUserInfo(this.$store.state.user.email)
        .then(response => {
          let results = [];
          const widgets = response.result.widgets;

          while (widgets.length) {
            results.push(widgets.splice(0, 2));
          }

          this.widgets = results;
        })
    } else {
      this.$router.push('/login');
    }
  }
};
</script>
