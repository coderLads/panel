<template>
  <div class="home flex flex-col">
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
});
</script>
