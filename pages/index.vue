import axios from 'axios';

<template>
  <div>
    {{this.requestResult}}
  </div>
</template>

<script>
export default {
 data() {
    return {
      requestResult: null
    }
  },

  mounted() {
    this.getNews();
  },

  methods: {
    async getNews() {
      while(true) {
        this.requestResult = await this.$axios.get('https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=3cGGAzhEUGTJGXrdy5TNaTrU3ctblSEK');
        await new Promise(resolve => setTimeout(resolve, 10000))
      }
    },

    renderResult(n, result, photo){
      
    }
  }
}
</script>
