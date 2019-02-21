<template>
  <div class="date">{{moment(date).format('LL')}}</div>
</template>

<script>
import moment from 'moment'
import 'moment/locale/fr'
export default {
  props: {
    date: { required: true }
  },
  methods: {
    moment
  }
}
</script>

<style>
.date {
  margin-bottom: 1rem;
  font-size: 20px;
  color: #444
}
</style>