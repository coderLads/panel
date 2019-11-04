<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </div>-->
    <nav class="flex items-center justify-between bg-teal-500 p-4">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <span class="font-semibold text-xl tracking-tight">Panel</span>
      </div>
      <div class="w-full block flex-grow flex items-center w-auto">
        <div class="text-sm flex-grow">
          <router-link
            to="/"
            class="inline-block mt-0 text-teal-200 hover:text-white mr-4"
          >Home</router-link>
        </div>
        <div class="flex">
          <div class="block text-sm px-4 py-2 text-teal-200">{{ user.email}}</div>
          <button
            v-if="Object.keys(user).length != 0"
            class="block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white"
            @click="logout"
          >Logout</button>
        </div>
      </div>
    </nav>
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
    console.log(this.user);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        console.log(user.uid);
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
