<template>
  <div class="w-48 h-48 bg-gray-200 text-center m-4 rounded shadow-inner">
    <component v-bind:is="componentFile"></component>
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
  computed: {
    componentFile() {
      return () => (this.tile ? import(`./tiles/${this.tile}.vue`) : null);
    },
  },
});
</script>
