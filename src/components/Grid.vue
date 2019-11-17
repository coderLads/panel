<template>
  <div class="h-full">
    <div class="flex justify-center" v-for="(r, rkey) in tileData" :key="rkey">
      <TileSlot v-for="(i, ikey) in r" :key="ikey" :tile="i"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TileSlot from '@/components/TileSlot.vue';


export default Vue.extend({
  name: 'Grid',
  props: {},
  components: {
    TileSlot,
  },
  data() {
    return {
      tileData: [ // this defines what is on the grid
        ['PiHole', 'WeatherTile', 'Clock', 'VodeVoice'],
        [null, null, null, null],
        [null, null, null, null],
      ],
    };
  },
  mounted() {
  },
});
</script>
