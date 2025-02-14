<template>
  <div class="login">
    <h1>Вход</h1>
    <form @submit.prevent="handleLogin">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required />

      <label for="password">Пароль:</label>
      <input type="password" id="password" v-model="password" required />

      <button type="submit">Войти</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
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
      const credentials = {email: this.email, password: this.password};

      this.$store
          .dispatch('login', credentials)
          .then(() => {
            this.$router.push('/');
          })
          .catch(err => {
            this.error = err.message || 'Неверные учетные данные';
            console.error('Ошибка входа:', err);
          });
    },
    goBack() {
      this.$router.push('/');
    }
  }
};
</script>

<style>
.error {
  color: red;
  font-weight: bold;
}
</style>