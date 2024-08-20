<template>
  <div class="wishlist">
    <h1>My Wishlist</h1>
    <div class="wishlist-controls">
      <select v-model="sortBy">
        <option value="date">Sort by Date</option>
        <option value="name">Sort by Name</option>
        <option value="price">Sort by Price</option>
      </select>
      <input 
        type="text" 
        placeholder="Filter items..." 
        v-model="filterBy"
      >
      <button @click="clearWishlist">Clear Wishlist</button>
    </div>
    <div class="wishlist-items">
      <wishlist-item
        v-for="item in sortedAndFilteredItems"
        :key="item.id"
        :item="item"
        @add-to-cart="addToCart"
        @remove="removeFromWishlist"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import WishlistItem from './WishlistItem.vue'

export default {
  components: {
    WishlistItem
  },
  data() {
    return {
      sortBy: 'date',
      filterBy: ''
    }
  },
  computed: {
    ...mapState(['wishlistItems']),
    sortedAndFilteredItems() {
      return this.wishlistItems
        .filter(item => item.name.toLowerCase().includes(this.filterBy.toLowerCase()))
        .sort((a, b) => {
          if (this.sortBy === 'name') return a.name.localeCompare(b.name)
          if (this.sortBy === 'price') return a.price - b.price
          return new Date(b.dateAdded) - new Date(a.dateAdded)
        })
    }
  },
  methods: {
    ...mapActions(['clearWishlist', 'removeFromWishlist']),
    addToCart(item) {
      // Implement add to cart functionality
      console.log('Add to cart:', item)
    }
  },
  created() {
    this.$store.dispatch('fetchWishlist')
  }
}
</script>