<template>
  <div class="card w-50 p-0" :style="{'background-color': randomColor()}">
      <div class="card-body" @click="selectCard">
        <h5 class="card-title text-white">
          {{ post.title }}
        </h5>
        <div v-if="!getImage(post)">
          <div height=0> </div>
        </div>
        <div v-else class="view zoom">
          <img :src="getImage(post)" :alt="getCaption(post)" height=140 width=210 />
        </div>
        <p class="mt-2 text-justify text-light line-clamp-4">
          {{ post.abstract }}
        </p>
        <div>
          <p class="font-bold text-light">{{ post.byline }}</p>
          <p class="text-light">
            {{ formatDate(post.published_date) }}
          </p>
        </div>
      </div>
  </div>
</template>

<script>
import { format } from "date-fns"

export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },

  methods: {
    formatDate(strDate) {
      return format(new Date(strDate), "MMMM do, yyyy")
    },

    // From https://www.sitepoint.com/fetching-data-third-party-api-vue-axios/
    getImage(post) {
      if(post.multimedia) {
        let imgObj = post.multimedia.find(media => media.format === "mediumThreeByTwo210")
        if(imgObj) {
          let img = imgObj.url;
          return img;
        }
      }
    },
    getCaption(post) {
      if(post.multimedia) {
        let imgObj = post.multimedia.find(media => media.format === "mediumThreeByTwo210")
        if(imgObj) {
          let caption = imgObj.caption;
          return caption;
        }
        return null
      }
    },

    selectCard() {
      window.open(this.post.url);
    },

    randomColor() {
      return `rgba(${Math.round(Math.random()*7)},${Math.round(Math.random()*70)},${Math.round(Math.random()*7)}, ${0.2})`;
    },
  },
}
</script>
