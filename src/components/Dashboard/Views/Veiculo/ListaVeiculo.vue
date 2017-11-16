<template lang="pug">
  lista-dropdown(
    :table-columns='tableColumns',
    :table-data='tableData',
    :route='route'
    :dropdown-links='dropdownLinks',
    @deleteItem='deleteItem($event)'
  )
</template>
<script>
  import ListaDropdown from 'src/components/GeneralViews/ListaDropdown.vue'
  import VeiculoService from 'src/domain/veiculo/VeiculoService'
  import swal from 'sweetalert2'
  
  export default {
    components: {
      'lista-dropdown': ListaDropdown
    },
    asyncComputed: {
      tableData() {
        this.service = new VeiculoService(this.$resource);
        return this.service.get(veiculos => veiculos);
      }
    },
    data () {
      return {
        route: "veiculo",
        tableColumns: [
          {
            prop: 'id',
            label: '#',
            class: '',
            minWidth: '30'
          },
          {
            prop: 'nome',
            label: 'Nome',
            class: ''
          },
          {
            prop: 'ano',
            label: 'Ano',
            class: ''
          },
          {
            prop: 'placa',
            label: 'Placa',
            class: ''
          }
        ],
        dropdownLinks: [
          {
            label: 'Cadastrar Seguros',
            route: 'seguroVeiculo'
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
          app.service = new VeiculoService(app.$resource);
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
