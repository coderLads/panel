<template>
  <a
    :href="link"
    target="_blank"
    class="w-full h-full bg-white text-center m-0 rounded shadow-md flex flex-col"
    :class="{ shiny: highlight }"
  >
    <div class="text-teal-500 mt-4 flex flex-row justify-center">
      <p class="text-4xl">{{ days }}</p>
    </div>
    <span class="text-base text-gray-500 mt-1 align-middle">Days Watched</span>
    <div class="text-sm text-gray-700 mt-1">Anilist</div>
  </a>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Anilist',
  props: {},
  data() {
    return {
      link: '',
      days: 0,
      username: 'Badtz',
      highlight: false,
      intervalHolder: 0,
      delayBetweenUpdates: 600000,
    };
  },
  methods: {
    updateTile() {
      const self = this;
      const variables = {
        username: this.username,
      };

      const url = 'https://graphql.anilist.co';
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          query: `
            query ($username: String) {
              User(name: $username) {
                statistics {
                  anime {
                    minutesWatched
                  }
                }
              }
            }`,
          variables,
        }),
      };

      fetch(url, options).then(response => response.json().then(json => (response.ok ? json : Promise.reject(json))))
        .then((data) => {
          const newDays = parseFloat((data.data.User.statistics.anime.minutesWatched / 60 / 24).toFixed(2));
          if (self.days !== newDays) {
            self.addShine();
            self.days = newDays;
          }
        });
    },
    addShine() {
      this.highlight = true;
      setTimeout(() => {
        this.highlight = false;
      }, 5000);
    },
  },
  mounted() {
    this.link = `https://anilist.co/user/${this.username}`;
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
