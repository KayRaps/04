<template>
    <div class="wishlist-carousel">
      <h2>Your Wishlist</h2>
      <div class="carousel-items">
        <div v-for="item in carouselItems" :key="item.id" class="carousel-item">
          <img :src="item.image" :alt="item.name">
          <h3>{{ item.name }}</h3>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex'
  
  export default {
    computed: {
      ...mapState(['wishlistItems']),
      carouselItems() {
        return this.wishlistItems.slice(0, 5)
      }
    }
  }
  </script>