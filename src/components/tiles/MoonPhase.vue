<template>
  <a class="w-full h-full bg-white text-center m-0 rounded shadow-md flex flex-col" :class="{ shiny: highlight }">
    <p class="text-4xl text-teal-500 mt-4">{{phase}}</p>
    <span class="text-base text-gray-500 mt-1">{{label}}</span>
    <div class="text-sm text-gray-700 mt-1">{{timeZone.split('/')[1].replace("_"," ")}}</div>
  </a>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'MoonPhase',
  props: {
  },
  data() {
    return {
      phase: '',
      label: '',
      timeZone: 'Asia/Tokyo',
      highlight: false,
      intervalHolder: 0,
      delayBetweenUpdates: 1000,
    };
  },
  methods: {
    updateTile() {
      const formattedTime = new Date(new Date().toLocaleString('en-US', { timeZone: this.timeZone }));
      function getHours() {
        if (formattedTime.getHours() <= 12) {
          if (formattedTime.getHours() === 0) {
            return 12;
          }
          return formattedTime.getHours();
        }
        return formattedTime.getHours() - 12;
      }
      const currentMoonPhase = `${getHours()}:${formattedTime.getMinutes() < 10 ? '0' : ''}${formattedTime.getMinutes()}`;
      if (this.phase !== currentMoonPhase) {
        this.addShine();
        this.phase = currentMoonPhase;
        this.label = formattedTime.getHours() < 12 ? 'AM' : 'PM';
      }
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
