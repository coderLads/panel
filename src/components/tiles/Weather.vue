<template>
  <a
    :href='link'
    target="_blank"
    class="w-full h-full bg-white text-center m-0 rounded shadow-md flex flex-col"
    :class="{ shiny: highlight }"
  >
  <!-- <img :src="iconurl" class='block text-center w-12 h-12' style='margin: 0 auto; margin-bottom: -.75rem'> -->
    <div class="text-teal-500 mt-4 flex flex-row justify-center">
      <p class="text-4xl ml-2">{{tempterature}}</p>
      <span class="text-xl pb-2">º</span>
    </div>
    <span class="text-base text-gray-500 mt-1 align-middle">{{tileProps.location}}</span>
    <div class="text-sm text-gray-700 mt-1">Weather</div>
  </a>
</template>

<script lang="ts">
import Vue from 'vue';
import keys from '@/keys';

export default Vue.extend({
  name: 'Weather',
  props: {
    tileProps: Object,
  },
  data() {
    return {
      link: '',
      tempterature: 0,
      iconurl: '',
      highlight: false,
      intervalHolder: 0,
      delayBetweenUpdates: 30000,
    };
  },
  methods: {
    updateTile() {
      const self = this;
      const request = new XMLHttpRequest();
      request.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=${self.tileProps.location}&APPID=${keys.OpenWeatherMap}&units=${self.tileProps.units}`, true);
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          const r = JSON.parse(request.response);
          self.iconurl = `https://openweathermap.org/img/wn/${r.weather[0].icon}@2x.png`;
          const currentWeather = Math.round(r.main.temp);
          if (self.tempterature !== currentWeather) {
            self.addShine();
            self.tempterature = currentWeather;
          }
          self.link = `https://openweathermap.org/find?q=${self.tileProps.location}`;
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
