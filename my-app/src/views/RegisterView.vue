<template>
  <div class="register">
    <h1>Регистрация</h1>
    <form @submit.prevent="handleRegister">
      <label for="fio">ФИО:</label>
      <input type="text" id="fio" v-model="fio" required />

      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required />

      <label for="password">Пароль:</label>
      <input type="password" id="password" v-model="password" required />

      <button type="submit">Зарегистрироваться</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
    <button @click="goBack">Назад</button>
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
          .dispatch('register', userData) // Вызываем метод из Vuex
          .then(() => {
            alert('Регистрация успешна!');
            this.$router.push('/login'); // Переходим на страницу входа
          })
          .catch(err => {
            this.error = err.message || 'Ошибка регистрации'; // Отображаем ошибку
            console.error('Ошибка регистрации:', err);
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