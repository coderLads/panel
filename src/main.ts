
import '@/assets/css/ripple.css';
import '@/assets/css/shine.css';
import '@/assets/css/tailwind.css';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import Vue from 'vue';
import App from './App.vue';
import config from './firebaseConfig';
import './registerServiceWorker';
import router from './router';

firebase.initializeApp(config);

Vue.config.productionTip = false;

let app: any;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App),
    }).$mount('#app');
  }
});
