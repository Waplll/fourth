<template>
  <div class="orders-view">
    <h1>Мои заказы</h1>
    <OrderSummary />
    <button @click="goBack" class="back-button">Назад</button>
  </div>
</template>

<script>
import OrderSummary from '@/components/OrderSummary.vue';

export default {
  components: { OrderSummary },
  methods: {
    goBack() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.orders-view {
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