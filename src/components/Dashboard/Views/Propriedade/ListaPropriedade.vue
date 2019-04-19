<template lang="pug">
  lista(
    :table-columns='tableColumns',
    :table-data='tableData',
    :route='route'
    @deleteItem='deleteItem($event)'
  )
</template>
<script>
import Lista from "src/components/GeneralViews/Lista.vue";
import PropriedadeService from "src/domain/propriedade/PropriedadeService";
import swal from "sweetalert2";

export default {
  components: {
    lista: Lista
  },
  asyncComputed: {
    tableData() {
      this.service = new PropriedadeService(this.$http);
      return this.service.get().then(propriedades => propriedades);
    }
  },
  data() {
    return {
      route: "propriedade",
      tableColumns: [
        {
          prop: "id",
          label: "#",
          class: "",
          minWidth: "20"
        },
        {
          prop: "instalacao",
          label: "Instalação",
          class: ""
        },
        {
          prop: "imovelFichaCadastro.endereco",
          label: "Endereço",
          class: ""
        },
        {
          prop: "imovelFichaCadastro.numero",
          label: "Número",
          class: ""
        }
      ]
    };
  },
  methods: {
    deleteItem(item) {
      let app = this;

      swal({
        title: "Atenção!",
        html: `Confirma a remoção do registro?`,
        type: "question",
        buttonsStyling: false,
        showCancelButton: true,
        confirmButtonClass: "btn btn-success btn-fill",
        cancelButtonClass: "btn btn-danger btn-fill",
        allowOutsideClick: false
      }).then(function() {
        app.service = new PropriedadeService(app.$http);
        app.service
          .delete(item.object.id)
          .then(result => {
            if (result.success) {
              app.tableData.splice(item.index);
            }
          })
          .catch(e => {
            swal({
              title: "Ops!",
              html: `Falha ao remover o registro.`,
              buttonsStyling: false,
              type: "error",
              confirmButtonClass: "btn btn-success btn-fill",
              allowOutsideClick: false
            });
          });
      });
    }
  }
};
</script>
