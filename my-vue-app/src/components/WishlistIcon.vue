<template>
    <router-link to="/wishlist" class="wishlist-icon">
      <i class="fa fa-heart"></i>
      <span class="wishlist-count">{{ wishlistCount }}</span>
    </router-link>
  </template>
  
  <script>
  import { mapGetters } from 'vuex'
  
  export default {
    computed: {
      ...mapGetters(['wishlistCount'])
    }
  }
  </script>