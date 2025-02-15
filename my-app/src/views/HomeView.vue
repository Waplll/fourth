<template>
  <div class="home">
    <h1>Каталог товаров</h1>
    <ProductList :products="products" @add-to-cart="addToCart" />
    <button @click="goToCart">Перейти в корзину</button>
    <button @click="goToOrders" v-if="user">Мои заказы</button>
  </div>
</template>

<script>
import ProductList from '@/components/ProductList.vue';

export default {
  components: { ProductList },
  computed: {
    products() {
      return this.$store.state.products;
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
    this.$store.dispatch('fetchProducts');
  }
};
</script>