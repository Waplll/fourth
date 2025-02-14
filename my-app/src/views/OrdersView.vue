<template>
  <div class="orders">
    <h1>Мои заказы</h1>

    <!-- Список заказов -->
    <ul v-if="orders.length">
      <li v-for="(order, index) in orders" :key="index" class="order-item">
        <h3>Заказ #{{ index + 1 }}</h3>
        <p><strong>Дата:</strong> {{ order.date }}</p>
        <ul>
          <li v-for="item in order.items" :key="item.id" class="order-product">
            <img :src="item.image" :alt="item.name" width="50" height="50" />
            <div class="product-info">
              <p>{{ item.name }} x {{ item.quantity }} = ${{ (item.price * item.quantity).toFixed(2) }}</p>
            </div>
          </li>
        </ul>
        <p><strong>Состояние:</strong> В пути</p>
      </li>
    </ul>

    <!-- Сообщение, если заказов нет -->
    <p v-else>У вас пока нет заказов.</p>

    <!-- Кнопка "Назад" -->
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

.order-product {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.order-product img {
  margin-right: 10px;
  border-radius: 5px;
}

.product-info {
  flex-grow: 1;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #38a169;
}
</style>