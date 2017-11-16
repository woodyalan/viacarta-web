<template lang="pug">
  cadastro(
    :route='route'
  )
    .row(slot='fields')
      .col-xs-12
        .row
          .col-md-3
            fg-input(
              type='text',
              label='Nome',
              placeholder='Nome', 
              v-model='tela.nome', 
              name='nome', 
              :rules='{ required: true }'
            )

          .col-md-3
            fg-input(
              label='Descrição',
              placeholder='Descrição', 
              v-model='tela.descricao', 
              name='descricao',
              :rules='{ required: true }'
            )

          .col-md-3
            fg-input(
              label='Rota',
              placeholder='Rota', 
              v-model='tela.rota', 
              name='rota', 
              :rules='{ required: true }'
            )
        
          .col-md-3
            fg-select(
              v-if='menus',
              label='Menu',
              placeholder='Menu', 
              v-model='tela.menu', 
              name='menu', 
              :options='menus',
              :rules='{ required: false }'
            )
        
        .row
          .col-md-3
            fg-select(
              label='Ativo',
              placeholder='Ativo', 
              v-model='tela.ativo', 
              name='ativo', 
              :rules='{ required: true }',
              :options='options.ativo'
            )

    button.btn.btn-fill.btn-info(
      :class='{ disabled: loading }'
      @click='salvar()',
      type='button',
      slot='actions'
    ) Salvar
</template>
<script>
import Cadastro from 'src/components/GeneralViews/Cadastro.vue'
import TelaService from 'src/domain/tela/TelaService'
import MenuService from 'src/domain/menu/MenuService'
import Tela from 'src/domain/tela/Tela'
import swal from 'sweetalert2'

export default {
  $validates: true,
  components: {
    'cadastro': Cadastro
  },
  data () {
    return {
      route: 'tela',
      loading: false,
      options: {
        ativo: [
          {
            value: 1,
            text: 'Sim'
          },
          {
            value: 0,
            text: 'Não'
          }
        ]
      },
      tela: {
        nome: null,
        descricao: null,
        rota: null,
        menu: null,
        ativo: null
      }
    }
  },
  asyncComputed: {
    menus() {
      this.service = new MenuService(this.$resource);
      return this.service
        .get()
        .then(menus => {
          return menus.map(m => {
            return {
              value: m.id,
              text: m.nome
            }
          });
        });
    }
  },
  methods: {
    validate() {
      return this.$validator
        .validateAll()
        .then(success => success)
        .catch((err) => {
          console.log(err)
        })
    },
    salvar() {
      let app = this;

      this.validate()
        .then(success => {
          if(success && !this.loading) {
            this.loading = true;

            this.service = new TelaService(this.$resource);

            if(this.$route.params.id) {
              this.service
                .update(this.$route.params.id, this.tela)
                .then(response => {
                  let success = response.success;

                  swal({
                    title: success ? 'Muito bem!' : 'Ops!',
                    html: success ? `O registro foi atualizado com sucesso` : `Falha ao salvar o registro. ${response.error}`,
                    buttonsStyling: false,
                    type: success ? 'success' : 'error',
                    confirmButtonClass: 'btn btn-success btn-fill',
                    allowOutsideClick: false
                  }).then(function() {
                    if(success)
                      app.$store.dispatch('setBackToList', true);
                  });
                });
            } else {
              this.service
                .save(this.tela)
                .then(response => {
                  let success = response.success;

                  swal({
                    title: success ? 'Muito bem!' : 'Ops!',
                    html: success ? `O registro foi salvo com sucesso` : `Falha ao salvar o registro. ${response.error}`,
                    buttonsStyling: false,
                    type: success ? 'success' : 'error',
                    confirmButtonClass: 'btn btn-success btn-fill',
                    allowOutsideClick: false
                  }).then(function() {
                    if(success)
                      app.$store.dispatch('setBackToList', true);
                  });
                });
            }
          }
        });
    }
  },
  mounted() {
    this.tela = new Tela();

    if(this.$route.params.id) {
      this.service = new TelaService(this.$resource);
      this.service
        .get(this.$route.params.id)
        .then(tela => this.tela = tela);
    }
  }
}
</script>

