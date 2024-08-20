import { createStore } from 'vuex';
import axios from 'axios';

const API_URL = 'https://your-api-url.com/wishlist'; // Replace with your actual API URL

export default createStore({
  state() {
    return {
      selectedCategory: "",
      sortOrder: "",
      user: null,
      token: localStorage.getItem('token') || null,
      wishlistItems: []
    };
  },
  mutations: {
    SET_WISHLIST(state, items) {
      state.wishlistItems = items;
    },
    ADD_TO_WISHLIST(state, item) {
      state.wishlistItems.push(item);
    },
    REMOVE_FROM_WISHLIST(state, itemId) {
      state.wishlistItems = state.wishlistItems.filter(item => item.id !== itemId);
    },
    CLEAR_WISHLIST(state) {
      state.wishlistItems = [];
    },
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
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
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
        const response = await fetch('https://fakestoreapi.com/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });
        if (!response.ok) {
          throw new Error('Login failed');
        }
        const data = await response.json();
        commit('setToken', data.token);
        commit('setUser', { username: credentials.username });
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
    async fetchWishlist({ commit }) {
      try {
        const response = await axios.get(API_URL);
        const apiWishlist = response.data;
        const localWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const mergedWishlist = mergeWishlists(localWishlist, apiWishlist);
        localStorage.setItem('wishlist', JSON.stringify(mergedWishlist));
        commit('SET_WISHLIST', mergedWishlist);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        const localWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        commit('SET_WISHLIST', localWishlist);
      }
    },
    async addToWishlist({ commit }, item) {
      commit('ADD_TO_WISHLIST', item);
      localStorage.setItem('wishlist', JSON.stringify(this.state.wishlistItems));
      try {
        await axios.post(API_URL, item);
      } catch (error) {
        console.error('Error adding item to wishlist:', error);
      }
    },
    async removeFromWishlist({ commit }, itemId) {
      commit('REMOVE_FROM_WISHLIST', itemId);
      localStorage.setItem('wishlist', JSON.stringify(this.state.wishlistItems));
      try {
        await axios.delete(`${API_URL}/${itemId}`);
      } catch (error) {
        console.error('Error removing item from wishlist:', error);
      }
    },
    async clearWishlist({ commit }) {
      commit('CLEAR_WISHLIST');
      localStorage.removeItem('wishlist');
      try {
        await axios.delete(API_URL);
      } catch (error) {
        console.error('Error clearing wishlist:', error);
      }
    },
    async syncWishlist({ state }) {
      try {
        await axios.put(API_URL, state.wishlistItems);
      } catch (error) {
        console.error('Error syncing wishlist:', error);
      }
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    wishlistCount: state => state.wishlistItems.length,
  },
});

function mergeWishlists(local, api) {
  const mergedMap = new Map();
  [...local, ...api].forEach(item => mergedMap.set(item.id, item));
  return Array.from(mergedMap.values());
}
