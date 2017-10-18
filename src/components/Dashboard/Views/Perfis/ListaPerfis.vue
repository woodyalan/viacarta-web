<template lang="pug">
  lista(
    :title='title',
    :description='description',
    :table-columns='tableColumns',
    :table-data='tableData',
    :route='route'
    @deleteItem='deleteItem($event)'
  )
</template>
<script>
  import Lista from 'src/components/GeneralViews/Lista.vue'
  import PerfilService from 'src/domain/perfil/PerfilService'
  import swal from 'sweetalert2'
  
  export default {
    components: {
      'lista': Lista
    },
    asyncComputed: {
      tableData() {
        this.service = new PerfilService(this.$resource);
        return this.service.get(perfis => perfis);
      }
    },
    data () {
      return {
        title: 'Cadastro de Perfis',
        description: "Perfis Cadastrados",
        route: "/cadastros/perfis",
        tableColumns: [
          {
            prop: 'id',
            label: '#',
            class: ''
          },
          {
            prop: 'nome',
            label: 'Nome',
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
          app.service = new PerfilService(app.$resource);
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
