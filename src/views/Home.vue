<template>
  <div
    :style="{ backgroundImage: `url(${this.url})` }"
    class="h-full flex flex-col p-4"
  >
    <grid />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import grid from '@/components/Grid.vue';

export default Vue.extend({
  name: 'Home',
  components: {
    grid,
  },
  data() {
    return {
      url: `https://source.unsplash.com/collection/1053828/${window.innerWidth}x${window.innerHeight}`,
    };
  },
});
</script>
