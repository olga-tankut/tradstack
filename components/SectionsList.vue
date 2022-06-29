<template>
  <div class="dropdown bg-color pb-5">
      <b-form-select v-model="selectedItem" @change="saveSelectedItem">
        <option :value="null" disabled>-- Please select a news section --</option>
        <option v-for="(section, index) in sections" :key="index" :section="section">
            {{ section.section }}
        </option>
      </b-form-select>
  </div>
</template>

<script>
export default {

  data() {
    return {
      selectedItem: null,
      sections: [],
    }
  },
  fetchOnServer: false,
  async fetch() {
    await this.getSections();
  },

  methods: {

    async getSections() {
      const requestResult = await fetch('https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=3cGGAzhEUGTJGXrdy5TNaTrU3ctblSEK')
      .then(response => response.json())
      .catch(error => console.error(error));

      this.sections = requestResult.results;
    },

    saveSelectedItem() {
      this.$emit('selectedItem', this.selectedItem);
    }
  }
}
</script>
