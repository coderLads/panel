<template>
  <div class="home">
    <div> You're signed in now eeeh </div>
    <button @click="logout">Logout</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import * as firebase from 'firebase/app';
import 'firebase/auth';

export default Vue.extend({
  name: 'home',
  components: {
  },
  methods: {
    logout() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login');
      });
    },
  },
});
</script>
