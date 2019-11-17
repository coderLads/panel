<template>
  <div
    :style="{ backgroundImage: `url(${this.url})` }"
    class="h-full flex flex-col pt-16"
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
      url: 'https://source.unsplash.com/random/1920x1080?earth,nature',
    };
  },
});
</script>
