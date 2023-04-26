import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './app.vue';
import router from './router';
import './assets/main.scss';

const app = createApp(App);

app.use(createPinia()).use(router).mount('#app');
