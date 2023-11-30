
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Login from '../views/Login/Index.vue';
import Home from '../views/Home/Index.vue';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router