<template>
  <div class="order-item">
    <h3>Заказ #{{ index + 1 }}</h3>
    <p><strong>Дата:</strong> {{ formatDate(order.date) }}</p>
    <p><strong>Состояние:</strong> В пути</p>

    <!-- Список товаров в заказе -->
    <ul class="order-products">
      <li v-for="item in order.items" :key="item.id" class="order-product">
        <img :src="item.image" :alt="item.name" width="50" height="50" class="product-image" />
        <div class="product-info">
          <p>{{ item.name }} x {{ item.quantity }} = ${{ (item.price * item.quantity).toFixed(2) }}</p>
        </div>
      </li>
    </ul>

    <!-- Итоговая сумма заказа -->
    <div class="order-total">
      <p><strong>Итого:</strong> ${{ calculateTotal(order).toFixed(2) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
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
    }
  }
};
</script>

<style scoped>
.order-item {
  background-color: #fff;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.order-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.order-products {
  list-style: none;
  padding: 0;
  margin: 15px 0;
}

.order-product {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.product-image {
  border-radius: 5px;
  margin-right: 10px;
}

.product-info {
  flex-grow: 1;
}

.order-total {
  text-align: right;
  font-weight: bold;
}
</style>