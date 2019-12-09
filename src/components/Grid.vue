<template>
  <div class="h-full">
    <div class="flex" :class="justify" v-for="(r, rkey) in tileData" :key="rkey">
      <TileSlot v-for="(i, ikey) in r" :key="ikey" :tile="i"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import TileSlot from '@/components/TileSlot.vue';

export default Vue.extend({
  name: 'Grid',
  props: {},
  components: {
    TileSlot,
  },
  data() {
    return {
      justify: 'justify-center',
      tileData: [ // this defines what is on the grid
        ['PiHole', 'WeatherTile', 'Clock', 'VodeVoice'],
        ['Anilist', 'Minecraft', 'MoonPhase', null],
        [null, null, null, null],
      ],
      tileObject: [] as any,
      rows: 0,
      columns: 0,
    };
  },
  mounted() {
    const self = this;
    const { currentUser } = firebase.auth();
    if (currentUser) {
      // fetch the user's settings
      firebase.database().ref(`/users/${currentUser.uid}`).once('value', (settingsSnapshot) => {
        const result = settingsSnapshot.val();
        this.rows = result.rows;
        this.columns = result.columns;

        // fetch the user's tiles
        firebase.database().ref(`/users/${currentUser.uid}/tiles`).orderByChild('index').once('value', (tileSnapshot) => {
          const tiles = tileSnapshot.val();
          // console.log(tiles);
          // construct the tile object used by vue
          let j = 0;
          for (let i = 0; i < (this.rows * this.columns); i += 1) {
            if (tiles[j].index === i) {
              this.tileObject.push(tiles[j]);
              j += 1;
            } else {
              this.tileObject.push(null);
            }
          }
        });
      });
    }
  },
});
</script>
