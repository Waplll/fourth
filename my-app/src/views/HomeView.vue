<template>
  <div class="home">
    <h1>Каталог товаров</h1>
    <button v-if="user" @click="logout">Выход</button>
    <button v-else @click="goToLogin">Войти</button>
    <button v-if="!user" @click="goToRegister">Регистрация</button>
    <button v-if="user" @click="goToOrders">Мои заказы</button>

    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.name }} - ${{ product.price }}
        <button v-if="user" @click="addToCart(product)">Добавить в корзину</button>
      </li>
    </ul>

    <button @click="goToCart">Перейти в корзину</button>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user;
    },
    products() {
      return this.$store.state.products;
    }
  },
  methods: {
    addToCart(product) {
      this.$store.dispatch('addToCart', product);
    },
    goToLogin() {
      this.$router.push('/login');
    },
    goToRegister() {
      this.$router.push('/register');
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/');
    },
    goToCart() {
      this.$router.push('/cart');
    },
    goToOrders() {
      this.$router.push('/orders');
    }
  },
  created() {
    this.$store.dispatch('fetchProducts'); // Загрузка товаров при создании компонента
  }
};
</script>