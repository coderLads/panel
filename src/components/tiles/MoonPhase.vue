<template>
  <a
    class="w-full h-full bg-white text-center m-0 rounded shadow-md flex flex-col"
    :class="{ shiny: highlight }"
  >
    <p class="text-4xl text-teal-500 mt-4">{{phase}}</p>
    <span class="text-base text-gray-500 mt-1">{{type}}</span>
    <div class="text-xs text-gray-700 mt-1">{{daysUntil}}</div>
  </a>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'MoonPhase',
  data() {
    return {
      phase: '',
      daysUntil: '',
      type: '',
      timeZone: 'America/Los_Angeles',
      highlight: false,
      intervalHolder: 0,
      delayBetweenUpdates: 60000,
    };
  },
  methods: {
    updateTile() {
      const moonPhase: string[][] = [
        ['🌑', 'New Moon'],
        ['🌒', 'Waxing Crescent'],
        ['🌓', 'First Quarter'],
        ['🌔', 'Waxing Gibbous'],
        ['🌕', 'Full Moon'],
        ['🌖', 'Waning Gibbous'],
        ['🌗', 'Last Quarter'],
        ['🌘', 'Waning Crescent'],
        ['🌑', 'New Moon'],
      ];
      // Take the difference between the last new moon and today and divide it by one day in milliseconds,
      // take the absolute value of that value and round it, and then mod it by the Synodic constant
      const moonAge: number = Math.round(Math.abs(((new Date() as any) - (new Date(2019, 9, 27) as any)) / 86400000)) % 29.530588853;

      let intermediatePhase: number = Math.floor(moonAge / (7.38 / 2));
      if (intermediatePhase >= 8) { intermediatePhase -= 8; }

      if (this.phase !== moonPhase[intermediatePhase][0]) {
        this.addShine();
        // eslint-disable-next-line prefer-destructuring
        this.phase = moonPhase[intermediatePhase][0];
        this.daysUntil = `${Math.abs(Math.ceil(7.38 / 2 - intermediatePhase))} days until ${
          moonPhase[intermediatePhase + 1][1]
        }`;
        // eslint-disable-next-line prefer-destructuring
        this.type = moonPhase[intermediatePhase][1];
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
