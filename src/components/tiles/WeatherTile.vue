<template>
  <a
    :href='link'
    target="_blank"
    class="w-full h-full bg-white text-center m-0 rounded shadow-md flex flex-col"
  >
  <!--<img :src="iconurl" class='block text-center w-12 h-12' style='margin: 0 auto; margin-bottom: -.75rem'>-->
    <p class="text-4xl text-teal-400 mt-4">{{weather}}º</p>
    <span class="text-base text-gray-500 mt-1 align-middle">{{location}}</span>
  </a>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'WeatherTile',
  props: {},
  data() {
    return {
        link: '',
        weather: 0,
        location: 'Seattle',
        iconurl: ''
    };
  },
  beforeMount() {
    let self = this;
    let request = new XMLHttpRequest();
    request.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=' + self.location + '&APPID=ccc82db3a17a22d2039288a38a156b12&units=imperial', true);
    request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
        let r = JSON.parse(this.response);
        self.iconurl = 'http://openweathermap.org/img/wn/' + r.weather[0].icon + '@2x.png';
        self.weather = Math.round(r.main.temp);
        self.link = 'https://openweathermap.org/find?q=' + self.location;
    }
    };
    request.send();
  },
});
</script>
