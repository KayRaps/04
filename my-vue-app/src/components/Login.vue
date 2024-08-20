<template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div>
          <label for="password">Password:</label>
          <div class="password-input">
            <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" required>
            <button type="button" @click="togglePassword">
              {{ showPassword ? 'Hide' : 'Show' }}
            </button>
          </div>
        </div>
        <button type="submit" :disabled="isLoading">
          {{ isLoading ? 'Logging in...' : 'Login' }}
        </button>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter, useRoute } from 'vue-router';
  
  export default {
    setup() {
      const store = useStore();
      const router = useRouter();
      const route = useRoute();
  
      const username = ref('');
      const password = ref('');
      const showPassword = ref(false);
      const isLoading = ref(false);
      const error = ref('');
  
      const togglePassword = () => {
        showPassword.value = !showPassword.value;
      };
  
      const handleSubmit = async () => {
        if (!username.value || !password.value) {
          error.value = 'Please enter both username and password.';
          return;
        }
  
        isLoading.value = true;
        error.value = '';
  
        const success = await store.dispatch('login', {
          username: username.value,
          password: password.value,
        });
  
        isLoading.value = false;
  
        if (success) {
          const redirectPath = route.query.redirect || '/';
          router.push(redirectPath);
        } else {
          error.value = 'Login failed. Please check your credentials and try again.';
        }
      };
  
      return {
        username,
        password,
        showPassword,
        isLoading,
        error,
        togglePassword,
        handleSubmit,
      };
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 300px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .password-input {
    display: flex;
  }
  
  .error {
    color: red;
  }
  </style>