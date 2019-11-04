<template>
  <div>
    <div class="flex justify-center" v-for="r in rows" :key="r">
      <tileSlot v-for="c in cols" :key="c" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import tileSlot from '@/components/TileSlot.vue';

export default Vue.extend({
  name: 'Grid',
  props: {},
  components: {
    tileSlot,
  },
  data() {
    return {
      cols: 4,
      rows: 3,
    };
  },
});
</script>
