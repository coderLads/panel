<template>
  <a
    :href='link'
    target="_blank"
    class="w-full h-full bg-white text-center m-0 rounded shadow-md flex flex-col"
    :class="{ shiny: highlight }"
  >
  <!-- <img :src="iconurl" class='block text-center w-12 h-12' style='margin: 0 auto; margin-bottom: -.75rem'> -->
    <div class="text-teal-500 mt-4 flex flex-row justify-center">
      <p class="text-4xl">{{price}}</p>
    </div>
    <span class="text-base text-gray-500 mt-1 align-middle">{{tileProps.currency.toUpperCase()}}</span>
    <div class="text-sm text-gray-700 mt-1">{{tileProps.coin.toUpperCase()}} Price</div>
  </a>
</template>

<script lang="ts">
import Vue from 'vue';
import keys from '@/keys';

export default Vue.extend({
  name: 'Crypto',
  props: {
    tileProps: Object,
  },
  data() {
    return {
      link: '',
      price: 0,
      highlight: false,
      intervalHolder: 0,
      delayBetweenUpdates: 30000,
    };
  },
  methods: {
    updateTile() {
      const self = this;
      const request = new XMLHttpRequest();
      request.open('GET', `https://bravenewcoin-v1.p.rapidapi.com/ticker?show=${self.tileProps.currency}&coin=${self.tileProps.coin}`, true);
      request.setRequestHeader('x-rapidapi-host', 'bravenewcoin-v1.p.rapidapi.com');
      request.setRequestHeader('x-rapidapi-key', keys.RapidAPI);
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          const r = JSON.parse(request.response);
          const currentPrice = Math.round(r.last_price);

          if (self.price !== currentPrice) {
            self.addShine();
            self.price = currentPrice;
          }
          self.link = 'https://www.coinbase.com/price/';
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
