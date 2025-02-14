import { createStore } from 'vuex';
import axios from 'axios';

// Создание экземпляра Axios
const instance = axios.create({
    baseURL: '/api-shop',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true
});

export default createStore({
    state: {
        user: null,
        cart: [], // Состояние корзины
        orders: [],
        products: [],
        error: null,
        loading: false,
        userToken: null
    },
    mutations: {
        SET_PRODUCTS(state, products) {
            state.products = products;
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
        UPDATE_QUANTITY(state, { id, quantity }) {
            const item = state.cart.find(item => item.id === id);
            if (item) {
                item.quantity = quantity > 0 ? quantity : 1; // Минимальное количество = 1
            }
        },
        CLEAR_CART(state) {
            state.cart = [];
        },
        SET_ERROR(state, message) {
            state.error = message;
        },
        SET_LOADING(state, status) {
            state.loading = status;
        },
        SAVE_ORDER(state, order) {
            state.orders.push(order);
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
        },
        addToCart({ commit }, product) {
            commit('ADD_TO_CART', product);
        },
        removeFromCart({ commit }, productId) {
            commit('REMOVE_FROM_CART', productId);
        },
        updateQuantity({ commit }, payload) {
            commit('UPDATE_QUANTITY', payload);
        },
        clearCart({ commit }) {
            commit('CLEAR_CART');
        },
        checkout({ commit, state }) {
            return instance.post('/auth/order', {
                items: state.cart.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                }))
            })
                .then(response => {
                    const order = {
                        date: new Date().toISOString(),
                        items: state.cart.map(item => ({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            quantity: item.quantity
                        }))
                    };
                    commit('SAVE_ORDER', order); // Сохраняем заказ
                    commit('CLEAR_CART'); // Очищаем корзину
                    return response.data;
                })
                .catch(error => {
                    console.error('Ошибка при оформлении заказа:', error);
                    throw new Error(error.response?.data?.message || 'Произошла ошибка при оформлении заказа.');
                });
        },
    }
});