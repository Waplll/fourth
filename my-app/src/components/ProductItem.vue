<template>
  <li class="product-item">
    <img :src="product.image" :alt="product.name" width="100" height="100" />
    <div class="product-info">
      <h3>{{ product.name }}</h3>
      <p>{{ product.description }}</p>
      <p><strong>Цена:</strong> ${{ product.price.toFixed(2) }}</p>
      <button @click="addToCart">Добавить в корзину</button>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.product);
    }
  }
};
</script>

<style>
.product-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
}

.product-item img {
  margin-right: 15px;
  border-radius: 5px;
}

.product-info {
  flex-grow: 1;
}
</style>