<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Форма регистрации</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" label="Name" v-model="name" type="text"></v-text-field>
                  <v-text-field prepend-icon="email" label="Email" v-model="email" type="email"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" v-model="password" label="Password" type="password"></v-text-field>
                  <v-text-field id="passwordConfirm" prepend-icon="lock" v-model="passwordConfirm" label="Password confirm" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="registerAction" color="primary">Зарегистрироваться</v-btn>
              </v-card-actions>
              {{errors}}
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
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      hasError: false,
      errors: ''
    }
  },
  computed: {
    ...mapState(['isAuth'])
  },
  methods: {
    registerAction: function () {
      this.$store.dispatch('register', {name: this.name, email: this.email, password: this.password, passwordConfirm: this.passwordConfirm})
        .then(() => {
          this.hasError = false;
          if (this.isAuth){
            this.$router.push({name: 'User'})
          }
        }).catch(err => {
          if (err.response.status !== 200) {
            /* this.hasError = true */
            /* this.errors = err */
            alert('Ошибка ' + err.name + ":" + err.message + "\n" + err.stack);
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
