<template>
  <a
    target="_blank"
    class="w-full h-full bg-white text-center m-0 rounded shadow-md flex flex-col"
    :class="{ shiny: highlight }"
    href="https://ankiweb.net/decks/"
  >
    <div class="text-teal-500 mt-4 flex flex-row justify-center">
      <p class="text-4xl">{{todayReviews}}</p>
    </div>
    <span class="text-base text-gray-500 mt-1 align-middle">{{status}}</span>
    <div class="text-sm text-gray-700 mt-1">Anki</div>
  </a>
</template>

<script lang="ts">
import Vue from 'vue';

const abbreviate = require('number-abbreviate');

export default Vue.extend({
  name: 'Anki',
  props: {
    tileProps: Object,
  },
  data() {
    return {
      todayReviews: '0',
      highlight: false,
      status: 'Reviews Today',
      intervalHolder: 0,
      delayBetweenUpdates: 60000,
    };
  },
  methods: {
    invokeAnki(action:any, version:any, params:any = {}) {
      const self = this;
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
          try {
            const response = JSON.parse(xhr.responseText);
            if (response.error) {
              throw response.error;
            }
            resolve(response.result);
          } catch (e) {
            reject(e);
          }
        });

        xhr.open('POST', 'http://127.0.0.1:8765');
        xhr.send(JSON.stringify({ action, version, params }));
        xhr.onerror = () => {
          console.log('Could not connect to anki');
          self.delayBetweenUpdates = 600000;
          self.addShine();
          self.status = 'Offline';
        };
      });
    },
    async updateTile() {
      const self = this;
      const result:any = await self.invokeAnki('getNumCardsReviewedToday', 6);
      if (self.todayReviews !== result.toString()) {
        self.addShine();
        self.todayReviews = result.toString();
      }
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
