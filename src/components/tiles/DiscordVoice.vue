<template>
  <a
    :href='link'
    target="_blank"
    class="w-full h-full bg-white text-center m-0 rounded shadow-md flex flex-col"
    :class="{ shiny: highlight }"
  >
  <!--<img :src="iconurl" class='block text-center w-12 h-12' style='margin: 0 auto; margin-bottom: -.75rem'>-->
    <div class="text-teal-500 mt-4 flex flex-row justify-center">
      <p class="text-4xl">{{hours}}</p>
    </div>
    <span class="text-base text-gray-500 mt-1 align-middle">Minutes</span>
    <div class="text-sm text-gray-700 mt-1">Vode Voice Stats</div>
  </a>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'DiscordVoice',
  props: {
    tileProps: Object,
  },
  data() {
    return {
      link: '',
      hours: 0,
      highlight: false,
      intervalHolder: 0,
      delayBetweenUpdates: 60000,
    };
  },
  methods: {
    updateTile() {
      const self = this;
      const request = new XMLHttpRequest();
      request.open('GET', `https://proxy.statbot.net:5000/servervoice/${self.tileProps.serverId}`, true);
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          const r = JSON.parse(request.response);
          if (r.topMembers.length > 0) {
            const newUserHours = r.topMembers.find((i:any) => i.membertag === self.tileProps.user).count;
            if (self.hours !== newUserHours) {
              self.addShine();
              self.hours = newUserHours;
            }
          } else {
            console.log('No voice data this week');
            self.delayBetweenUpdates = 600000;
          }
          self.link = `https://statbot.net/dashboard/${self.tileProps.serverId}/voice`;
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
