<template>
  <div class="h-full">
    <div
      v-if="showPicker === true"
      class="blur absolute z-10 h-full w-full"
      @click="quitPicker($event)"
    >
      <div
        v-if="showPicker === true"
        class="z-20 container mx-auto bg-gray-100 rounded max-w-lg p-8 mt-8 shadow-lg"
      >
        <h3
          class="block text-gray-700 text-lg font-bold mb-4 ml-6"
        >Pick a tile for slot {{currentTileIndex}}</h3>
        <ul class="list-none flex flex-row flex-wrap justify-around my-4">
          <li
            class="text-teal-500 text-base h-16 w-2/5 p-4 m-2 bg-white text-center rounded shadow cursor-pointer"
            v-for="tileName in Object.keys(templates)"
            :key="tileName"
            @click="confirmTile(tileName)"
          >{{tileName}}</li>
        </ul>
      </div>
    </div>
    <div
      v-if="showConfirm === true"
      class="blur absolute z-10 h-full w-full"
      @click="quitConfirm($event)"
    >
      <div
        v-if="showConfirm === true"
        class="z-20 container mx-auto bg-gray-100 rounded max-w-lg p-8 mt-8 shadow-lg"
      >
        <h3 class="block text-gray-700 text-lg font-bold mb-4">{{addTileName}}</h3>
        <div v-if="formError !== ''" class="mb-4">
          <ul class="text-red-500 font-bold">
            <li v-for="error in formError" :key="error">{{error}}</li>
          </ul>
        </div>
        <div v-for="field in Object.keys(templates[addTileName])" :key="field">
          <div
            v-if="field === 'info'"
            class="text-base text-gray-500 mb-4"
          >{{templates[addTileName].info}}</div>
          <div v-else>
            <div class="flex flex-row justify-between">
              <label class="block text-gray-700 text-lg" :for="field">{{field}}</label>
              <aside class="text-sm text-gray-500">{{templates[addTileName][field].description}}</aside>
            </div>
            <input
              :id="field"
              :placeholder="templates[addTileName][field].example"
              v-model="formData[field]"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2 mb-4"
              required
            />
          </div>
        </div>
        <button
          @click="validateForm()"
          class="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >Add Tile</button>
      </div>
    </div>

    <div class="flex z-0" :class="justify" v-for="rkey in rows" :key="rkey">
      <TileSlot
        v-for="ckey in columns"
        :key="ckey"
        :tile="tileObject[((rkey-1)*columns) + ckey-1]"
        @addTile="pickTile(((rkey-1)*columns) + ckey-1)"
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

const tileTemplates = require('@/tiles.json').tiles;

export default Vue.extend({
  name: 'Grid',
  props: {},
  components: {
    TileSlot,
  },
  data() {
    return {
      templates: {} as any,
      justify: 'justify-center',
      tileObject: [] as any,
      activeTiles: [] as any,
      rows: 0,
      columns: 0,
      showPicker: false,
      showConfirm: false,
      currentTileIndex: 0,
      addTileName: '',
      formData: {},
      formError: [] as any,
    };
  },
  methods: {
    // shows the inital modal for picking a tile
    pickTile(tileIndex: number) {
      this.currentTileIndex = tileIndex;
      this.showPicker = true;
    },
    // shows the modal for filling out tile info
    confirmTile(tileName: any) {
      this.showPicker = false;
      this.showConfirm = true;
      this.addTileName = tileName;
    },
    // checks to make sure all the required fields for the current tile are filled
    validateForm() {
      // get a list of the fields that this tile is supposed to have and remove the info field
      let fieldList = Object.keys(this.templates[this.addTileName]);
      fieldList = fieldList.filter(field => field !== 'info');

      // get a list of the fields currently in the form
      const currentFields = Object.keys(this.formData);
      this.formError = [];

      // for each field that should be filled:
      fieldList.forEach((field) => {
        // if it's not filled, add the name of the field to the list of errors to display
        if (!currentFields.includes(field)) {
          this.formError.push(`missing ${field}`);
        }
      });

      // if there are no errors, insert the tile into the db
      if (this.formError.length === 0) {
        this.insertTile();
        this.showConfirm = false;
      }
    },
    // inserts new, validated tiles into the db
    insertTile() {
      const { currentUser } = firebase.auth();
      if (currentUser) {
        // insert tile name and index
        firebase
          .database()
          .ref(`/users/${currentUser.uid}/tiles/${this.addTileName}/`)
          .set({ index: this.currentTileIndex });

        // if the tile has props (not all do) insert those under the tile
        if (this.formData) {
          firebase
            .database()
            .ref(`/users/${currentUser.uid}/tiles/${this.addTileName}/props`)
            .set(this.formData);
        }

        // refresh the grid
        this.updateGrid();
      }
    },
    // closes out of the initial picker modal
    quitPicker(event: any) {
      if (event.target.parentElement === this.$el) {
        this.showPicker = false;
      }
    },
    // closes out of the confirmation modal
    quitConfirm(event: any) {
      if (event.target.parentElement === this.$el) {
        this.showConfirm = false;
      }
    },
    // fetches and displays tiles from the db
    updateGrid() {
      const inTemplates = tileTemplates;
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

                // if the user already has tiles
                if (tiles) {
                  // create filtered list of tiles the user can add (no dupes allowed at this time)
                  self.activeTiles = Object.keys(tiles);
                  const filteredTemplates = Object.fromEntries(
                    Object.entries(inTemplates).filter(
                      ([key, val]) => !this.activeTiles.includes(key),
                    ),
                  );
                  this.templates = filteredTemplates;

                  // construct the tile object used by vue
                  const tileArray = Object.keys(tiles).map(key => [
                    key,
                    tiles[key],
                  ]);
                  tileArray.sort((a, b) => a[1].index - b[1].index);

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
                } else {
                  this.templates = inTemplates;
                }
              });
          });
      }
    },
  },
  // called when this component is mounted to the page
  mounted() {
    // update the grid
    this.updateGrid();
  },
});
</script>

<style scoped>
div.blur {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
