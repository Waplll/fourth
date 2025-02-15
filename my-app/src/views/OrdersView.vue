<template>
  <div class="orders-view">
    <h1>Мои заказы</h1>

    <!-- Сообщение, если заказов нет -->
    <p v-if="!orders.length" class="empty-orders">У вас пока нет заказов.</p>

    <!-- Список заказов -->
    <ul v-else class="orders-list">
      <li v-for="(order, index) in orders" :key="index" class="order-item">
        <h3>Заказ #{{ index + 1 }}</h3>
        <p><strong>Дата:</strong> {{ formatDate(order.date) }}</p>
        <p><strong>Состояние:</strong> В пути</p>

        <!-- Товары в заказе -->
        <ul class="order-products">
          <li v-for="item in order.items" :key="item.id" class="order-product">
            <img :src="item.image" :alt="item.name" width="50" height="50" />
            <div class="product-info">
              <p>{{ item.name }} x {{ item.quantity }} = ${{ (item.price * item.quantity).toFixed(2) }}</p>
            </div>
          </li>
        </ul>

        <!-- Итоговая сумма заказа -->
        <p class="order-total"><strong>Итого:</strong> ${{ calculateTotal(order).toFixed(2) }}</p>
      </li>
    </ul>

    <!-- Кнопка "Назад" -->
    <button @click="goBack" class="back-button">Назад</button>
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
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    calculateTotal(order) {
      return order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    goBack() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.orders-view {
  padding: 20px;
  margin-top: 70px; /* Отступ для фиксированной шапки */
}

.orders-list {
  list-style: none;
  padding: 0;
}

.order-item {
  background-color: #fff;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.order-product {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.order-product img {
  margin-right: 10px;
  border-radius: 5px;
}

.order-total {
  text-align: right;
  font-weight: bold;
}

.empty-orders {
  text-align: center;
  font-size: 18px;
  color: gray;
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