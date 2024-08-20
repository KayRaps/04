<template>
    <div class="wishlist-item">
      <img :src="item.image" :alt="item.name">
      <h3>{{ item.name }}</h3>
      <p>${{ item.price }}</p>
      <button @click="$emit('add-to-cart', item)">Add to Cart</button>
      <button @click="$emit('remove', item.id)">Remove</button>
    </div>
  </template>
  
  <script>
  export default {
    props: ['item']
  }
  </script>