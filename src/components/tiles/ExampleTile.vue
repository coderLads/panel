<template>
  <a href="" target="_blank" class="w-full h-full bg-white text-center m-0 rounded shadow-md flex flex-col">
    <p class="text-4xl text-teal-500 mt-4">10</p>
    <span class="text-base text-gray-500 mt-1">Unread</span>
    <div class="text-sm text-gray-700 mt-1">Example Tile</div>
  </a>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ExampleTile',
  props: {
  },
  data() {
    return {
    };
  },
});
</script>
