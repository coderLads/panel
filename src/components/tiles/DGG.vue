<template>
  <a
    target="_blank"
    class="w-full h-full bg-white text-center m-0 rounded shadow-md flex flex-col"
    :class="{ shiny: highlight }"
    href="https://www.destiny.gg/bigscreen"
  >
    <div class="text-teal-500 mt-4 flex flex-row justify-center">
      <p class="text-3xl">{{live ? 'Online' : 'Offline'}}</p>
    </div>
    <span class="text-base text-gray-500 mt-4 align-middle">
      <div v-if="live === true">{{viewers}} viewers</div>
      <div v-else>Hosting {{host}}</div>
    </span>
    <div class="text-sm text-gray-700 mt-1">D.GG</div>
  </a>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'DGG',
  props: {
    tileProps: Object,
  },
  data() {
    return {
      live: false,
      viewers: 0,
      host: '',
      highlight: false,
      intervalHolder: 0,
      delayBetweenUpdates: 60000,
    };
  },
  methods: {
    async updateTile() {
      const self = this;
      const request = new XMLHttpRequest();
      request.open('GET', 'https://cors-anywhere.herokuapp.com/https://www.destiny.gg/api/info/stream', true);
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          const r = JSON.parse(request.response);
          const currentStatus = r.live;
          if (currentStatus === false) {
            self.host = r.host.display_name;
          } else {
            self.viewers = r.viewers;
            self.live = currentStatus;
          }
          if (self.live !== currentStatus) {
            self.addShine();
          }
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
