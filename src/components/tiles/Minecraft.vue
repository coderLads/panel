<template>
  <a
    target="_blank"
    class="w-full h-full bg-white text-center m-0 rounded shadow-md flex flex-col"
    :class="{ shiny: highlight }"
  >
    <div class="text-teal-500 mt-4 flex flex-row justify-center">
      <p class="text-4xl ">{{players}}</p>
      <p class="text-4xl ">/{{maxPlayers}}</p>
    </div>
    <span class="text-base text-gray-500 mt-1 align-middle">Online Players</span>
    <div class="text-xs text-gray-700 mt-1">{{serverIp}}</div>
  </a>
</template>

<script lang="ts">
import Vue from 'vue';
import keys from '@/keys';

export default Vue.extend({
  name: 'Minecraft',
  props: {},
  data() {
    return {
      link: '',
      players: 0,
      maxPlayers: 0,
      serverIp: 'vyst.westus.cloudapp.azure.com',
      highlight: false,
      intervalHolder: 0,
      delayBetweenUpdates: 60000,
    };
  },
  methods: {
    updateTile() {
      const self = this;
      const request = new XMLHttpRequest();
      request.open('GET', `https://api.mcsrvstat.us/2/${self.serverIp}`, true);
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          const r = JSON.parse(request.response);
          const currentPlayers = r.players.online;
          if (self.players !== currentPlayers || self.maxPlayers !== r.players.max) {
            self.addShine();
            self.players = currentPlayers;
            self.maxPlayers = r.players.max;
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
