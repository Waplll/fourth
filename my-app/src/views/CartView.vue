<template>
  <div class="cart-view">
    <h1>Корзина</h1>
    <CartSummary />
    <button @click="goBack" class="back-button">Назад</button>
  </div>
</template>

<script>
import CartSummary from '@/components/CartSummary.vue';

export default {
  components: { CartSummary },
  methods: {
    goBack() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.cart-view {
  padding: 20px;
  text-align: center;
}

.back-button {
  background-color: #2c3e50;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 20px;
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background-color: #35495e;
}
</style>