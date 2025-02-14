<template>
  <div id="app">
    <nav class="navbar">
      <h1>Просто купить</h1>
      <div class="auth-actions">
        <button v-if="!user" @click="goToLogin">Войти</button>
        <button v-if="!user" @click="goToRegister">Регистрация</button>
        <button @click="goToCart">Корзина</button>
        <button v-if="!user" @click="goToOrders">Мои заказы</button>
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
    }
  }
};
</script>

<style>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
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