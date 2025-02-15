<template>
  <div class="cart-summary">
    <h2>Корзина</h2>

    <!-- Список товаров -->
    <div v-if="cart.length" class="cart-items">
      <CartItem
          v-for="item in cart"
          :key="item.id"
          :item="item"
          @remove-from-cart="removeFromCart"
          @update-quantity="updateQuantity"
      />
    </div>

    <!-- Сообщение, если корзина пуста -->
    <p v-else class="empty-cart">Ваша корзина пуста.</p>

    <!-- Итоговая сумма -->
    <div v-if="cart.length" class="cart-total">
      <h3>Итого: ${{ total.toFixed(2) }}</h3>
      <button @click="checkout" class="checkout-button">Оформить заказ</button>
    </div>
  </div>
</template>

<script>
import CartItem from '@/components/CartItem.vue';

export default {
  components: { CartItem },
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    total() {
      return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }
  },
  methods: {
    removeFromCart(id) {
      this.$store.dispatch('removeFromCart', id);
    },
    updateQuantity(payload) {
      this.$store.dispatch('updateQuantity', payload);
    },
    checkout() {
      this.$store.dispatch('checkout').then(() => {
        alert('Заказ успешно оформлен!');
        this.$router.push('/orders');
      });
    }
  }
};
</script>

<style scoped>
.cart-summary {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.empty-cart {
  text-align: center;
  font-size: 18px;
  color: gray;
}

.cart-total {
  margin-top: 20px;
  text-align: center;
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.cart-total h3 {
  font-size: 24px;
  margin-bottom: 10px;
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
</style>