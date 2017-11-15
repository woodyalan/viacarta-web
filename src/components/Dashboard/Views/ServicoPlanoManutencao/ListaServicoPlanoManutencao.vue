<template lang="pug">
  lista(
    :title='title',
    :description='description',
    :table-columns='tableColumns',
    :table-data='tableData',
    table-key='servicoManutencao',
    :route='route',
    navigation-back='cadastros/planoManutencao',
    @deleteItem='deleteItem($event)'
  )
</template>
<script>
  import Lista from 'src/components/GeneralViews/Lista.vue'
  import ServicoPlanoManutencaoService from 'src/domain/servicoPlanoManutencao/ServicoPlanoManutencaoService'
  import swal from 'sweetalert2'
  
  export default {
    components: {
      'lista': Lista
    },
    asyncComputed: {
      tableData() {
        this.service = new ServicoPlanoManutencaoService(this.$http);
        return this.service.getTelas(this.$route.params.planoManutencaoId)
          .then(servicosPlanoManutencao => servicosPlanoManutencao);
      }
    },
    data () {
      return {
        title: 'Cadastro de Servicos do Plano de Manutenção',
        description: "Serviços Cadastrados",
        route: `/cadastros/servicoPlanoManutencao/${this.$route.params.planoManutencaoId}`,
        tableColumns: [
          {
            prop: 'servicoObject.nome',
            label: 'Serviço',
            class: ''
          },
          {
            prop: 'planoManutencaoObject.nome',
            label: 'Plano Manutenção',
            class: ''
          }
        ]
      }
    },
    methods: {
      deleteItem(item) {
        let app = this;

        swal({
          title: 'Atenção!',
          html: `Confirma a remoção do registro?`,
          type: 'question',
          buttonsStyling: false,
          showCancelButton: true,
          confirmButtonClass: 'btn btn-success btn-fill',
          cancelButtonClass: 'btn btn-danger btn-fill',
          allowOutsideClick: false
        }).then(function() {
          app.service = new ServicoPlanoManutencaoService(app.$http);
          app.service
            .delete(item.object.planoManutencao, item.object.servicoManutencao)
            .then(result => {
              if(result.success) {
                app.tableData.splice(item.index);
              }
            }).catch(e => {
                swal({
                  title: 'Ops!',
                  html: `Falha ao remover o registro.`,
                  buttonsStyling: false,
                  type: 'error',
                  confirmButtonClass: 'btn btn-success btn-fill',
                  allowOutsideClick: false
                });
            })  
        });
      }
    }
  }
</script>
