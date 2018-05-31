<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Форма авторизации</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="login" label="Login" v-model="login" type="text"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" name="password" v-model="password" label="Password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="loginAction" color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      login: '',
      password: '',
      hasError: false
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
          if (this.isAuth){
            this.$router.push({name: 'User'})
          }
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
