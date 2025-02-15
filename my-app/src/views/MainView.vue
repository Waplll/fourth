<template>
  <div class="main-view">
    <h1 class="weekly-products-title">Товары недели</h1>

    <div class="weekly-products-grid">
      <ProductItem
          v-for="product in weeklyProducts"
          :key="product.id"
          :product="product"
          @add-to-cart="addToCart"
      />
    </div>

    <button @click="goToCatalog" class="catalog-button">Каталог товаров</button>
  </div>
</template>

<script>
import ProductItem from '@/components/ProductItem.vue';

export default {
  components: { ProductItem },
  computed: {
    allProducts() {
      return this.$store.state.products;
    },
    weeklyProducts() {
      const shuffled = [...this.allProducts].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, 4);
    }
  },
  methods: {
    addToCart(product) {
      this.$store.dispatch('addToCart', product);
    },
    goToCatalog() {
      this.$router.push('/');
    }
  },
  created() {
    if (!this.allProducts.length) {
      this.$store.dispatch('fetchProducts');
    }
  }
};
</script>

<style scoped>
.main-view {
  padding: 20px;
  margin-top: 70px; /* Отступ для фиксированной шапки */
  text-align: center;
}

.weekly-products-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

/* Сетка для товаров недели */
.weekly-products-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Две колонки для товаров */
  gap: 20px;
  margin-bottom: 40px;
}

.catalog-button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.catalog-button:hover {
  background-color: #38a169;
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}
</style>