<template lang="pug">
  lista-dropdown(
    :table-columns='tableColumns',
    :table-data='tableData',
    :route='route'
    :dropdown-links='dropdownLinks'
    @deleteItem='deleteItem($event)'
  )
</template>
<script>
  import ListaDropdown from 'src/components/GeneralViews/ListaDropdown.vue'
  import FuncionarioService from 'src/domain/funcionario/FuncionarioService'
  import swal from 'sweetalert2'
  
  export default {
    components: {
      'lista-dropdown': ListaDropdown
    },
    asyncComputed: {
      tableData() {
        this.service = new FuncionarioService(this.$resource);
        return this.service.get(funcionarios => funcionarios);
      }
    },
    data () {
      return {
        route: "funcionario",
        tableColumns: [
          {
            prop: 'id',
            label: '#',
            class: '',
            minWidth: '20'
          },
          {
            prop: 'pessoaFisicaObject.pessoaObject.nome',
            label: 'Nome',
            class: ''
          },
          {
            prop: 'cargoObject.nome',
            label: 'Cargo',
            class: ''
          }
        ],
        dropdownLinks: [
          {
            label: 'Cadastrar Contas Bancárias',
            route: 'contaBancaria'
          },
          {
            label: 'Cadastrar Contatos',
            route: 'contato',
            navigationBack: 'funcionario'
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
          app.service = new FuncionarioService(app.$resource);
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
