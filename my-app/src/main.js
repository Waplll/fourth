import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';

// Настройка Axios
axios.defaults.baseURL = 'https://lifestealer86.ru/api-shop/';

// Глобальный перехватчик ошибок
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            store.dispatch('logout');
            router.push('/login');
        }
        return Promise.reject(error);
    }
);

createApp(App)
    .use(store)
    .use(router)
    .mount('#app');