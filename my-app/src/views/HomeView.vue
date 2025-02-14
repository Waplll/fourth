<template>
  <div class="home">
    <h1>Каталог товаров</h1>

    <!-- Отображение сообщения об ошибке -->
    <p v-if="error" class="error">{{ error }}</p>

    <!-- Список товаров -->
    <ul v-if="products.length">
      <li v-for="product in products" :key="product.id">
        <img :src="product.image" :alt="product.name" width="50" height="50" />
        {{ product.name }} - ${{ product.price }}
        <button @click="addToCart(product)">Добавить в корзину</button>
      </li>
    </ul>

    <!-- Сообщение, если товаров нет -->
    <p v-else-if="!loading">Товары отсутствуют.</p>

    <!-- Индикатор загрузки -->
    <div v-if="loading" class="loading">Загрузка...</div>
  </div>
</template>

<script>
export default {
  computed: {
    products() {
      return this.$store.state.products;
    },
    error() {
      return this.$store.state.error;
    },
    loading() {
      return this.$store.state.loading;
    }
  },
  methods: {
    addToCart(product) {
      this.$store.dispatch('addToCart', product);
    }
  },
  created() {
    this.$store.commit('SET_ERROR', null); // Очистка предыдущих ошибок
    this.$store.dispatch('fetchProducts');
  }
};
</script>

<style>
.error {
  color: red;
  font-weight: bold;
}

.loading {
  font-style: italic;
  color: gray;
}
</style>