import { createStore } from 'vuex';
import axios from 'axios';

// Настройка Axios
axios.defaults.baseURL = 'https://lifestealer86.ru/api-shop/';

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
          .get('/products') // Эндпоинт для получения товаров
          .then(response => {
            commit('SET_PRODUCTS', response.data); // Сохраняем товары в состоянии
          })
          .catch(error => {
            console.error('Ошибка при загрузке товаров:', error);
            throw error; // Передаем ошибку дальше
          });
    }
  }
});