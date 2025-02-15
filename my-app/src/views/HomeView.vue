<template>
  <div class="home">
    <h1 class="page-title">Каталог товаров</h1>

    <!-- Отображение сообщения об ошибке -->
    <p v-if="error" class="error">{{ error }}</p>

    <ul v-if="products.length" class="product-list">
      <ProductItem
          v-for="product in products"
          :key="product.id"
          :product="product"
          @add-to-cart="addToCart"
      />
    </ul>

    <!-- Сообщение, если товаров нет -->
    <p v-else-if="!loading" class="empty-products">Товары отсутствуют.</p>

    <!-- Индикатор загрузки -->
    <div v-if="loading" class="loading">Загрузка...</div>
  </div>
</template>

<script>
import ProductItem from '@/components/ProductItem.vue';

export default {
  components: { ProductItem },
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

<style scoped>
.home {
  padding: 20px;
  margin-top: 70px;
}

.page-title {
  margin-top: 0;
}

.product-list {
  list-style: none;
  padding: 0;
}

.empty-products {
  text-align: center;
  font-size: 18px;
  color: gray;
}

.loading {
  font-style: italic;
  color: gray;
  text-align: center;
}
</style>