<template>
  <div class="cart-view">
    <h1>Корзина</h1>

    <p v-if="!cart.length" class="empty-cart">Ваша корзина пуста.</p>

    <!-- Список товаров в корзине -->
    <ul v-else class="cart-items">
      <li v-for="item in cart" :key="item.id" class="cart-item">
        <img :src="item.image" :alt="item.name" width="80" height="80" />
        <div class="item-info">
          <h3>{{ item.name }}</h3>
          <p><strong>Цена:</strong> ${{ item.price.toFixed(2) }}</p>
          <p><strong>Количество:</strong></p>
          <button @click="decreaseQuantity(item.id)" class="quantity-button">-</button>
          <span class="quantity">{{ item.quantity }}</span>
          <button @click="increaseQuantity(item.id)" class="quantity-button">+</button>
        </div>
        <button @click="removeFromCart(item.id)" class="remove-button">Удалить</button>
      </li>
    </ul>

    <!-- Итоговая сумма -->
    <div v-if="cart.length" class="cart-total">
      <h3>Итого: ${{ total.toFixed(2) }}</h3>
      <button @click="checkout" class="checkout-button">Оформить заказ</button>
    </div>

    <button @click="goBack" class="back-button">Назад</button>
  </div>
</template>

<script>
export default {
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    total() {
      return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }
  },
  methods: {
    increaseQuantity(id) {
      this.$store.dispatch('updateQuantity', { id, quantity: this.cart.find(item => item.id === id).quantity + 1 });
    },
    decreaseQuantity(id) {
      this.$store.dispatch('updateQuantity', { id, quantity: this.cart.find(item => item.id === id).quantity - 1 });
    },
    removeFromCart(id) {
      this.$store.dispatch('removeFromCart', id);
    },
    checkout() {
      this.$store.dispatch('checkout').then(() => {
        alert('Заказ успешно оформлен!');
        this.$router.push('/orders');
      });
    },
    goBack() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.cart-view {
  padding: 20px;
  margin-top: 70px; /* Отступ для фиксированной шапки */
}

.cart-items {
  list-style: none;
  padding: 0;
}

.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.cart-item img {
  margin-right: 15px;
  border-radius: 5px;
}

.item-info {
  flex-grow: 1;
}

.quantity-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  margin: 0 5px;
}

.quantity-button:hover {
  background-color: #388e3c;
}

.remove-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
}

.remove-button:hover {
  background-color: #d32f2f;
}

.cart-total {
  margin-top: 20px;
  text-align: center;
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.checkout-button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.checkout-button:hover {
  background-color: #38a169;
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

.empty-cart {
  text-align: center;
  font-size: 18px;
  color: gray;
}
</style>