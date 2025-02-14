<template>
  <div class="home">
    <h1>Каталог товаров</h1>

    <!-- Отображение сообщения об ошибке -->
    <p v-if="error" class="error">{{ error }}</p>

    <!-- Список товаров -->
    <ul v-if="products.length">
      <li v-for="product in products" :key="product.id" class="product-item">
        <img
            :src="product.image"
            :alt="product.name"
            width="100"
            height="100"
        />
        <div class="product-info">
          <h3>{{ product.name }}</h3>
          <p>{{ product.description }}</p>
          <p><strong>Цена:</strong> ${{ product.price.toFixed(2) }}</p>
          <button @click="addToCart(product)">Добавить в корзину</button>
        </div>
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
.home {
  padding: 20px;
}

.product-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
}

.product-item img {
  margin-right: 15px;
  border-radius: 5px;
}

.product-info {
  flex-grow: 1;
}

.error {
  color: red;
  font-weight: bold;
}

.loading {
  font-style: italic;
  color: gray;
}
</style>