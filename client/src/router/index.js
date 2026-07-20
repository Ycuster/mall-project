import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // 前台
  {
    path: '/',
    component: () => import('../layout/FrontLayout.vue'),
    children: [
      { path: '', name: 'Home', component: () => import('../views/front/Home.vue') },
      { path: 'products', name: 'Products', component: () => import('../views/front/Products.vue') },
      { path: 'product/:id', name: 'ProductDetail', component: () => import('../views/front/ProductDetail.vue') },
      { path: 'cart', name: 'Cart', component: () => import('../views/front/Cart.vue'), meta: { auth: true } },
      { path: 'checkout', name: 'Checkout', component: () => import('../views/front/Checkout.vue'), meta: { auth: true } },
      { path: 'orders', name: 'Orders', component: () => import('../views/front/Orders.vue'), meta: { auth: true } },
      { path: 'profile', name: 'Profile', component: () => import('../views/front/Profile.vue'), meta: { auth: true } },
    ]
  },
  { path: '/login', name: 'Login', component: () => import('../views/front/Login.vue') },
  { path: '/register', name: 'Register', component: () => import('../views/front/Register.vue') },

  // 后台
  {
    path: '/admin',
    component: () => import('../layout/AdminLayout.vue'),
    meta: { auth: true, admin: true },
    redirect: '/admin/dashboard',
    children: [
      { path: 'dashboard', name: 'AdminDashboard', component: () => import('../views/admin/Dashboard.vue') },
      { path: 'products', name: 'AdminProducts', component: () => import('../views/admin/ProductManage.vue') },
      { path: 'categories', name: 'AdminCategories', component: () => import('../views/admin/CategoryManage.vue') },
      { path: 'orders', name: 'AdminOrders', component: () => import('../views/admin/OrderManage.vue') },
      { path: 'users', name: 'AdminUsers', component: () => import('../views/admin/UserManage.vue') },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('mall_token')
  const user = JSON.parse(localStorage.getItem('mall_user') || 'null')

  if (to.meta.auth && !token) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else if (to.meta.admin && user?.role !== 'admin') {
    next({ name: 'Home' })
  } else {
    next()
  }
})

export default router