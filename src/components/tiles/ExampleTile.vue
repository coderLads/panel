<template>
  <a href="" target="_blank" class="w-full h-full bg-white text-center m-0 rounded shadow-md flex flex-col">
    <!-- the main number to be displayed  -->
    <p class="text-4xl text-teal-500 mt-4">10</p>
    <!-- small note adding context to the number -->
    <span class="text-base text-gray-500 mt-1">Unread</span>
    <!-- info about the source (personal gmail, weather.com etc)  -->
    <div class="text-sm text-gray-700 mt-1">Example Tile</div>
  </a>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ExampleTile',
  props: {
  },
  data() {
    return {
      intervalHolder: 0, // variable that contains the interval for updating tile info
      delayBetweenUpdates: 1000, // how long to wait before updating the info on the tile
    };
  },
  methods: {
    updateTile() { // fetch the tile data here, so it updates automatically

    },
  },
  created() {
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
