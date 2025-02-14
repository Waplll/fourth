import { createStore } from 'vuex';
import axios from 'axios';

// Создание экземпляра Axios
const instance = axios.create({
  baseURL: '/api-shop', // Используем прокси
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
});

export default createStore({
  state: {
    user: null,
    cart: [],
    orders: [],
    products: [], // Список товаров
    error: null, // Состояние для ошибок
    loading: false // Состояние загрузки
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_ERROR(state, message) {
      state.error = message;
    },
    SET_LOADING(state, status) {
      state.loading = status;
    }
  },
  actions: {
    fetchProducts({ commit }) {
      commit('SET_LOADING', true); // Начинаем загрузку
      return instance
          .get('/products') // Запрос к эндпоинту /products
          .then(response => {
            const products = response.data.data.map(product => ({
              ...product,
              image: product.image && product.image.trim() !== ''
                  ? `http://lifestealer86.ru/${product.image}` // Преобразуем относительный путь в абсолютный
                  : 'https://via.placeholder.com/100' // Заглушка для отсутствующих изображений
            }));
            commit('SET_PRODUCTS', products);
          })
          .catch(error => {
            console.error('Ошибка при загрузке товаров:', error);
            let errorMessage = 'Не удалось загрузить товары.';
            if (error.response) {
              errorMessage = `Сервер вернул ошибку: ${error.response.status}`;
            } else if (error.request) {
              errorMessage = 'Не удалось связаться с сервером. Проверьте подключение.';
            }
            commit('SET_ERROR', errorMessage);
          })
          .finally(() => {
            commit('SET_LOADING', false); // Завершаем загрузку
          });
    }
  }
});
