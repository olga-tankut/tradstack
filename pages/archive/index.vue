<template>
<div>
    <div class="bg-color m-0">
      <nuxt-link class="link" to="/">Home</nuxt-link>
    </div>
    <div class="archive bg-color mx-0">
      <h3 class="text-white text-center pb-5">
        Archive
      </h3>
      <div class="row">
        <div v-for="item in items" :key="item.id" class="col-2 p-2">
          <nuxt-link class="link month" :to="`/archive/${item.year}`">{{ item.year }}</nuxt-link>
        </div>
      </div>
    </div>
</div>
</template>

<script>

export default {
  data() {
    return {
      items: [{ year: '2021' }, { year: '2020' }, { year: '2019' }, { year: '2018' }, { year: '2017' }, { year: '2016' }, { year: '2015' }, 
      { year: '2014' }, { year: '2013' }, { year: '2012' }, { year: '2011' }, { year: '2010' }],
    }
  },
}
</script>