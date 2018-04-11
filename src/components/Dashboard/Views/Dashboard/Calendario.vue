<template lang="pug">
.card.card-calendar
  .card-content
    #fullCalendar
</template>
<script>
import $ from 'jquery'
import 'fullcalendar'
  
var today = new Date()
var y = today.getFullYear()
var m = today.getMonth()
var d = today.getDate()
export default {
  data () {
    return {
      events: []
    }
  },
  methods: {
    initCalendar ($) {
      var self = this
      var $calendar = $('#fullCalendar')
      $calendar.fullCalendar({
        header: {
          left: 'title',
          center: '',
          right: 'prev,next,today'
        },
        buttonText: {
          today: 'hoje',
          month: 'mês',
          week: 'semana',
          day: 'dia',
          list: 'lista'
        },
        locale: 'pt-br',
        defaultDate: today,
        selectable: true,
        selectHelper: true,
        editable: true,
        eventLimit: true,
        events: self.events
      })
    }
  },
  mounted () {
    window.$ = window.jQuery = $
    this.initCalendar($)
  }
}
</script>
