<template>
  <div class="hello">
    <h1>Login page</h1>
    <div>{{ login }}</div>
    <div>
        <div style="color: red" v-if="hasError">
            Something went wrong
        </div>
        <div>
            <input type="text" name="login" v-model="login">
        </div>
        <div>
            <input type="password" name="password" v-model="password">
        </div>
        <div>
            <button @click="loginAction">Login</button>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      login: 'A@A.A',
      password: '88888888',
      hasError: false,
      limit: 10,
      page: 1
    }
  },
  computed: {
    ...mapState(['isAuth'])
  },
  methods: {
    loginAction: function () {
      this.$store.dispatch('login', {login: this.login, password: this.password})
        .then(() => {
          this.hasError = false
          this.$router.push({name: 'User'})
        }).catch(err => {
          if (err.response.status !== 200) {
            this.hasError = true
          }
        })
    }
  },
  created () {
    if (this.isAuth) {
      this.$router.push({name: 'Page404'})
    }
  }
}
</script>
