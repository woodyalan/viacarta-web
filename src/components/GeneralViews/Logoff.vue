<template lang="pug">
  .contact-us.full-screen
    .wrapper.wrapper-full-page.section.content
      div
        .container
          .row
            .col-md-8.col-md-offset-2.text-center
              h2.title.text-danger Saindo...
</template>

<script>
  export default {
    mounted() {
      this.$store.dispatch('resetData')
        .then(() => {
          this.$router.push('/login');
        });
    }
  }
</script>
