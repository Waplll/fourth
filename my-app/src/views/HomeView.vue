<template>
  <div class="home">
    <h1 class="page-title">Каталог товаров</h1>

    <p v-if="error" class="error">{{ error }}</p>

    <div class="product-grid" v-if="products.length">
      <ProductItem
          v-for="product in products"
          :key="product.id"
          :product="product"
          @add-to-cart="addToCart"
      />
    </div>

    <p v-else-if="!loading" class="empty-products">Товары отсутствуют.</p>

    <div v-if="loading" class="loading">Загрузка...</div>

    <button @click="goToCart" class="cart-button">Перейти в корзину</button>

    <button @click="goToOrders" v-if="user" class="orders-button">Мои заказы</button>
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
    },
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    addToCart(product) {
      this.$store.dispatch('addToCart', product);
    },
    goToCart() {
      this.$router.push('/cart');
    },
    goToOrders() {
      this.$router.push('/orders');
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
  margin-top: 70px; /* Отступ для фиксированной шапки */
}

.page-title {
  margin-top: 0;
  font-size: 24px;
  font-weight: bold;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Две колонки */
  gap: 20px;
  margin-top: 20px;
}

.product-item {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 15px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.product-item img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 10px;
}

.product-info {
  margin-top: 10px;
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
  margin-top: 20px;
}

.cart-button, .orders-button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 20px;
  transition: background-color 0.3s ease;
}

.cart-button:hover, .orders-button:hover {
  background-color: #38a169;
}
</style>