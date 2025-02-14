<template>
  <div class="orders">
    <h1>Мои заказы</h1>

    <ul v-if="orders.length">
      <li v-for="(order, index) in orders" :key="index" class="order-item">
        <h3>Заказ #{{ index + 1 }}</h3>
        <p><strong>Дата:</strong> {{ order.date }}</p>
        <ul>
          <li v-for="item in order.items" :key="item.id">
            {{ item.name }} x {{ item.quantity }} = ${{ (item.price * item.quantity).toFixed(2) }}
          </li>
        </ul>
      </li>
    </ul>

    <p v-else>У вас пока нет заказов.</p>

    <button @click="goBack">Назад</button>
  </div>
</template>

<script>
export default {
  computed: {
    orders() {
      return this.$store.state.orders;
    }
  },
  methods: {
    goBack() {
      this.$router.push('/');
    }
  }
};
</script>

<style>
.orders {
  padding: 20px;
}

.order-item {
  margin-bottom: 20px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
}
</style>