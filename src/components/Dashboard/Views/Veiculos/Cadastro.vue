<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <form @submit.prevent="salvar()">
          <div class="card-header">
            <h4 class="title">
              {{ title }}
              <router-link class="pull-right" to="/cadastros/veiculos">
                <a href="#" class="btn btn-default btn-icon"><i class="ti-view-list-alt"></i></a>
              </router-link>
            </h4>
            <p class="category">{{ description }}</p>
          </div>
          <div class="card-content">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>Nome</label>
                  <input type="text" name="nome" placeholder="Nome do Veículo" class="form-control">
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label>Ano</label>
                  <input type="number" name="ano" placeholder="Ano do Veículo" class="form-control" step="1" min="1">
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label>Placa</label>
                  <input type="text" name="placa" placeholder="Placa do Veículo" class="form-control">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3">
                <div class="form-group">
                  <label>Odômetro</label>
                  <input type="number" name="odometro" placeholder="Odômetro do Veículo" class="form-control">
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label>Tipo do Veículo</label>
                  <select name="tipoVeiculo" class="form-control">
                    <option value="">Selecione</option>
                  </select>
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label>Plano de Manutenção</label>
                  <select name="planoManutencao" class="form-control">
                    <option value="">Selecione</option>
                  </select>
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label>Ativo</label>
                  <div class="clearfix"></div>
                  <p-switch v-model="veiculo.ativo">
                    <i class="fa fa-check" slot="on"></i>
                    <i class="fa fa-times" slot="off"></i>
                  </p-switch>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <hr>
            <div class="row">
              <div class="col-xs-6">
                <router-link to="/cadastros/veiculos">
                  <a href="#" class="btn btn-default"><i class="ti-view-list-alt"></i> Listagem</a>
                </router-link>
              </div>
              <div class="col-xs-6 text-right">
                  <button type="submit" class="btn btn-fill btn-info">Salvar</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
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
