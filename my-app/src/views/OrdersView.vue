<template>
  <div class="orders">
    <h1>Оформленные заказы</h1>
    <ul>
      <li v-for="(order, index) in orders" :key="index">
        Дата: {{ order.date }}
        <ul>
          <li v-for="item in order.items" :key="item.id">
            {{ item.name }} x {{ item.quantity }}
          </li>
        </ul>
      </li>
    </ul>
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