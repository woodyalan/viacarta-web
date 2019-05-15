<template lang="pug">
  .row
    .col-xs-12
      .card(v-if='telaInfo')
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
                  :default-sort='sort',
                  border='', 
                  style='width: 100%'
                )
                  el-table-column(v-for='column in tableColumns', :class-name='column.class', :prop='column.prop', :label='column.label', sortable='', :min-width='column.minWidth')
                  el-table-column(width='150' class-name='text-center')
                    template(scope='props')
                      router-link(:to='`${rota}/edit/${props.row[tableKey]}`')
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
                v-if='routeNavigationBack', 
                :to="routeNavigationBack"
              )
                button.btn.btn-primary.btn-move-left.btn-fill(type='button')
                  i.ti-angle-left
                  |  Voltar
              
              router-link(:to='`${rota}/new`')
                button.btn.btn-default(type='button')
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
      paramValue: {
        type: String
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
      }    },
    components: {
      PPagination
    },
    computed: {
      rota() {
        let param = this.paramValue ? `/${this.paramValue}` : '';
        return this.$route.params.backRoute ? `/${this.telaInfo.menuPath}/${this.$route.params.backRoute}/${this.telaInfo.tela}${param}` : this.telaInfo.rota;
      },
      routeNavigationBack() {
        if(this.$route.params.backRoute || this.navigationBack)
          return this.$route.params.backRoute ? `/${this.telaInfo.menuPath}/${this.$route.params.backRoute}` : `/${this.telaInfo.menuPath}/${this.navigationBack}`;
      },
      pagedData () {
        return this.tableData.reverse().slice(this.from, this.to)
      },
      queriedData () {
        if(this.tableData) {
          if (!this.searchQuery) {
            this.pagination.total = this.tableData.length;
            return this.pagedData;
          }
          let result = this.tableData.reverse()
            .filter((row) => {
              let isIncluded = false
              for (let key of this.propsToSearch) {
                const parts = key.split('.');

                let rowValue = '';
                let hasValue = row[key] != undefined;

                if(!hasValue && parts.length > 0) {
                  let objectPart;

                  for(let part of parts) {
                    if(objectPart) {
                      hasValue = objectPart[part] != undefined;
                    }

                    if((typeof row[part]) == 'object') {
                      objectPart = row[part];
                    }

                    if(hasValue) {
                      rowValue = objectPart[part];
                    }
                  }
                } else {
                  rowValue = row[key];
                }

                if(hasValue) {
                  rowValue = rowValue.toString().toUpperCase();
                  if (rowValue.includes && rowValue.includes(this.searchQuery.toUpperCase())) {
                    isIncluded = true
                  }
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
        let app = this;
        this.service = new LoginService(this.$http);
        return this.service
          .getTelaInfo(this.route)
          .then(telaInfo => {
            let param = this.paramValue ? `/${this.paramValue}` : '';

            let result = {
              title: telaInfo.descricao,
              menuPath: telaInfo.menuObject.path,
              tela: telaInfo.rota,
              rota: `/${telaInfo.menuObject.path}/${telaInfo.rota}${param}`  
            }
            
            app.$store.dispatch('setLastRoute', result);

            return result;
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
        searchQuery: '',
        sort: {
          prop: 'id', 
          order: 'descending'
        }
      }
    },
    methods: {
      formatMoney(row, column) {
        console.log(row);
        // return row.address;
      },
      handleDelete(index, object) {
        this.$emit('deleteItem', { index, object });
      },
      removeItem(index) {
        this.tableData.splice(index)
      }
    }
  }
</script>