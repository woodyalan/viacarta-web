<template lang="pug">
  lista-dropdown(
    :table-columns='tableColumns',
    :table-data='tableData',
    :route='route',
    :dropdown-links='dropdownLinks',
    @deleteItem='deleteItem($event)'
  )
</template>
<script>
  import ListaDropdown from 'src/components/GeneralViews/ListaDropdown.vue'
  import CalendarioService from 'src/domain/calendario/CalendarioService'
  import swal from 'sweetalert2'
  
  export default {
    components: {
      'lista-dropdown': ListaDropdown
    },
    asyncComputed: {
      tableData() {
        this.service = new CalendarioService(this.$resource);
        return this.service.get(calendarios => calendarios);
      }
    },
    data () {
      return {
        route: "calendario",
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
            label: 'Cadastrar Feriados',
            route: 'feriado'
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
          app.service = new CalendarioService(app.$resource);
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
