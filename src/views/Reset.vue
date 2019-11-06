<template>
  <div class="container mx-auto max-w-sm bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-8">
    <h3 class="block text-gray-700 text-lg font-bold mb-4"> Reset Password </h3>
    <div class="mb-4">
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="email"
        type="text"
        placeholder="Email"
        v-model="email"
      />
    </div>
    <div class="flex items-center justify-between">
      <button
        class="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        @click="resetPassword">
      Send Reset Email
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import * as firebase from 'firebase/app';
import 'firebase/auth';

export default Vue.extend({
  name: 'reset',
  components: {},
  data() {
    return {
      email: '',
    };
  },
  methods: {
    resetPassword() {
      firebase.auth().sendPasswordResetEmail(this.email).then(() => {
        // eslint-disable-next-line no-alert
        alert('Sent password reset request to email');
        this.$router.replace('login');
      }).catch((err) => {
        // eslint-disable-next-line no-alert
        alert(`Oops. ${err.message}`);
      });
    },
  },
});
</script>
