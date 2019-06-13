import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource';
import router from './router';
import store from './store/global-store';

Vue.use(VueResource);
Vue.http.options.root = process.env.API_URL;

console.log(process.env.API_URL);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});