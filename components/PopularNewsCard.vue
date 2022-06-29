<template>
  <div class="card w-50 p-0" :style="{'background-color': randomColor()}">
      <div class="card-body m-3" @click="selectCard">
        <h5 class="card-title text-white">
          {{ post.title }}
        </h5>
        <div>
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

    selectCard() {
      window.open(this.post.url);
    },

    randomColor() {
      return 'rgba('+ Math.round(Math.random()*100)+','+ Math.round(Math.random()*100) +','+ Math.round(Math.random()*100) +', '+ 0.4 +')';
    },
  },
}
</script>
