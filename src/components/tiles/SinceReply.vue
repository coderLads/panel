<template>
  <a class="w-full h-full bg-white text-center m-0 rounded shadow-md flex flex-col" :class="{ shiny: highlight }">
    <p class="text-3xl text-teal-500 mt-5 mb-1">{{daysSince}} days</p>
    <span class="text-sm text-gray-500 my-1">Since Reply from</span>
    <div class="text-sm text-gray-700 mt-1">{{tileProps.name}}</div>
  </a>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ExampleTile',
  props: {
    tileProps: Object,
  },
  data() {
    return {
      daysSince: 0,
      highlight: false,
      intervalHolder: 0,
      delayBetweenUpdates: 60000,
    };
  },
  methods: {
    updateTile() {
      const lastDate = new Date(this.tileProps.timestamp);
      const newDays = Math.floor((new Date().getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      if (this.daysSince !== newDays) {
        this.addShine();
        this.daysSince = newDays;
      }
    },
    addShine() {
      this.highlight = true;
      setTimeout(() => { this.highlight = false; }, 5000);
    },
  },
  created() {
    this.updateTile();
    // creates the interval
    this.intervalHolder = setInterval(() => {
      this.updateTile();
    }, this.delayBetweenUpdates);
  },
  beforeDestroy() {
    // destroys the interval before component is removed
    clearInterval(this.intervalHolder);
  },
});
</script>
