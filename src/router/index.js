import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '../store';

Vue.use(VueRouter);

const routes = [
    {
        path: '/join',
        name: 'sign-up',
        component: function () {
            return import(/* webpackChunkName: "sign-up" */ '../views/SignUp.vue');
        },
        beforeEnter: (to, from, next) => {
            if (store.state.authenticated) {
                next('/');
            } else {
                next();
            }
        }
    },
    {
        path: '/login',
        name: 'sign-in',
        component: function () {
            return import(/* webpackChunkName: "sign-in" */ '../views/SignIn.vue');
        },
        beforeEnter: (to, from, next) => {
            if (store.state.authenticated) {
                next('/');
            } else {
                next();
            }
        }
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
