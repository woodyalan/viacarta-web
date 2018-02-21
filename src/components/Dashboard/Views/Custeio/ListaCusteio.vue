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
  import CusteioService from 'src/domain/custeio/CusteioService'
  import swal from 'sweetalert2'
  
  export default {
    components: {
      'lista': Lista
    },
    asyncComputed: {
      tableData() {
        this.service = new CusteioService(this.$resource);
        return this.service.get(custeios => custeios);
      }
    },
    data () {
      return {
        route: "custeio",
        tableColumns: [
          {
            prop: 'id',
            label: '#',
            class: '',
            minWidth: '20'
          },
          {
            prop: 'pessoaObject.nome',
            label: 'Funcionário',
            class: ''
          },
          {
            prop: 'descricao',
            label: 'Descrição',
            class: ''
          },
          {
            prop: 'valor',
            label: 'Valor',
            class: '',
            formatter: 'formatMoney'
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
          app.service = new CusteioService(app.$resource);
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
