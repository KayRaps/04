<template>
    <div class="cart-container">
      <h2>Shopping Cart</h2>
      <div v-if="cartItems.length === 0" class="empty-cart">
        Your cart is empty.
      </div>
      <div v-else>
        <ul class="cart-items">
          <li v-for="item in cartItems" :key="item.id" class="cart-item">
            <img :src="item.image" :alt="item.name" class="item-image">
            <div class="item-details">
              <h3>{{ item.name }}</h3>
              <p>Price: ${{ item.price.toFixed(2) }}</p>
              <div class="quantity-controls">
                <button @click="updateQuantity(item, -1)">-</button>
                <input 
                  type="number" 
                  v-model.number="item.quantity" 
                  @change="updateQuantity(item, 0)"
                >
                <button @click="updateQuantity(item, 1)">+</button>
              </div>
            </div>
            <button @click="removeItem(item)" class="remove-button">Remove</button>
          </li>
        </ul>
        <div class="cart-summary">
          <p>Total Items: {{ totalItems }}</p>
          <p>Total Cost: ${{ totalCost.toFixed(2) }}</p>
          <button @click="clearCart" class="clear-cart-button">Clear Cart</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed, onMounted, watch } from 'vue';
  import { useStore } from 'vuex';
  import jwtDecode from 'jwt-decode';
  
  export default {
    name: 'Cart',
    setup() {
      const store = useStore();
      const cartItems = ref([]);
      const userId = ref(null);
  
      const loadCart = () => {
        const token = localStorage.getItem('token');
        if (token) {
          const decodedToken = jwtDecode(token);
          userId.value = decodedToken.userId;
          const storedCart = JSON.parse(localStorage.getItem(`cart_${userId.value}`)) || [];
          cartItems.value = storedCart;
        }
      };
  
      const saveCart = () => {
        localStorage.setItem(`cart_${userId.value}`, JSON.stringify(cartItems.value));
      };
  
      const addToCart = (product) => {
        const existingItem = cartItems.value.find(item => item.id === product.id);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          cartItems.value.push({ ...product, quantity: 1 });
        }
        saveCart();
      };
  
      const updateQuantity = (item, change) => {
        item.quantity = Math.max(1, item.quantity + change);
        saveCart();
      };
  
      const removeItem = (item) => {
        const index = cartItems.value.findIndex(i => i.id === item.id);
        if (index !== -1) {
          cartItems.value.splice(index, 1);
          saveCart();
        }
      };
  
      const clearCart = () => {
        cartItems.value = [];
        saveCart();
      };
  
      const totalItems = computed(() => {
        return cartItems.value.reduce((total, item) => total + item.quantity, 0);
      });
  
      const totalCost = computed(() => {
        return cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0);
      });
  
      onMounted(() => {
        loadCart();
      });
  
      watch(totalItems, (newValue) => {
        store.commit('updateCartItemCount', newValue);
      });
  
      return {
        cartItems,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        totalItems,
        totalCost,
      };
    },
  };
  </script>
  
  <style scoped>
  .cart-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .cart-items {
    list-style-type: none;
    padding: 0;
  }
  
  .cart-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    border-bottom: 1px solid #eee;
    padding-bottom: 20px;
  }
  
  .item-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-right: 20px;
  }
  
  .item-details {
    flex-grow: 1;
  }
  
  .quantity-controls {
    display: flex;
    align-items: center;
  }
  
  .quantity-controls input {
    width: 50px;
    text-align: center;
    margin: 0 10px;
  }
  
  .remove-button, .clear-cart-button {
    background-color: #ff4d4d;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
  }
  
  .cart-summary {
    margin-top: 20px;
    text-align: right;
  }
  </style>