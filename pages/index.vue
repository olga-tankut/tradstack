import axios from 'axios';

<template>
  <div>
    {{requestResult}}
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
      this.requestResult = await this.$axios.get('https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=3cGGAzhEUGTJGXrdy5TNaTrU3ctblSEK');
      for (let i=0; i< requestResult.data.results.length;i++){
        x += renderResult([i+1], this.requestResult.data.results[i]);
      }
    },

    renderResult(n, result, photo){
      
    }
  }
}
</script>
