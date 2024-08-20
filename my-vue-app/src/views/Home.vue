<template>
    <div class="home">
      <h1>Welcome to Our E-Store</h1>
      <wishlist-carousel />
      <!-- Other home page content -->
    </div>
  </template>
  
  <script>
  import WishlistCarousel from '../components/WishlistCarousel.vue'
  
  export default {
    name: 'Home',
    components: {
      WishlistCarousel
    }
  }
  </script>