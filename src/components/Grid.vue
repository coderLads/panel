<template>
  <div class="h-full">
    <div v-if="showPicker === true" class="blur absolute z-10 h-full w-full" @click="quitModal($event)">
      <div
        v-if="showPicker === true"
        class="z-20 container mx-auto bg-white rounded max-w-lg p-8 mt-8 opacity-100"
      >
        <h3 class="block text-gray-700 text-lg font-bold mb-4"> Pick a tile for slot {{currentTileIndex}}</h3>
      </div>
    </div>

    <div class="flex z-0" :class="justify" v-for="rkey in rows" :key="rkey">
      <TileSlot
        v-for="ckey in columns"
        :key="ckey"
        :tile="tileObject[((rkey-1)*columns) + ckey-1]"
        @addTile="addTile(((rkey-1)*columns) + ckey-1)"
      />
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
      showPicker: false,
      currentTileIndex: 0,
    };
  },
  methods: {
    addTile(tileIndex: number) {
      console.log(tileIndex);
      this.currentTileIndex = tileIndex;
      this.showPicker = true;
    },
    quitModal(event: any) {
      if (event.target.parentElement === this.$el) {
        this.showPicker = false;
      }
    },
  },
  mounted() {
    const self = this;
    const { currentUser } = firebase.auth();
    if (currentUser) {
      // fetch the user's settings
      firebase
        .database()
        .ref(`/users/${currentUser.uid}`)
        .once('value', (settingsSnapshot) => {
          const result = settingsSnapshot.val();
          this.rows = result.rows;
          this.columns = result.columns;

          // fetch the user's tiles
          firebase
            .database()
            .ref(`/users/${currentUser.uid}/tiles/`)
            .orderByChild('index')
            .once('value', (tileSnapshot) => {
              this.tileObject = [];
              const tiles = tileSnapshot.val();
              const tileArray = Object.keys(tiles).map(key => [
                key,
                tiles[key],
              ]);
              tileArray.sort((a, b) => a[1].index - b[1].index);

              // construct the tile object used by vue
              let j = 0;
              for (let i = 0; i < this.rows * this.columns; i += 1) {
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

<style scoped>
div.blur {
    background-color: rgba(0, 0, 0, .5);
}
</style>
