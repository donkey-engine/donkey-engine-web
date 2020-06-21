<template>
    <section class="hero is-primary is-fullheight">
        <div class="media is-pulled-right">
            <button
                class="button sign-up"
                @click="$router.push({name: 'sign-up'})"
            >
                Sign Up
            </button>
        </div>
        <div class="hero-body">
            <div class="container">
                <div class="columns is-centered">
                    <div class="column is-5-tablet is-4-desktop is-5-widescreen">
                        <div class="box">
                            <b-field
                                label="Username"
                                :type="errors.username ? 'is-danger' : 'text'"
                                :message="errors.username"
                            >
                                <b-input
                                    v-model="form.username"
                                    @keyup.native.enter="signIn"
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
                                    @keyup.native.enter="signIn"
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
                                    Sign In
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
    .button.sign-up {
        margin-top: 1rem;
        margin-right: 1rem;
        position: absolute;
        right: 0;
    }
</style>

<script>
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
        },
        'form.password': function() {
            this.errors.password = '';
        }
    },
    methods: {
        async signIn() {
            try {
                await this.$store.dispatch('SIGN_IN', this.form);
                this.$router.push('/');
            } catch (error) {
                this.errors = {
                    ...this.errors,
                    ...error.response.data,
                };
            }
        },
        onClick() {
            this.signIn();
        },
    },
};
</script>
