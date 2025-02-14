<template>
  <div id="app">
    <nav class="navbar sticky-navbar">
      <h1>Просто купить</h1>
      <div class="auth-actions">
        <button v-if="!user" @click="goToLogin">Войти</button>
        <button v-if="!user" @click="goToRegister">Регистрация</button>
        <button @click="goToCart" class="cart-button">Корзина</button>
        <button v-if="!user" @click="goToOrders" class="orders-button">Мои заказы</button>
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
    }
  }
};
</script>

<style>
/* Фиксация шапки */
.sticky-navbar {
  position: fixed; /* Фиксированное положение */
  top: 0; /* Прикрепляем к верху экрана */
  left: 0;
  right: 0;
  z-index: 1000; /* Устанавливаем высокий z-index, чтобы шапка была поверх других элементов */
  background-color: #42b983; /* Цвет фона */
  padding: 10px 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Добавляем тень для лучшего визуального эффекта */
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

/* Стиль для кнопки "Корзина" */
.auth-actions button.cart-button {
  background-color: #f44336; /* Красный цвет */
}

.auth-actions button.cart-button:hover {
  background-color: #d32f2f; /* Тёмно-красный при наведении */
}

/* Стиль для кнопки "Мои заказы" */
.auth-actions button.orders-button {
  background-color: #ff9800; /* Оранжевый цвет */
}

.auth-actions button.orders-button:hover {
  background-color: #e68700; /* Тёмно-оранжевый при наведении */
}
</style>