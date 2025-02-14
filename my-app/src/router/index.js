import { createStore } from 'vuex'
import { loginRequest } from "@/utils/api";

export default createStore({
  state: {
    token: localStorage.getItem('myAppToken') || '',
  },
  getters: {
    isAuthenticated: state => {}
  },
  actions: {
    AUTH_REQUEST ({ commit }, user) {
      return new Promise((resolve, reject) => {
        loginRequest(user)
            .then(response => {
              commit('AUTH_REQUEST', response);
              localStorage.setItem('myAppToken', token);
              resolve()
            })
            .catch(error => {
              commit('AUTH_REQUEST', error)
              localStorage.removeItem('myAppToken');
              reject
            })
      })
    }
  },
  mutations: {
    AUTH_REQUEST (state, token) {
      state.token = token;
    },
    AUTH_ERROR (state) {
      state.token = '';
    }
  }
})