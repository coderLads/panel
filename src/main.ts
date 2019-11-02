
import firebase from 'firebase';
import Vue from 'vue';
import App from './App.vue';
import config from './firebaseConfig';
import './registerServiceWorker';
import router from './router';


firebase.initializeApp(config);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
