<template lang="pug">
  lista(
    :table-columns='tableColumns',
    :table-data='tableData',
    :route='route'
    @deleteItem='deleteItem($event)'
  )
</template>
<script>
  import Lista from 'src/components/GeneralViews/Lista.vue'
  import ViagemService from 'src/domain/viagem/ViagemService'
  import swal from 'sweetalert2'
  
  export default {
    components: {
      'lista': Lista
    },
    asyncComputed: {
      tableData() {
        this.service = new ViagemService(this.$resource);
        return this.service.get(viagens => viagens);
      }
    },
    data () {
      return {
        route: "viagem",
        tableColumns: [
          {
            prop: 'id',
            label: '#',
            class: '',
            minWidth: '20'
          },
          {
            prop: 'veiculoObject.nome',
            label: 'Veículo',
            class: ''
          },
          {
            prop: 'veiculoObject.placa',
            label: 'Placa',
            class: ''
          },
          {
            prop: 'pessoaObject.nome',
            label: 'Fornecedor',
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
          app.service = new ViagemService(app.$resource);
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
