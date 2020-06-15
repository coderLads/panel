<template>
  <a
    target="_blank"
    class="w-full h-full bg-white text-center m-0 rounded shadow-md flex flex-col"
    :class="{ shiny: highlight }"
    href="http://proyecto.club"
  >
    <div class="text-teal-500 mt-4 flex flex-row justify-center">
      <p class="text-4xl">{{users}}</p>
    </div>
    <span class="text-base text-gray-500 mt-1 align-middle">Users Online</span>
    <div class="text-sm text-gray-700 mt-1">Proyecto.club</div>
  </a>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Chat',
  props: {
    tileProps: Object,
  },
  data() {
    return {
      users: '0',
      highlight: false,
      intervalHolder: 0,
      delayBetweenUpdates: 60000,
    };
  },
  methods: {
    async updateTile() {
      const self = this;
      const request = new XMLHttpRequest();
      request.open('GET', 'https://cors-anywhere.herokuapp.com/http://proyecto.club/count', true);
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          const r = JSON.parse(request.response);
          const currentUsers = r.users;
          if (self.users !== currentUsers) {
            self.addShine();
            self.users = currentUsers;
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
