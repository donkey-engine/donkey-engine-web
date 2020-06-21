import Vue from 'vue';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import '@mdi/font/css/materialdesignicons.css';
import axios from 'axios';

import App from './App.vue';
import router from './router';
import store from './store';
import './main.scss';

axios.defaults.baseURL = process.env.VUE_APP_DONKEY_ENGINE_API;

Vue.config.productionTip = false;

Vue.use(Buefy);

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
