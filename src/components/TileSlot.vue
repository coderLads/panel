<template>
  <div class="w-48 h-32 bg-transparent text-center m-4 rounded">
    <component v-bind:is="componentFile"></component>
    <div
      v-if="tile === null"
      @click="addTile()"
      class="text-6xl font-hairline text-white h-full rounded border-2 border-white opacity-0 cursor-pointer hover:opacity-100 hover:shadow-lg select-none"
    >
      +
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TileSlot',
  props: {
    tile: String,
  },
  data() {
    return {
    };
  },
  methods: {
    addTile() {

    },
  },
  computed: {
    componentFile() {
      return () => (this.tile ? import(`./tiles/${this.tile}.vue`) : null);
    },
  },
});
</script>

<style scoped>
div {
  transition: opacity ease-in .25s;
}
</style>
