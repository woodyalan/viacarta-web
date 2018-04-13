<template lang="pug">
.card-message
    i.ti-thumb-up
    p {{ $props.message }}
</template>
<script>

export default {
  props: {
    message: String
  }
}
</script>
