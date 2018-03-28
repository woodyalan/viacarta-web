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
  import ProjetoService from 'src/domain/projeto/ProjetoService'
  import swal from 'sweetalert2'
  
  export default {
    components: {
      'lista-dropdown': ListaDropdown
    },
    asyncComputed: {
      tableData() {
        this.service = new ProjetoService(this.$resource);
        return this.service.get(projetos => projetos);
      }
    },
    data () {
      return {
        route: "projeto",
        tableColumns: [
          {
            prop: 'id',
            label: '#',
            class: '',
            minWidth: '20'
          },
          {
            prop: 'nome',
            label: 'Nome',
            class: ''
          },
          {
            prop: 'pessoaObject.nome',
            label: 'Cliente',
            class: ''
          }
        ],
        dropdownLinks: [
          {
            label: 'Cadastrar Funcionários',
            route: 'funcionarioProjeto'
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
          app.service = new ProjetoService(app.$resource);
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
                  confirmButtonClass: 'btn btn-danger btn-fill',
                  allowOutsideClick: false
                });
            })  
        });
      }
    }
  }
</script>
