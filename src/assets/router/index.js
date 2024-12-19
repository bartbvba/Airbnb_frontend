import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/HomePage.vue';
import Login from '@/components/UserLogin.vue';
import Register from '@/components/UserRegister.vue';
import AirbnbPage from '@/components/AirbnbPage.vue';
import jwt_decode from 'jwt-decode';  // Import jwt-decode to decode the token

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/airbnb',
    name: 'AirbnbPage',
    component: AirbnbPage,
    meta: { requiresAuth: true },  // Add meta data to require authentication
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Navigation guard to protect the Airbnb page route
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.getItem('token');
    if (!token) {
      // If no token is found, redirect to the login page
      next('/login');
    } else {
      // Decode token to check for expiry
      const decoded = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        // Token is expired, clear it and redirect to login
        localStorage.removeItem('token');
        next('/login');
      } else {
        next();
      }
    }
  } else {
    next();  // Always allow the home page and register/login pages
  }
});

export default router;
