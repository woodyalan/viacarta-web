<template lang="pug">
  lista(
    :param-value='param',
    :table-columns='tableColumns',
    :table-data='tableData',
    :route='route'
    navigation-back='cliente',
    @deleteItem='deleteItem($event)'
  )
</template>
<script>
  import Lista from 'src/components/GeneralViews/Lista.vue'
  import ContatoService from 'src/domain/contato/ContatoService'
  import swal from 'sweetalert2'
  
  export default {
    components: {
      'lista': Lista
    },
    asyncComputed: {
      tableData() {
        this.service = new ContatoService(this.$http);
        return this.service
          .getContatosPessoa(this.$route.params.pessoaId)
          .then(contatos => contatos);
      }
    },
    data () {
      return {
        route: "contato",
        param: this.$route.params.pessoaId,
        tableColumns: [
          {
            prop: 'id',
            label: '#',
            class: '',
            minWidth: '30'
          },
          {
            prop: 'pessoaObject.nome',
            label: 'Pessoa',
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
          app.service = new ContatoService(app.$http);
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
