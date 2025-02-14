<template>
  <div class="register">
    <h1>Регистрация</h1>
    <form @submit.prevent="handleRegister">
      <label for="name">Имя:</label>
      <input type="text" id="name" v-model="name" required />

      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required />

      <label for="password">Пароль:</label>
      <input type="password" id="password" v-model="password" required />

      <button type="submit">Зарегистрироваться</button>
    </form>
    <p v-if="error">{{ error }}</p>
    <button @click="goBack">Назад</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    handleRegister() {
      const userData = { name: this.name, email: this.email, password: this.password };

      this.$store.dispatch('register', userData)
          .then(() => {
            alert('Регистрация успешна!');
            this.$router.push('/login');
          })
          .catch(err => {
            this.error = err.message || 'Ошибка регистрации';
          });
    },
    goBack() {
      this.$router.push('/');
    }
  }
};
</script>