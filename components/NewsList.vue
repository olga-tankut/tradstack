
<template>
<div class="bg-color py-3">
  <p v-if="startPending()" class="pending display-4">Loading news...</p>
    <p v-else-if="$fetchState.error" class="pending display-4">An error occurred :(</p>
    <div v-else>
        <div class="row mx-2">
          <NewsCard v-for="(post, index) in posts" :key="index" :post="post" class="col-4" />
        </div>
    </div>
</div>
</template>

<script>
import NewsCard from "./NewsCard.vue"
export default {
  components: {
    NewsCard,
  },

  props: {
    startSection: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      posts: [],
      currentSection: '',
      poolingInterval: null,
      firstStart: true,
    }
  },

  mounted() {
    this.poolingInterval = setInterval(() => {
      if (!this.$fetchState.pending) {
        console.log("scheduled fetch for section " + this.getCurrentSection());
        if(this.$fetchState.timestamp <= Date.now() - 10000){
          this.$fetch();
        }
      }
    }, 15000)
  },

  beforeUnmount() {
    clearInterval(this.poolingInterval);
  },
  fetchOnServer: false,
  async fetch() {
    console.log("fetch hook " + this.getCurrentSection());
    await this.getNews(this.getCurrentSection());
    this.firstStart = false;
  },

  methods: {
    async getNews(section) {
      section = section.replace(/ & /g, "%20%26%20").replace(/[/]/g, "%2F");
        const requestResult = await fetch(`https://api.nytimes.com/svc/news/v3/content/nyt/${section}.json?api-key=3cGGAzhEUGTJGXrdy5TNaTrU3ctblSEK`)
        .then(response => response.json())
        .catch(error => console.error(error));
      this.posts = requestResult.results;
      console.log("New " + section);
    },
    getCurrentSection() {
      return this.currentSection ? this.currentSection : this.startSection;
    },
    setCurrentSection(newValue) {
      if (this.currentSection != newValue) {
          this.firstStart = true;
          console.log("set currentSection " + newValue);
          this.currentSection = newValue;
          this.$fetch();
        }
    },
    startPending() {
      if (this.$fetchState.pending && this.firstStart) {
        return true;
      }
      return false;
    }
  }
}
</script>
