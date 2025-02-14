<template>
  <form class="login" @submit.prevent="login">
    <h1>Signin</h1>
    <label>User name</label>
    <input type="text" required v-model="username" />
    <label>Password</label>
    <input type="password" required v-model="password" />
    <hr />
    <button type="submit">Login</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      username: '', // Добавлено значение по умолчанию
      password: ''  // Добавлено значение по умолчанию
    };
  },
  methods: {
    login() {
      const userData = {
        username: this.username, // Исправлено 'thisusername' на 'this.username'
        password: this.password  // Исправлено 'this. password' на 'this.password'
      };

      this.$store.dispatch('AUTH_REQUEST', userData) // Добавлены кавычки вокруг 'AUTH_REQUEST'
          .then(() => this.$router.push('/')); // Исправлено 'Srouter' на '$router'
    }
  }
};
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 10px;
  margin: 0 auto; /* Было '0auto', исправлено на '0 auto' */
}

.login input,
button {
  border: 1px solid black; /* Было 'Oblack', исправлено на 'black' */
  border-radius: 5px;
}

hr {
  margin: 10px 0; /* Отступ сверху и снизу для горизонтальной линии */
}
</style>