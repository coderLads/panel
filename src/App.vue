<template>
  <div id="app" class="">
    <div v-if="Object.keys(user).length != 0"
      class="bg-transparent p-4 absolute w-auto right-0"
    >
      <button
        class="block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white"
        @click="logout"
      >Logout</button>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import * as firebase from 'firebase/app';
import 'firebase/auth';

export default Vue.extend({
  name: 'App',
  components: {},
  data() {
    return {
      user: {},
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace('login');
        });
    },
  },
  mounted() {
    // keep the user data stored in vue
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        // console.log(user.uid);
      } else {
        this.user = {};
      }
    });
  },
});
</script>

<style>
html,
body,
#app {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>
