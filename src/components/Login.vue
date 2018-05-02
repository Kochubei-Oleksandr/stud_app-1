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
            <input type="password" name="pass" v-model="pass">
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
      login: 'test',
      pass: 'test',
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
      this.$store.dispatch('login', {login: this.login, pass: this.pass})
        .then(() => {
          this.hasError = false
          this.$router.push({name: 'AddsList'})
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
