<template>
  <a class="w-full h-full bg-white text-center m-0 rounded shadow-md flex flex-col">
    <p class="text-4xl text-teal-500 mt-4">{{time}}</p>
    <span class="text-base text-gray-500 mt-1">{{range}}</span>
    <div class="text-sm text-gray-700 mt-1">{{timeZone.split('/')[1].replace("_"," ")}}</div>
  </a>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Clock',
  props: {
  },
  data() {
    return {
      time: '',
      range: '',
      timeZone: 'Asia/Tokyo',
      intervalHolder: 0,
      delayBetweenUpdates: 1000,
    };
  },
  methods: {
    updateTile() {
      const formattedTime = new Date(new Date().toLocaleString('en-US', { timeZone: this.timeZone }));
      this.time = `${formattedTime.getHours() < 12 ? formattedTime.getHours() : formattedTime.getHours() - 12}:${formattedTime.getMinutes() < 10 ? '0' : ''}${formattedTime.getMinutes()}`;
      this.range = formattedTime.getHours() < 12 ? 'AM' : 'PM';
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
