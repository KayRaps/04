import { createRouter, createWebHistory } from 'vue-router';
import ProductList from "./components/ProductList.vue";
import ProductDetail from "./components/ProductDetails.vue";
import Login from "./components/Login.vue";
import Wishlist from "./components/Wishlist.vue";
import Home from "./views/Home.vue";
import Cart from "./components/CardSkeleton.vue"
import store from "./store";

const routes = [
  { path: "/", component: ProductList },
  { path: "/product/:id", component: ProductDetail },
  { path: "/login", component: Login },

  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/wishlist",
    name: "Wishlist",
    component: Wishlist,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next({
        path: "/login",
        query: { redirect: to.fullpath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
