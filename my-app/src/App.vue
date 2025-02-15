<template>
  <div id="app">
    <nav class="navbar sticky-navbar">
      <h1 @click="goToHome" class="site-title">Просто купить</h1>
      <div class="auth-actions">
        <button v-if="!user" @click="goToLogin">Войти</button>
        <button v-if="!user" @click="goToRegister">Регистрация</button>
        <button @click="goToCart" class="cart-button">Корзина</button>
        <button v-if="!user" @click="goToOrders" class="orders-button">Мои заказы</button>
        <!-- Приветствие и кнопка выхода для авторизованных пользователей -->
        <span v-if="user">Добро пожаловать, {{ user.email }}!</span>
        <button v-if="user" @click="logout">Выход</button>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/');
    },
    goToLogin() {
      this.$router.push('/login');
    },
    goToRegister() {
      this.$router.push('/register');
    },
    goToCart() {
      this.$router.push('/cart');
    },
    goToOrders() {
      this.$router.push('/orders');
    },
    goToHome() {
      this.$router.push('/');
    }
  }
};
</script>

<style>
/* Фиксация шапки */
.sticky-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: #42b983;
  padding: 10px 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.site-title {
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.3s ease;
}

.site-title:hover {
  color: #38a169;
}

.auth-actions {
  display: flex;
  gap: 10px;
}

.auth-actions button {
  background-color: #2c3e50;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.auth-actions button:hover {
  background-color: #35495e;
}

.auth-actions button.cart-button {
  background-color: #f44336;
}

.auth-actions button.cart-button:hover {
  background-color: #d32f2f;
}

.auth-actions button.orders-button {
  background-color: #ff9800;
}

.auth-actions button.orders-button:hover {
  background-color: #e68700;
}
</style>