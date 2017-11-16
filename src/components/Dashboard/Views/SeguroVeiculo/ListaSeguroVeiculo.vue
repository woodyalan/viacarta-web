<template lang="pug">
  lista(
    :param-value='param',
    :table-columns='tableColumns',
    :table-data='tableData',
    :route='route'
    navigation-back='veiculo',
    @deleteItem='deleteItem($event)'
  )
</template>
<script>
  import Lista from 'src/components/GeneralViews/Lista.vue'
  import SeguroVeiculoService from 'src/domain/seguroVeiculo/SeguroVeiculoService'
  import swal from 'sweetalert2'
  
  export default {
    components: {
      'lista': Lista
    },
    asyncComputed: {
      tableData() {
        this.service = new SeguroVeiculoService(this.$resource);
        return this.service.get(servicos => servicos);
      }
    },
    data () {
      return {
        route: "seguroVeiculo",
        param: this.$route.params.veiculoId,
        tableColumns: [
          {
            prop: 'id',
            label: '#',
            class: '',
            minWidth: '30'
          },
          {
            prop: 'seguradoraObject.nome',
            label: 'Seguradora',
            class: ''
          },
          {
            prop: 'veiculoObject.nome',
            label: 'Veículo',
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
          app.service = new SeguroVeiculoService(app.$resource);
          app.service
            .delete(item.object.id)
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
