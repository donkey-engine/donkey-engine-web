import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        authenticated: !!localStorage.getItem('accessToken') || false,
    },
    mutations: {
        SET_AUTHENTICATED(state, value) {
            state.authenticated = value;
        },
    },
    actions: {
        SIGN_IN({ commit }, payload) {
            return axios.post('/users/auth/sign_in', payload).then(response => {
                localStorage.setItem('accessToken', response.data.token);
                commit('SET_AUTHENTICATED', true);
            });
        },
    }
});
