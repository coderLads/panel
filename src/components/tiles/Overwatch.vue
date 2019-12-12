<template>
  <a
    :href='link'
    target="_blank"
    class="w-full h-full bg-white text-center m-0 rounded shadow-md flex flex-col"
    :class="{ shiny: highlight }"
  >
    <div class="text-teal-500 mt-4 flex flex-row justify-center">
      <p class="text-4xl">{{sr}}</p>
    </div>
    <span class="text-base text-gray-500 mt-1 align-middle">{{rank}}</span>
    <div class="text-sm text-gray-700 mt-1">Overwatch</div>
  </a>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Overwatch',
  props: {
    tileProps: Object,
  },
  data() {
    return {
      link: '',
      sr: 0,
      rank: '',
      highlight: false,
      intervalHolder: 0,
      delayBetweenUpdates: 600000,
    };
  },
  methods: {
    updateTile() {
      const self = this;
      const request = new XMLHttpRequest();
      request.open('GET', `https://owapi.net/api/v3/u/${self.tileProps.username}/blob`, true);
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          const r = JSON.parse(request.response);
          const newSr = r[self.tileProps.region].stats.competitive.overall_stats[`${self.tileProps.role}_comprank`];
          const newRank = r[self.tileProps.region].stats.competitive.overall_stats[`${self.tileProps.role}_tier`];
          if (self.sr !== newSr) {
            self.addShine();
            self.sr = newSr;
            self.rank = newRank[0].toUpperCase() + newRank.slice(1);
          }
        }
      };
      request.send();
    },
    addShine() {
      this.highlight = true;
      setTimeout(() => { this.highlight = false; }, 5000);
    },
  },
  mounted() {
    this.link = `https://www.overbuff.com/players/pc/${this.tileProps.username}?mode=competitive`;
  },
  created() {
    this.updateTile();
    this.intervalHolder = setInterval(() => {
      this.updateTile();
    }, this.delayBetweenUpdates);
  },
  beforeDestroy() {
    clearInterval(this.intervalHolder);
  },
});
</script>
