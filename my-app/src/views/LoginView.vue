<template>
  <div class="login">
    <h1>Вход в систему</h1>
    <form @submit.prevent="handleLogin">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required />

      <label for="password">Пароль:</label>
      <input type="password" id="password" v-model="password" required />

      <button type="submit">Войти</button>
    </form>
    <p v-if="error">{{ error }}</p>
    <button @click="goBack">Назад</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    handleLogin() {
      const userData = { email: this.email, password: this.password };

      this.$store.dispatch('login', userData)
          .then(() => {
            this.$router.push('/');
          })
          .catch(err => {
            this.error = err.message || 'Неверный email или пароль';
          });
    },
    goBack() {
      this.$router.push('/');
    }
  }
};
</script>