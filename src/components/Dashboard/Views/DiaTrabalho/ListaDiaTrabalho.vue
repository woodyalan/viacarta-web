<template lang="pug">
  lista(
    :param-value='param',
    :table-columns='tableColumns',
    :table-data='tableData',
    :route='route',
    navigation-back='planoTrabalho',
    @deleteItem='deleteItem($event)'
  )
</template>
<script>
  import Lista from 'src/components/GeneralViews/Lista.vue'
  import DiaTrabalhoService from 'src/domain/diaTrabalho/DiaTrabalhoService'
  import swal from 'sweetalert2'
  
  export default {
    components: {
      'lista': Lista
    },
    asyncComputed: {
      tableData() {
        this.service = new DiaTrabalhoService(this.$http);
        return this.service
          .getDiasTrabalhoPlano(this.$route.params.planoTrabalhoId)
          .then(diasTrabalho => diasTrabalho);
      }
    },
    data () {
      return {
        route: "diaTrabalho",
        param: this.$route.params.planoTrabalhoId,
        tableColumns: [
          {
            prop: 'id',
            label: '#',
            class: '',
            minWidth: '20'
          },
          {
            prop: 'planoTrabalhoObject.nome',
            label: 'Plano de Trabalho',
            class: ''
          },
          {
            prop: 'diaSemana',
            label: 'Dia da Semana',
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
          app.service = new DiaTrabalhoService(app.$http);
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
