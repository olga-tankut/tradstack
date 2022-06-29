
<template>
<div class="bg-color py-3">
  <p v-if="startPending()" class="pending display-4">Loading news...</p>
    <p v-else-if="$fetchState.error" class="pending display-4">An error occurred :(</p>
    <div v-else>
      <div class="row mx-2 pb-5">
          <PopularNewsCard v-for="(post, index) in posts" :key="index" :post="post" class="col-3 current-element"/>
      </div>
    </div>
</div>

</template>

<script>
import PopularNewsCard from "./PopularNewsCard.vue"
export default {
  components: {
    PopularNewsCard,
  },

  data() {
    return {
      posts: [],
      poolingInterval: null,
      currentElementIndex: 0
    }
  },

  async fetch() {
    await this.getNews();
    this.firstStart = false;
  },

  methods: {
    async getNews() {
        const requestResult = await fetch(`https://api.nytimes.com/svc/mostpopular/v2/viewed/30.json?api-key=3cGGAzhEUGTJGXrdy5TNaTrU3ctblSEK`)
        .then(response => response.json())
        .catch(error => console.error(error));
      this.posts = requestResult.results.slice(0,4);
    },

    startPending() {
      if (this.$fetchState.pending && this.firstStart) {
        return true;
      }
      return false;
    },
  }
}
</script>
