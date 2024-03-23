import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import axios from 'axios'
import VueAxios from 'vue-axios'
import '@/assets/scss/main.scss';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

const pinia = createPinia()
createApp(App).use(router).use(pinia).use(VueAxios, axios).use(autoAnimatePlugin).mount('#app')

