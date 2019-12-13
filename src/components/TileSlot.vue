<template>
  <div class="w-48 h-32 bg-transparent text-center m-4 rounded">
    <div
      v-if="tile === undefined || tile === null"
      @click="$emit('addTile')"
      class="tileSlot text-6xl font-hairline text-white h-full rounded border-2 border-white opacity-0 cursor-pointer hover:opacity-100 hover:shadow-lg select-none"
    >
      +
    </div>
    <component v-else :is="componentFile" :tileProps="tile[1].props"></component>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TileSlot',
  props: {
    tile: Array,
  },
  computed: {
    componentFile() {
      return () => (this.tile ? import(`./tiles/${this.tile[0]}.vue`) : null);
    },
  },
});
</script>

<style scoped>
div.tileSlot {
  transition: opacity ease-in .25s;
}
</style>
