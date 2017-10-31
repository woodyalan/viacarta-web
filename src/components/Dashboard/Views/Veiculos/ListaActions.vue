<template>
  <div class="row">
    <div class="col-xs-12">
      <div class="card">
        <div class="card-header">
          <h4 class="title">
            {{ title }}
            <router-link class="pull-right" to="/cadastros/veiculos/new">
            <a href="#" class="btn btn-icon btn-default"><i class="ti-plus"></i></a>
          </router-link>
          </h4>
          <p class="category">{{ description }}</p>
        </div>
        <div class="card-content">
          <div class="row">
            <div class="col-xs-6">
              <el-select
                class="select-default"
                v-model="pagination.perPage"
                placeholder="Registros por página">
                <el-option
                  class="select-default"
                  v-for="item in pagination.perPageOptions"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </div>
            <div class="col-xs-6">
              <div class="pull-right">
                <label>
                  <input type="search" class="form-control input-sm" placeholder="Busca" v-model="searchQuery" aria-controls="datatables">
                </label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12">
              <div class="table-responsive">
                <el-table class="table table-striped table-no-bordered table-hover"
                  :data="queriedData"
                  border
                  style="width: 100%">
                  <el-table-column v-for="column in tableColumns"
                    :class-name="column.class"
                    :prop="column.prop"
                    :label="column.label"
                    sortable>
                  </el-table-column>
                  <el-table-column class-name="col-md-1 text-center" fixed="right">
                    <template scope="props">
                      <el-dropdown>
                        <el-button class="btn btn-primary btn-sm btn-fill">
                          Ações <span class="caret"></span>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item>Seguros</el-dropdown-item>
                          <el-dropdown-item :divided="true"></el-dropdown-item>
                          <el-dropdown-item class="text-warning"><i class="ti-pencil-alt"></i> Editar</el-dropdown-item>
                          <el-dropdown-item class="text-danger"><i class="ti-trash"></i> Excluir</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </template>
                  </el-table-column>
                </el-table>
              </div>  
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6 pagination-info">
              <p class="category">Exibindo de {{from + 1}} a {{to}} em {{total}} registro(s)</p>
            </div>
            <div class="col-sm-6">
              <p-pagination class="pull-right"
                v-model="pagination.currentPage"
                :per-page="pagination.perPage"
                :total="pagination.total">
              </p-pagination>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <hr>
          <div class="row">
            <div class="col-sm-6">
              <router-link to="/cadastros/veiculos/new">
                <a href="#" class="btn btn-default"><i class="ti-plus"></i> Novo</a>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
    components: {
      PPagination
    },
    computed: {
      pagedData () {
        return this.tableData.slice(this.from, this.to)
      },
      queriedData () {
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
        this.pagination.total = this.tableData.length
        return this.tableData.length
      }
    },
    data () {
      return {
        title: 'Cadastro de Veículos',
        description: "Listagem de Veículos",
        pagination: {
          perPage: 25,
          currentPage: 1,
          perPageOptions: [10, 25, 50],
          total: 0
        },
        searchQuery: '',
        propsToSearch: ['nome', 'ano', 'placa'],
        tableColumns: [
          {
            prop: 'nome',
            label: 'Nome',
            class: ''
          },
          {
            prop: 'ano',
            label: 'Ano',
            class: ''
          },
          {
            prop: 'placa',
            label: 'Placa',
            class: ''
          }
        ],
        tableData: [{
          nome: 'Amarok',
          ano: '2017',
          placa: 'AYU-4512'
        },{
          nome: 'Gol G5',
          ano: '2013',
          placa: 'AGT-1242'
        },{
          nome: 'Gol G6',
          ano: '2016',
          placa: 'AGG-2122'
        },{
          nome: 'Gol G6',
          ano: '2016',
          placa: 'AGG-2122'
        },{
          nome: 'Gol G4',
          ano: '2010',
          placa: 'AUR-1902'
        },{
          nome: 'Gol G6',
          ano: '2016',
          placa: 'AGG-2122'
        }]      
      }
    },
    methods: {
      handleEdit() {

      },
      handleDelete() {
        
      }
    }
  }
</script>
<style>
</style>
