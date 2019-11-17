<template>
  <div class="w-48 h-32 bg-transparent text-center m-4 rounded">
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
