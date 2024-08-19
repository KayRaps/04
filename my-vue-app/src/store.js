import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      selectedCategory: "",
      sortOrder: "",
      user: null,
      token: localStorage.getItem('token') || null,
    };
  },
  mutations: {
    setCategory(state, category) {
      state.selectedCategory = category;
    },
    setSortOrder(state, sortOrder) {
      state.sortOrder = sortOrder;
    },
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
      if (token) {
        localStorage.setItem('token, token');
      }
    },
  },
  actions: {
    updateCategory({ commit }, category) {
      commit("setCategory", category);
    },
    updateSortOrder({ commit }, sortOrder) {
      commit("setSortOrder", sortOrder);
    },
    async login({ commit }, credentials) {
      try {
        const response = await fetch('https://fakestoreapi.com/auth/login,' {
          method: 'POST',
          headers: {
            'Content-Type': 'applicatiom/json',
          },
          body: JSON.stringify(credintials),
        })
        if (!response.ok) {
          throw new Error('Login failed');
        }
        const data = await response.json();
        commit('setToken', data.token);
        commit('setUser', { username: credentials.username});
        return true;
      } catch (error) {
        console.error('Login error:', error);
        return false;
      }
    },
    logout({ commit }) {
      commit('setUser', null);
      commit('setToken', null);
    },
  },
  getters: {
    isAuthenticated: state => !!state.token,
  },
});
