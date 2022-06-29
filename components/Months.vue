<template>
<div>
  <div class="bg-color m-0">
      <nuxt-link class="link" to="/">Home</nuxt-link>
  </div>
  <div class="archive bg-color mx-0">
    <h3 class="text-white text-center pb-5">
      Archive:  {{ year }}
    </h3>
    <div class="row">
      <div v-for="item in items" :key="item.id" class="col-3 p-2">
        <a class="link month" :href="`/archive/${year}/${item.index}`">{{ item.month }}</a>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      items: [{ month: 'January', index: 1 }, { month: 'February', index: 2 }, { month: 'March', index: 3 }, { month: 'April', index: 4 }, { month: 'May', index: 5 },
      { month: 'June', index: 6 }, { month: 'July', index: 7 }, { month: 'August', index: 8 }, { month: 'September', index: 9 }, { month: 'October', index: 10 }, { month: 'November', index: 11 }, { month: 'December', index: 12 }]
    }
  },

  props: {
    year: {
      type: String,
      required: true,
    },
  },

  methods: {
    selectButton(month) {
     console.log("Month " + month);
     //this.$router.push(`/archieve/${this.year}/${index}`);
    },

    randomColor() {
      return 'rgba('+ Math.round(Math.random()*100)+','+ Math.round(Math.random()*100) +','+ Math.round(Math.random()*100) +', '+ 0.4 +')';
    },
  },
}
</script>