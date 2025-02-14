<template>
  <div id="app">
    <nav class="navbar">
      <h1>Просто купить</h1>
      <div v-if="user" class="auth-actions">
        <span>Добро пожаловать, {{ user.email }}!</span>
        <button @click="logout">Выход</button>
      </div>
      <div v-else class="auth-actions">
        <button @click="goToLogin">Войти</button>
        <button @click="goToRegister">Регистрация</button>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/');
    },
    goToLogin() {
      this.$router.push('/login');
    },
    goToRegister() {
      this.$router.push('/register');
    }
  }
};
</script>

<style>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
}

.auth-actions {
  display: flex;
  gap: 10px;
}
</style>