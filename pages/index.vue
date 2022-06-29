
<template>
<div>
  <div class="bg-color m-0">
      <nuxt-link class="link" to="/archive">Archive</nuxt-link>
  </div>
    <h4 class="bg-color m-0 text-white text-center">
      The Most Viewed
    </h4>
    <PopularNews />
    <SectionsList :sections="sections" @selectedItem="getSelectedItem" class="bg-color" />
    <h4 class="text-center bg-color m-0 text-white">
      News Section : {{this.selectedItem}}
    </h4>
    <NewsList :posts="posts" :startSection="currentSection" ref="NewsList" />
  </div>
</template>

<script>
import NewsList from "./../components/NewsList.vue"
import SectionsList from "./../components/SectionsList.vue"
import PopularNews from "~/components/PopularNews.vue"

export default {

  components: {
    SectionsList,
    NewsList,
    PopularNews
  },

  data() {
    return {
      selectedItem: "world",
      currentSection: "world",
      sections: [],
      posts: []
    }
  },

  methods: {
    getSelectedItem(selectedItem) {
      this.selectedItem = selectedItem;
      this.currentSection = this.selectedItem;
      this.$refs.NewsList.setCurrentSection(this.currentSection);
      console.log("Selected in App "+ this.currentSection);
    }
  }
}
</script>
