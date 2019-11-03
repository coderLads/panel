<template>
  <div class="home h-full flex flex-col">
    <div class="container mx-auto max-w-sm shadow-md rounded p-8 m-4">
      <div class="block text-gray-700 text-sm font-bold mb-2"> Signed in as {{ user.email}} </div>
      <button
      class="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      @click="logout">
        Logout
      </button>
    </div>
    <grid />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import grid from '@/components/Grid.vue';

export default Vue.extend({
  name: 'home',
  components: {
    grid,
  },
  data() {
    return {
      user: {},
    };
  },
  methods: {
    logout() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login');
      });
    },
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        console.log(user.uid);
      }
    });
  },
});
</script>
