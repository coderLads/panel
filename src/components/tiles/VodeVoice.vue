<template>
  <a
    :href='link'
    target="_blank"
    class="w-full h-full bg-white text-center m-0 rounded shadow-md flex flex-col"
  >
  <!--<img :src="iconurl" class='block text-center w-12 h-12' style='margin: 0 auto; margin-bottom: -.75rem'>-->
    <div class="text-teal-500 mt-4 flex flex-row justify-center">
      <p class="text-4xl ml-2">{{hours}}</p>
    </div>
    <span class="text-base text-gray-500 mt-1 align-middle">Minutes</span>
    <div class="text-sm text-gray-700 mt-1">Vode Voice Stats</div>
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
      hours: 0,
      serverId: '617054974895063050',
      user: 'Badtz#6434',
      intervalHolder: 0,
      delayBetweenUpdates: 60000,
    };
  },
  methods: {
    updateTile() {
      const self = this;
      const request = new XMLHttpRequest();
      request.open('GET', `https://proxy.statbot.net:5000/servervoice/${self.serverId}`, true);
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          const r = JSON.parse(request.response);
          self.hours = r.topMembers.find((i:any) => i.membertag === self.user).count;
          self.link = `https://statbot.net/dashboard/${self.serverId}/voice`;
        }
      };
      request.send();
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
