import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';

// Set the base URL globally for Axios
axios.defaults.baseURL = 'http://localhost:3000';  // Make sure this points to your backend

// Create the Vue app and set axios globally
const app = createApp(App);
app.config.globalProperties.$axios = axios; // You can now access this.$axios anywhere in your app

app.use(router);
app.mount('#app');
