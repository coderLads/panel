<template>
  <div class="login">
    <h3> Login </h3>
    <input type="text" v-model="email" placeholder="Email">
    <input type="password" v-model="password" placeholder="Password">
    <button @click="login">Login</button>
    <router-link to="/signup">Sign up</router-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import * as firebase from 'firebase/app';
import 'firebase/auth';

export default Vue.extend({
  name: 'login',
  components: {
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.$router.replace('home');
        },
        (err) => {
          // eslint-disable-next-line no-alert
          alert(`Oops. ${err.message}`);
        },
      );
    },
  },
});
</script>
<style scoped>

</style>
