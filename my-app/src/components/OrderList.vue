<template>
  <div class="order-list">
    <ul v-if="orders.length">
      <OrderItem
          v-for="(order, index) in orders"
          :key="index"
          :order="order"
      />
    </ul>
    <p v-else>У вас пока нет заказов.</p>
  </div>
</template>

<script>
import OrderItem from '@/components/OrderItem.vue';

export default {
  components: { OrderItem },
  computed: {
    orders() {
      return this.$store.state.orders;
    }
  }
};
</script>