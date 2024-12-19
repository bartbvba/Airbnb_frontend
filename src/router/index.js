import { createRouter, createWebHistory } from 'vue-router';
import jwt_decode from 'jwt-decode'; // <-- This import line should be added
import HomePage from '@/components/HomePage.vue';
import Login from '@/components/UserLogin.vue';
import Register from '@/components/UserRegister.vue';
import AirbnbPage from '@/components/AirbnbPage.vue';
import OwnerDashboard from '@/components/OwnerDashboard.vue';  // New import

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
  },
  {
    path: '/owner-dashboard',   // New route for owner dashboard
    name: 'OwnerDashboard',
    component: OwnerDashboard,
    meta: { requiresAuth: true, isOwner: true }, // Only allow if user is an owner
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Navigation guard to protect the Airbnb page route
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      next('/login');
    } else {
      const decoded = jwt_decode(token);
      if (to.matched.some(record => record.meta.isOwner) && decoded.role !== 'owner') {
        next('/airbnb');  // Redirect non-owners to the Airbnb page
      } else {
        next();
      }
    }
  } else {
    next();
  }
});

export default router;
