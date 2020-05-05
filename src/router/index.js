import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  },
  {
    path: '/join',
    name: 'sign-up',
    component: function () {
      return import(/* webpackChunkName: "sign-up" */ '../views/SignUp.vue')
    },
    beforeEnter: (to, from, next) => {
      next()
      return store.getters
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
