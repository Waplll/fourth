import { createStore } from 'vuex';
import axios from 'axios';

// Используем прокси для разработки
axios.defaults.baseURL = '/api-shop';

export default createStore({
  state: {
    user: null,
    cart: [],
    orders: [],
    products: [] // Список товаров
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    ADD_TO_CART(state, product) {
      const existingItem = state.cart.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },
    REMOVE_FROM_CART(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId);
    },
    CLEAR_CART(state) {
      state.cart = [];
    },
    ADD_ORDER(state, order) {
      state.orders.push(order);
    },
    LOGOUT(state) {
      state.user = null;
      state.cart = [];
    },
    SET_PRODUCTS(state, products) {
      state.products = products;
    }
  },
  actions: {
    login({ commit }, user) {
      commit('SET_USER', user);
    },
    logout({ commit }) {
      commit('LOGOUT');
    },
    addToCart({ commit }, product) {
      commit('ADD_TO_CART', product);
    },
    removeFromCart({ commit }, productId) {
      commit('REMOVE_FROM_CART', productId);
    },
    clearCart({ commit }) {
      commit('CLEAR_CART');
    },
    addOrder({ commit, state }) {
      const order = { items: [...state.cart], date: new Date().toISOString() };
      commit('ADD_ORDER', order);
      commit('CLEAR_CART');
    },
    fetchProducts({ commit }) {
      return axios
          .get('/products') // Теперь используем относительный путь
          .then(response => {
            commit('SET_PRODUCTS', response.data);
          })
          .catch(error => {
            console.error('Ошибка при загрузке товаров:', error);
            if (error.response) {
              throw new Error(`Сервер вернул ошибку: ${error.response.status}`);
            } else if (error.request) {
              throw new Error('Не удалось связаться с сервером. Проверьте подключение.');
            } else {
              throw new Error('Произошла неизвестная ошибка. Попробуйте позже.');
            }
          });
    }
  }
});