<template>
  <li class="product-item">
    <img :src="product.image" :alt="product.name" width="100" height="100" />
    <div class="product-info">
      <h3>{{ product.name }}</h3>
      <p>{{ product.description }}</p>
      <p><strong>Цена:</strong> ${{ product.price.toFixed(2) }}</p>
      <button @click="addToCart" class="add-to-cart-button">Добавить в корзину</button>
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

<style scoped>
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

/* Стиль для кнопки "Добавить в корзину" */
.add-to-cart-button {
  background-color: #2e7d32; /* Темно-зеленый цвет */
  color: white;
  border: none;
  padding: 12px 24px; /* Увеличение размера кнопки */
  font-size: 16px; /* Увеличение размера шрифта */
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease, transform 0.3s ease; /* Анимация при наведении */
}

.add-to-cart-button:hover {
  background-color: #1b5e20; /* Темнее зеленый при наведении */
  transform: scale(1.05); /* Немного увеличивается при наведении */
}
</style>