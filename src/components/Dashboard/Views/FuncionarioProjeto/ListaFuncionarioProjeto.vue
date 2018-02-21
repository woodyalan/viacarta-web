<template lang="pug">
  lista(
    :param-value='param',
    :table-columns='tableColumns',
    :table-data='tableData',
    table-key='funcionario',
    :route='route',
    navigation-back='projeto',
    @deleteItem='deleteItem($event)'
  )
</template>
<script>
  import Lista from 'src/components/GeneralViews/Lista.vue'
  import FuncionarioProjetoService from 'src/domain/funcionarioProjeto/FuncionarioProjetoService'
  import swal from 'sweetalert2'
  
  export default {
    components: {
      'lista': Lista
    },
    asyncComputed: {
      tableData() {
        this.service = new FuncionarioProjetoService(this.$http);
        return this.service
          .getFuncionarios(this.$route.params.projetoId)
          .then(funcionarios => funcionarios);
      }
    },
    data () {
      return {
        route: "funcionarioProjeto",
        param: this.$route.params.projetoId,
        tableColumns: [
          {
            prop: 'projetoObject.nome',
            label: 'Projeto',
            class: ''
          },
          {
            prop: 'pessoaObject.nome',
            label: 'Funcionário',
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
          app.service = new FuncionarioProjetoService(app.$http);
          app.service
            .delete(item.object.projeto, item.object.funcionario)
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
