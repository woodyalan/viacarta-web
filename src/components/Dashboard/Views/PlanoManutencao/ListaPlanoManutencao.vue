<template lang="pug">
  lista-dropdown(
    :title='title',
    :description='description',
    :table-columns='tableColumns',
    :table-data='tableData',
    :route='route'
    :dropdown-links='dropdownLinks'
    @deleteItem='deleteItem($event)'
  )
</template>
<script>
  import ListaDropdown from 'src/components/GeneralViews/ListaDropdown.vue'
  import PlanoManutencaoService from 'src/domain/planoManutencao/PlanoManutencaoService'
  import swal from 'sweetalert2'
  
  export default {
    components: {
      'lista-dropdown': ListaDropdown
    },
    asyncComputed: {
      tableData() {
        this.service = new PlanoManutencaoService(this.$resource);
        return this.service.get(planosManutencao => planosManutencao);
      }
    },
    data () {
      return {
        title: 'Cadastro de Planos de Manutenção',
        description: "Planos de Manutenção Cadastrados",
        route: "/cadastros/planoManutencao",
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
          }
        ],
        dropdownLinks: [
          {
            label: 'Cadastrar Serviços',
            route: 'servicoPlanoManutencao'
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
          app.service = new PlanoManutencaoService(app.$resource);
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
