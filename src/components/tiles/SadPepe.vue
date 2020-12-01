<template>
  <a
    target="_blank"
    class="w-full h-full bg-white text-center m-0 rounded shadow-md flex flex-col"
    :class="{ shiny: highlight }"
    href="https://sadpepe.net"
  >
    <div class="text-teal-500 mt-4 flex flex-row justify-center">
      <p class="text-3xl">{{live ? 'Online' : 'Offline'}}</p>
    </div>
    <span class="text-base text-gray-500 mt-4 align-middle">
      <div v-if="live === true">{{shortViewers}} viewers</div>
      <div v-else>Hosting {{host}}</div>
    </span>
    <div class="text-sm text-gray-700 mt-1">D.GG</div>
  </a>
</template>

<script lang="ts">
import Vue from 'vue';

const abbreviate = require('number-abbreviate');

export default Vue.extend({
  name: 'DGG',
  props: {
    tileProps: Object,
  },
  data() {
    return {
      joined: '',
      time: '',
      online: '',
      highlight: false,
      intervalHolder: 0,
      delayBetweenUpdates: 600000,
    };
  },
  methods: {
    async updateTile() {
      const self = this;
      const request = new XMLHttpRequest();
      request.open('GET', `https://cors-anywhere.herokuapp.com/https://sadpepe.net/data/${self.tileProps.user}`, true);
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          // const r = JSON.parse(request.response);
          console.log(request.response);
        }
      };
      request.send();
    },
    addShine() {
      this.highlight = true;
      setTimeout(() => { this.highlight = false; }, 5000);
    },
    prettyPrint(milliseconds:any) {
      let bucket = milliseconds;
      // [['days', 86400000], ['hours', 3600000], ['minutes', 60000], ['seconds', 1000]];
      const days = Math.floor(bucket / 86400000);
      bucket -= days * 86400000;
      const hours = Math.floor(bucket / 3600000);
      bucket -= hours * 3600000;
      const minutes = Math.floor(bucket / 60000);
      bucket -= minutes * 60000;
      const seconds = Math.floor(bucket / 1000);
      bucket -= seconds * 1000;
      let returnString = '';
      if (days > 0) {
        returnString += `${days}d `;
      }
      if (hours > 0) {
        returnString += `${hours}h `;
      }
      if (minutes > 0) {
        returnString += `${minutes}m `;
      }
      if (returnString === '') {
        returnString += `${seconds}s `;
      }
      return returnString;
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
