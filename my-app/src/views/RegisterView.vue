<template>
  <div class="register-view">
    <h1>Регистрация</h1>
    <form @submit.prevent="handleRegister">
      <label for="fio">ФИО:</label>
      <input type="text" id="fio" v-model="fio" required />

      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required />

      <label for="password">Пароль:</label>
      <input type="password" id="password" v-model="password" required />

      <button type="submit" class="register-button">Зарегистрироваться</button>
    </form>

    <p v-if="error" class="error">{{ error }}</p>

    <button @click="goBack" class="back-button">Назад</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fio: '',
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    handleRegister() {
      const userData = { fio: this.fio, email: this.email, password: this.password };

      this.$store
          .dispatch('register', userData)
          .then(() => {
            alert('Регистрация успешна!');
            this.$router.push('/login');
          })
          .catch(err => {
            this.error = err.message || 'Ошибка регистрации';
            console.error('Ошибка регистрации:', err);
          });
    },
    goBack() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.register-view {
  padding: 20px;
  margin-top: 70px;
}

.register-button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.register-button:hover {
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