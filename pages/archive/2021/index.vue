<template>
    <Months :year="year"/>
</template>

<script>
import Months from "/./components/Months.vue"
export default {
  components: {
    Months,
  },

  data() {
    return {
      year: '2021',
    }
  },
}
</script>