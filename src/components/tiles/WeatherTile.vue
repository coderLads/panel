<template>
  <a
    :href='link'
    target="_blank"
    class="w-full h-full bg-white text-center m-0 rounded shadow-md flex flex-col"
  >
  <!--<img :src="iconurl" class='block text-center w-12 h-12' style='margin: 0 auto; margin-bottom: -.75rem'>-->
    <div class="text-teal-500 mt-4 flex flex-row justify-center">
      <p class="text-4xl ml-2">{{weather}}</p>
      <span class="text-xl pb-2">º</span>
    </div>
    <span class="text-base text-gray-500 mt-1 align-middle">{{location}}</span>
    <div class="text-sm text-gray-700 mt-1">Open Weather Map</div>
  </a>
</template>

<script lang="ts">
import Vue from 'vue';
import keys from '@/keys';

export default Vue.extend({
  name: 'WeatherTile',
  props: {},
  data() {
    return {
      link: '',
      weather: 0,
      location: 'Seattle',
      iconurl: '',
      intervalHolder: 0,
      delayBetweenUpdates: 30000,
    };
  },
  methods: {
    updateTile() {
      const self = this;
      const request = new XMLHttpRequest();
      request.open('GET', `http://api.openweathermap.org/data/2.5/weather?q=${self.location}&APPID=${keys.OpenWeatherMap}&units=imperial`, true);
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          const r = JSON.parse(request.response);
          self.iconurl = `http://openweathermap.org/img/wn/${r.weather[0].icon}@2x.png`;
          self.weather = Math.round(r.main.temp);
          self.link = `https://openweathermap.org/find?q=${self.location}`;
        }
      };
      request.send();
    },
  },
  created() {
    this.intervalHolder = setInterval(() => {
      this.updateTile();
    }, this.delayBetweenUpdates);
  },
  beforeDestroy() {
    clearInterval(this.intervalHolder);
  },
});
</script>
