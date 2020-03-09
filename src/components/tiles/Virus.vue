<template>
  <a
    target="_blank"
    class="w-full h-full bg-white text-center m-0 rounded shadow-md flex flex-col"
    :class="{ shiny: highlight }"
  >
    <div class="text-teal-500 mt-4 flex flex-row justify-center">
      <p class="text-4xl">{{stats.deaths}}</p>
      <p class="text-xl pl-2 pt-2"><span class="text-2xl">+</span>{{stats.todayDeaths}}</p>
    </div>
    <span class="text-base text-gray-500 mt-1 align-middle">Deaths in {{stats.country}}</span>
    <div class="text-sm text-gray-700 mt-1">Corona Virus</div>
  </a>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Virus',
  props: {
    tileProps: Object,
  },
  data() {
    return {
      stats: {
        country: '...',
        deaths: 0,
        todayDeaths: 0,
      },
      highlight: false,
      intervalHolder: 0,
      delayBetweenUpdates: 600000,
    };
  },
  methods: {
    updateTile() {
      const self = this;
      const request = new XMLHttpRequest();
      request.open('GET', 'https://cors-anywhere.herokuapp.com/https://corona.lmao.ninja/countries', true);
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          const r = JSON.parse(request.response);
          const newStats = r.filter((item:any) => item.country === self.tileProps.country);
          if (self.stats !== newStats[0]) {
            self.addShine();
            // eslint-disable-next-line prefer-destructuring
            self.stats = newStats[0];
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
