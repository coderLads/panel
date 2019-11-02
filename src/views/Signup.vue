<template>
  <div class="sign-up">
    <p>Signup</p>
    <input type="text" v-model="email" placeholder="Email">
    <input type="password" v-model="password" placeholder="Password">
    <button @click="signUp">Sign Up</button>
    <p>or <router-link to="/login">login</router-link>.</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import * as firebase from 'firebase/app';
import 'firebase/auth';

export default Vue.extend({
  name: 'signup',
  components: {
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    signUp() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
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
