<template>
  <div class="h-full">
    <div class="flex" :class="justify" v-for="rkey in rows" :key="rkey">
      <TileSlot v-for="ckey in columns" :key="ckey" :tile="tileObject[((rkey-1)*columns) + ckey-1]"/>
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
        firebase.database().ref(`/users/${currentUser.uid}/tiles/`).orderByChild('index').once('value', (tileSnapshot) => {
          const tiles = tileSnapshot.val();
          const tileArray = Object.keys(tiles).map(key => [(key), tiles[key]]);
          tileArray.sort((a, b) => a[1].index - b[1].index);

          // construct the tile object used by vue
          let j = 0;
          for (let i = 0; i < (this.rows * this.columns); i += 1) {
            if (tileArray[j][1].index === i) {
              this.tileObject.push(tileArray[j]);
              if (j + 2 > tileArray.length) {
                break;
              }
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
