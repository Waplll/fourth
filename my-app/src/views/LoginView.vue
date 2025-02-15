<template>
  <div class="login-view">
    <h1>Вход</h1>
    <form @submit.prevent="handleLogin">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required />

      <label for="password">Пароль:</label>
      <input type="password" id="password" v-model="password" required />

      <button type="submit" class="login-button">Войти</button>
    </form>

    <p v-if="error" class="error">{{ error }}</p>

    <button @click="goBack" class="back-button">Назад</button>
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
      const credentials = { email: this.email, password: this.password };

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

<style scoped>
.login-view {
  padding: 20px;
  margin-top: 70px; /* Отступ для фиксированной шапки */
}

.login-button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.login-button:hover {
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

.error {
  color: red;
  font-weight: bold;
  margin-top: 10px;
}
</style>