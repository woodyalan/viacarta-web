<template lang="pug">
  lista(
    :title='title',
    :description='description',
    :table-columns='tableColumns',
    :table-data='tableData',
    table-key='tela',
    :route='route',
    navigation-back='cadastros/perfis',
    @deleteItem='deleteItem($event)'
  )
</template>
<script>
  import Lista from 'src/components/GeneralViews/Lista.vue'
  import TelaPerfilService from 'src/domain/telaPerfil/TelaPerfilService'
  import swal from 'sweetalert2'
  
  export default {
    components: {
      'lista': Lista
    },
    asyncComputed: {
      tableData() {
        this.service = new TelaPerfilService(this.$http);
        return this.service.getTelas(this.$route.params.perfilId)
          .then(telasPerfil => telasPerfil);
      }
    },
    data () {
      return {
        title: 'Cadastro de Telas do Perfil',
        description: "Telas Cadastradas",
        route: `/cadastros/telaPerfil/${this.$route.params.perfilId}`,
        tableColumns: [
          {
            prop: 'telaObject.descricao',
            label: 'Tela',
            class: ''
          },
          {
            prop: 'perfilObject.nome',
            label: 'Perfil',
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
          app.service = new TelaPerfilService(app.$http);
          app.service
            .delete(item.object.perfil, item.object.tela)
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
