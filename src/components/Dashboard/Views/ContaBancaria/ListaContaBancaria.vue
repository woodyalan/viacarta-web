<template lang="pug">
  lista(
    :param-value='param',
    :table-columns='tableColumns',
    :table-data='tableData',
    :route='route'
    navigation-back='funcionario',
    @deleteItem='deleteItem($event)'
  )
</template>
<script>
  import Lista from 'src/components/GeneralViews/Lista.vue'
  import ContaBancariaService from 'src/domain/contaBancaria/ContaBancariaService'
  import swal from 'sweetalert2'
  
  export default {
    components: {
      'lista': Lista
    },
    asyncComputed: {
      tableData() {
        this.service = new ContaBancariaService(this.$http);
        return this.service
          .getContasBancariasPessoa(this.$route.params.pessoaId)
          .then(contasBancarias => contasBancarias);
      }
    },
    data () {
      return {
        route: "contaBancaria",
        param: this.$route.params.pessoaId,
        tableColumns: [
          {
            prop: 'id',
            label: '#',
            class: '',
            minWidth: '30'
          },
          {
            prop: 'bancoObject.nome',
            label: 'Banco',
            class: ''
          },
          {
            prop: 'pessoaObject.nome',
            label: 'Titular',
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
          app.service = new ContaBancariaService(app.$http);
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
