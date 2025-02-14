<template>
  <div class="cart">
    <h1>Корзина</h1>
    <ul>
      <li v-for="item in cart" :key="item.id">
        {{ item.name }} x {{ item.quantity }} = ${{ item.price * item.quantity }}
        <button @click="removeFromCart(item.id)">Удалить</button>
      </li>
    </ul>
    <button @click="checkout" v-if="cart.length > 0">Оформить заказ</button>
    <button @click="goBack">Назад</button>
  </div>
</template>

<script>
export default {
  computed: {
    cart() {
      return this.$store.state.cart;
    }
  },
  methods: {
    removeFromCart(id) {
      this.$store.dispatch('removeFromCart', id);
    },
    checkout() {
      this.$store.dispatch('addOrder');
      this.$router.push('/orders');
    },
    goBack() {
      this.$router.push('/');
    }
  }
};
</script>