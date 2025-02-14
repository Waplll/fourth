<template>
  <div class="cart">
    <h1>Корзина</h1>

    <!-- Сообщение, если корзина пуста -->
    <p v-if="!cart.length">Ваша корзина пуста.</p>

    <!-- Список товаров в корзине -->
    <ul v-else>
      <li v-for="item in cart" :key="item.id" class="cart-item">
        <img :src="item.image" :alt="item.name" width="50" height="50" />
        <div class="item-info">
          <h3>{{ item.name }}</h3>
          <p><strong>Цена:</strong> ${{ item.price.toFixed(2) }}</p>
          <p><strong>Количество:</strong></p>
          <div class="navigation">
          <button @click="decreaseQuantity(item.id)">-</button>
          <span>{{ item.quantity }}</span>
          <button @click="increaseQuantity(item.id)">+</button>
          <button @click="removeFromCart(item.id)">Удалить</button>
          </div>
        </div>
      </li>
    </ul>

    <!-- Итоговая сумма -->
    <div v-if="cart.length" class="total">
      <h3>Итого: ${{ total.toFixed(2) }}</h3>
      <button @click="checkout">Оформить заказ</button>
    </div>

    <button @click="goBack">Назад</button>
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
      this.$store
          .dispatch('checkout')
          .then(() => {
            this.$router.push('/orders'); // Переходим на страницу заказов
          })
          .catch(err => {
            alert(err.message || 'Произошла ошибка при оформлении заказа.');
            console.error('Ошибка при оформлении заказа:', err);
          });
    },
    goBack() {
      this.$router.push('/');
    }
  }
};
</script>

<style>
.cart {
  padding: 20px;
}

.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
}

.cart-item img {
  margin-right: 15px;
  border-radius: 5px;
}

.item-info {
  flex-grow: 1;
}

.total {
  margin-top: 20px;
  text-align: center;
}

.total button {
  margin-top: 10px;
}

.navigation{
  display: flex;
  gap: 10px;
  align-items: center;
}

</style>