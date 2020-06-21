<template>
    <section class="hero is-primary is-fullheight">
        <div class="media is-pulled-right">
            <button
                class="button sign-in"
                @click="$router.push({name: 'sign-in'})"
            >
                Sign In
            </button>
        </div>
        <div class="hero-body">
            <div class="container">
                <div class="columns is-centered">
                    <div class="column is-5-tablet is-4-desktop is-5-widescreen">
                        <div class="box">
                            <b-field
                                label="Username"
                                :type="usernameFieldType"
                                :message="registered ? 'Your account has been created' : errors.username"
                            >
                                <b-input
                                    v-model="form.username"
                                    @keyup.native.enter="signUp"
                                    placeholder="Your username"
                                >
                                </b-input>
                            </b-field>
                            <b-field
                                label="Password"
                                :type="errors.password ? 'is-danger' : 'text'"
                                :message="errors.password"
                            >
                                <b-input
                                    v-model="form.password"
                                    @keyup.native.enter="signUp"
                                    type="password"
                                    placeholder="Your password"
                                    password-reveal
                                >
                                </b-input>
                            </b-field>
                            <div class="field">
                                <button
                                    class="button is-success"
                                    :disabled="!(form.username && form.password)"
                                    @click="onClick"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
    .button.sign-in {
        margin-top: 1rem;
        margin-right: 1rem;
        position: absolute;
        right: 0;
    }
</style>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            form: {
                username: '',
                password: '',
            },
            errors: {
                username: '',
                password: '',
            },
            registered: false,
        };
    },
    computed: {
        usernameFieldType() {
            if (this.errors.username) return 'is-danger';
            if (this.registered) return 'is-success';
            return 'text';
        },
    },
    watch: {
        'form.username': function() {
            this.errors.username = '';
            this.registered = false;
        },
        'form.password': function() {
            this.errors.password = '';
            this.registered = false;
        }
    },
    methods: {
        async signUp() {
            try {
                await axios.post('/users/auth/sign_up', this.form);
                this.form = {
                    username: '',
                    password: '',
                };

                await this.$nextTick();
                this.registered = true;
            } catch (error) {
                this.errors = {
                    ...this.errors,
                    ...error.response.data,
                };
            }
        },
        onClick() {
            this.signUp();
        },
    },
};
</script>
