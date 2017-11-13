<template lang="pug">
  .row
    .col-xs-12
      .card
        .card-header
          h4.title
            | {{ title }}
            router-link.pull-right(:to='`${route}/new`')
              a.btn.btn-icon.btn-default(href='#')
                i.ti-plus
          p.category {{ description }}
        .card-content
          .row
            .col-xs-6
              el-select.select-default(v-model='pagination.perPage', placeholder='Registros por página')
                el-option.select-default(v-for='item in pagination.perPageOptions', :key='item', :label='item', :value='item')
            .col-xs-6
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
                      router-link(:to='`${route}/edit/${props.row[tableKey]}`')
                        a.btn.btn-simple.btn-warning.btn-xs.btn-icon.edit
                          i.ti-pencil-alt
                      a.btn.btn-simple.btn-danger.btn-xs.btn-icon.remove(@click='handleDelete(props.$index, props.row)')
                        i.ti-close
          .row
            .col-sm-6.pagination-info
              p.category Exibindo de {{from + 1}} a {{to}} em {{total}} registro(s)
            .col-sm-6
              p-pagination.pull-right(v-model='pagination.currentPage', :per-page='pagination.perPage', :total='pagination.total')
        .card-footer
          hr
          .row.buttons-with-margin
            .col-sm-6
              router-link(
                v-if='navigationBack', 
                :to="`/${navigationBack}`"
              )
                button.btn.btn-primary.btn-move-left.btn-fill(type='button')
                  i.ti-angle-left
                  |  Voltar
              router-link(:to='`${route}/new`')
                button.btn.btn-default(type='button')
                  i.ti-plus
                  |  Novo
</template>
<script>
  import Vue from 'vue'
  import {Table, TableColumn, Select, Option, Button, Dropdown, DropdownMenu, DropdownItem } from 'element-ui'
  import PPagination from 'src/components/UIComponents/Pagination.vue'

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
      title: {
        type: String,
        required: true
      },
      description: {
        type: String
      },
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
      navigationBack: {
        type: String
      },
      tableKey: {
        default: 'id'
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
      handleDelete(index, object) {
        this.$emit('deleteItem', { index, object });
      },
      removeItem(index) {
        console.log(index)
        this.tableData.splice(index)
      }
    }
  }
</script>