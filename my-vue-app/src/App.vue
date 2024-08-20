<template>
  <div id="app">
    <Header />
    <div class="container">
      <router-view :products="products" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import Header from './components/Header.vue'
import WishlistIcon from './components/WishlistIcon.vue' // Make sure this path is correct

/**
 * The main application component.
 *
 * @component
 */
export default defineComponent({
  /**
   * The name of the component.
   *
   * @type {string}
   */
  name: "App",

  /**
   * The components used by this component.
   *
   * @type {object}
   */
  components: {
    /**
     * The header component.
     *
     * 
     */
    Header
  
  },

  components: {
    WishlistIcon,
  },
  /**
   * The setup function for the component.
   *
   * @returns {object} The component's data and methods.
   */
  setup() {
    const store = useStore();

    /**
     * The products data.
     *
     * @type {array}
     */
    const products = ref([]);

    /**
     * Fetches the products data from the API when the component is mounted.
     *
     * @async
     */
     onMounted(async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products")
    products.value = await res.json()
  } catch (error) {
    console.error("Failed to fetch products:", error)
  }
})

const isAuthenticated = computed(() => {
  console.log("isAuthenticated:", store.getters.isAuthenticated)
  return store.getters.isAuthenticated
})
      });

      return {
        isAuthenticated,
      };

    /**
     * Returns the component's data and methods.
     *
     * @returns {object}
     */
    return {
      /**
       * The products data.
       *
       * @type {array}
       */
      products,
    };
  },
});
</script>

<style>
header {
  background-color: #f8f8f8;
  padding: 1em;
  text-align: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2em;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
