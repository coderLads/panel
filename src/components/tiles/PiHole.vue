<template>
  <a
    :href='link'
    target="_blank"
    class="w-full h-full bg-white text-center m-0 rounded shadow-md flex flex-col"
    :class="{ shiny: highlight }"
  >
  <!--<img :src="iconurl" class='block text-center w-12 h-12' style='margin: 0 auto; margin-bottom: -.75rem'>-->
    <div class="text-teal-500 mt-4 flex flex-row justify-center">
      <p class="text-4xl">{{ads}}</p>
    </div>
    <span class="text-base text-gray-500 mt-1 align-middle">Blocked</span>
    <div class="text-sm text-gray-700 mt-1">PiHole</div>
  </a>
</template>

<script lang="ts">
import Vue from 'vue';

const abbreviate = require('number-abbreviate');

export default Vue.extend({
  name: 'VodeVoice',
  props: {
    tileProps: Object,
  },
  data() {
    return {
      link: '',
      ads: '0',
      highlight: false,
      intervalHolder: 0,
      delayBetweenUpdates: 60000,
    };
  },
  methods: {
    updateTile() {
      const self = this;
      const request = new XMLHttpRequest();
      request.open('GET', `http://${self.tileProps.piIp}/admin/api.php?summary`, true);
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          self.delayBetweenUpdates = 60000;
          const r = JSON.parse(request.response);
          const newAdsBlocked = r.ads_blocked_today;
          if (self.ads !== abbreviate(newAdsBlocked)) {
            self.addShine();
            self.ads = abbreviate(newAdsBlocked);
          }
        }
      };
      request.onerror = () => {
        console.log('Could not connect to piehole');
        self.delayBetweenUpdates = 600000;
      };
      request.send();
    },
    addShine() {
      this.highlight = true;
      setTimeout(() => { this.highlight = false; }, 5000);
    },
  },
  mounted() {
    this.link = `http://${this.tileProps.piIp}/admin/index.php`;
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
