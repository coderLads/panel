<template>
  <div class="bg-red-500 flex flex-wrap">
    <div
    v-for="n in count"
    :key="n"
    class="w-1/4 p-2"
    >
      <div class="bg-blue-500 text-center p-2 h-full"> X </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Grid',
  props: {
  },
  data() {
    return {
      count: 12,
    };
  },
});
</script>
