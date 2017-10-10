<template lang="pug">
  .user(v-if='user')
    .photo
      img(src='static/img/faces/face-0.jpg')
    .info
      a(data-toggle='collapse', @click='toggleMenu', href='javascript:void(0)')
        span
          | {{ user.nome }}
          b.caret
      .clearfix
      div
        el-collapse-transition
          ul.nav(v-show='!isClosed')
            li
              router-link(:to="'/logoff'" replace)
                span.sidebar-mini S
                span.sidebar-normal Sair
</template>
<script>
  import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
  export default {
    components: {
      [CollapseTransition.name]: CollapseTransition
    },
    data () {
      return {
        isClosed: true
      }
    },
    computed: {
      user() {
        return this.$store.state.user;
      }
    },
    methods: {
      toggleMenu () {
        this.isClosed = !this.isClosed
      }
    }
  }
</script>
<style>
  .collapsed {
    transition: opacity 1s;
  }
</style>
