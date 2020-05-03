<template>
  <a
    target="_blank"
    :href="trackInfo.link"
    class="w-full h-full bg-white text-center m-0 rounded shadow-md flex flex-col"
    :class="{ shiny: highlight }"
  >
    <div class="text-teal-500 h-24 mt-4 flex flex-col justify-center">
      <div class="text-lg">{{trackInfo.name}}</div>
    </div>
    <span class="text-base text-gray-500 align-middle mt-1">{{trackInfo.artist}}</span>
    <div class="">
      <div class="text-sm text-gray-700 mb-1">Last.fm</div>
      <div v-if='trackInfo.nowPlaying' class="ripple absolute"><div></div><div></div></div>
    </div>
  </a>
</template>

<script lang="ts">
import Vue from 'vue';
import keys from '@/keys';

export default Vue.extend({
  name: 'Lastfm',
  props: {
    tileProps: Object,
  },
  data() {
    return {
      trackInfo: {
        art: '',
        name: '',
        artist: '',
        nowPlaying: false,
        link: '',
      },
      highlight: false,
      intervalHolder: 0,
      delayBetweenUpdates: 60000,
    };
  },
  methods: {
    updateTile() {
      const self = this;
      const request = new XMLHttpRequest();
      request.open('GET', `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${self.tileProps.user}&api_key=${keys.Lastfm}&format=json&limit=1`, true);
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          const r = JSON.parse(request.response);
          const currentTrack = r.recenttracks.track[0];
          if (self.trackInfo.name !== currentTrack.name) {
            self.addShine();
            // eslint-disable-next-line prefer-destructuring
            self.trackInfo.art = currentTrack.image[1]['#text'];
            self.trackInfo.name = currentTrack.name;
            self.trackInfo.artist = currentTrack.artist['#text'];
            self.trackInfo.link = currentTrack.url;
          }
          if (currentTrack['@attr']) {
            self.trackInfo.nowPlaying = currentTrack['@attr'].nowplaying;
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
