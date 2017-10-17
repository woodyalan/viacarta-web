<template lang="pug">
  lista(
    :title='title',
    :description='description',
    :table-columns='tableColumns',
    :table-data='tableData',
    :route='route'
  )
</template>
<script>
  import Lista from 'src/components/GeneralViews/Lista.vue'
  import MenuService from 'src/domain/menu/MenuService'
  
  export default {
    components: {
      'lista': Lista
    },
    asyncComputed: {
      tableData() {
        this.service = new MenuService(this.$resource);
        return this.service.get(menus => menus);
      }
    },
    data () {
      return {
        title: 'Cadastro de Menus',
        description: "Menus Cadastrados",
        route: "/cadastros/menus",
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
    }
  }
</script>
