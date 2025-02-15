import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import MainView from '@/views/MainView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import CartView from '@/views/CartView.vue';
import OrdersView from '@/views/OrdersView.vue';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/main', name: 'main', component: MainView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/register', name: 'register', component: RegisterView },
  { path: '/cart', name: 'cart', component: CartView },
  { path: '/orders', name: 'orders', component: OrdersView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;