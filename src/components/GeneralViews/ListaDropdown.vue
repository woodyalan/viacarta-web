<template lang="pug">
  .row
    .col-xs-12
      .card(v-if="telaInfo")
        .card-header
          h4.title
            | {{ telaInfo.title }}
            router-link.pull-right(:to='`${telaInfo.rota}/new`')
              a.btn.btn-icon.btn-default(href='#')
                i.ti-plus
        .card-content
          .row
            .col-xs-6.col-md-2
              el-select.select-default(v-model='pagination.perPage', placeholder='Registros por página')
                el-option.select-default(v-for='item in pagination.perPageOptions', :key='item', :label='item', :value='item')
            .col-xs-6.col-md-3.col-md-offset-7
              .pull-right
                label
                  input.form-control.input-sm(type='search', placeholder='Busca', v-model='searchQuery', aria-controls='datatables')
          .row
            .col-xs-12
              .table-responsive
                el-table.table.table-striped.table-no-bordered.table-hover(
                  :data='queriedData', 
                  border='', 
                  style='width: 100%'
                )
                  el-table-column(v-for='column in tableColumns', :class-name='column.class', :prop='column.prop', :label='column.label', sortable='', :min-width='column.minWidth')
                  el-table-column(width='150' class-name='text-center', fixed='right')
                    template(scope='props')
                      el-dropdown(@command='handleAction')
                        el-button.btn.btn-primary.btn-sm.btn-fill 
                          | Ações 
                          span.caret
                        el-dropdown-menu(slot="dropdown")
                          el-dropdown-item(v-for='item in dropdownLinks')
                            router-link(:to='`/${telaInfo.menuPath}/${item.route}/${props.row.id}/`')
                              | {{ item.label }}
                          el-dropdown-item(:divided="true")
                          el-dropdown-item.text-info(:command='{ action: "edit", url: `${telaInfo.rota}/edit/${props.row.id}` }')
                            i.ti-pencil-alt 
                            |   Editar
                          el-dropdown-item.text-danger(:command='{ action: "delete", index: props.$index, object: props.row }')
                            i.ti-trash 
                            |   Excluir
          .row
            .col-sm-6.pagination-info
              p.category Exibindo de {{from + 1}} a {{to}} em {{total}} registro(s)
            .col-sm-6
              p-pagination.pull-right(v-model='pagination.currentPage', :per-page='pagination.perPage', :total='pagination.total')
        .card-footer
          hr
          .row
            .col-sm-6
              router-link(:to='`${telaInfo.rota}/new`')
                a.btn.btn-default(href='#')
                  i.ti-plus
                  |  Novo
</template>
<script>
  import Vue from 'vue'
  import {Table, TableColumn, Select, Option, Button, Dropdown, DropdownMenu, DropdownItem } from 'element-ui'
  import PPagination from 'src/components/UIComponents/Pagination.vue'
  import LoginService from 'src/domain/login/LoginService'

  Vue.use(Table)
  Vue.use(TableColumn)
  Vue.use(Select)
  Vue.use(Option)
  Vue.use(Button)
  Vue.use(Dropdown)
  Vue.use(DropdownMenu)
  Vue.use(DropdownItem)

  export default {
    props: {
      route: {
        type: String,
        required: true
      },
      tableColumns: {
        type: Array,
        required: true
      },
      tableData: {
        type: Array
      },
      dropdownLinks: {
        type: Array,
        required: true
      }
    },
    components: {
      PPagination
    },
    computed: {
      pagedData () {
        return this.tableData.slice(this.from, this.to)
      },
      queriedData () {
        if(this.tableData) {
          if (!this.searchQuery) {
            this.pagination.total = this.tableData.length
            return this.pagedData
          }
          let result = this.tableData
            .filter((row) => {
              let isIncluded = false
              for (let key of this.propsToSearch) {
                let rowValue = row[key].toString()
                if (rowValue.includes && rowValue.includes(this.searchQuery)) {
                  isIncluded = true
                }
              }
              return isIncluded
            })
          this.pagination.total = result.length
          return result.slice(this.from, this.to)
        }
      },
      to () {
        let highBound = this.from + this.pagination.perPage
        if (this.total < highBound) {
          highBound = this.total
        }
        return highBound
      },
      from () {
        return this.pagination.perPage * (this.pagination.currentPage - 1)
      },
      total () {
        if(this.tableData) {
          this.pagination.total = this.tableData.length
          return this.tableData.length  
        }
      },
      propsToSearch() {
        return this.tableColumns.map(tc => {
          return tc.prop
        })
      }
    },
    asyncComputed: {
      telaInfo() {
        this.service = new LoginService(this.$http);
        return this.service
          .getTelaInfo(this.route)
          .then(telaInfo => {
            return {
              title: telaInfo.descricao,
              menuPath: telaInfo.menuObject.path,
              rota: `/${telaInfo.menuObject.path}/${telaInfo.rota}`  
            }
          });
      }
    },
    data () {
      return {
        pagination: {
          perPage: 25,
          currentPage: 1,
          perPageOptions: [10, 25, 50],
          total: 0
        },
        searchQuery: ''
      }
    },
    methods: {
      handleAction(command) {
        if(command.action == 'edit') {
          this.$router.push(command.url);
        }

        if(command.action == 'delete') {
          this.handleDelete(command);
        }
      },
      handleDelete(command) {
        this.$emit('deleteItem', command);
      },
      removeItem(index) {
        this.tableData.splice(index)
      }
    }
  }
</script>