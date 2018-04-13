<template lang="pug">
.card
  .card-header
    h4.card-title Manutenções
    p.category Manutenções Pendentes
  .card-content(
    v-if='manutencoesVeiculos && manutencoesVeiculos.length > 0'
  )
    el-collapse
      el-collapse-item(
        v-for="manutencaoVeiculo in manutencoesVeiculos"
        :title="manutencaoVeiculo.veiculo.nome"
        :name="manutencaoVeiculo.veiculo.id"
      )
        div
          div.mb10
            strong KM Atual: 
            | {{ manutencaoVeiculo.veiculo.odometro }}

          table.table
            tbody
              tr(
                v-for="servico in manutencaoVeiculo.servicos"
              )  
                td {{ servico.servico }}
                td.text-center {{ servico.proximoOdometro }}
                td.text-center {{ moment(servico.proximaData, 'YYYY-MM-DD').format('DD/MM/YYYY') }}
  .card-content(
    v-else
  )
    card-message(
      message='Tudo em dia!'
    )
</template>
<script>
import Vue from 'vue'
import DashboardService from 'src/domain/dashboard/DashboardService';
import CardMessage from 'src/components/UIComponents/Messages/CardMessage.vue';
import {Collapse, CollapseItem} from 'element-ui'
import moment from 'moment'
  
Vue.use(Collapse)
Vue.use(CollapseItem)  

export default {
  components: {
    'card-message': CardMessage
  },
  asyncComputed: {
    manutencoesVeiculos() {
      this.service = new DashboardService(this.$http);
      return this.service
        .getManutencoesVeiculos(manutencoesVeiculos => manutencoesVeiculos);
    }
  },
  computed: {
    manutencaoTotal() {
      let total = 0;

      this.manutencoesVeiculos.forEach(manutencaoVeiculo => {
        total += manutencaoVeiculo.servicos.length;
      });

      return total;
    }
  }
}
</script>
