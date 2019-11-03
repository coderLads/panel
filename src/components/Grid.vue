<template>
  <div class="bg-teal-300 flex flex-wrap justify-center">
    <tile
    v-for="n in count"
    :key="n"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import tile from '@/components/Tile.vue';

export default Vue.extend({
  name: 'Grid',
  props: {
  },
  components: {
    tile,
  },
  data() {
    return {
      count: 12,
    };
  },
});
</script>
