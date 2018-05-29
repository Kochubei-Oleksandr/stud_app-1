<template>
  <v-app id="inspire">
        <v-content style="padding-top: 0;">
            <v-container fluid grid-list-xl>
                <v-layout row wrap align-center justify-center>
                   <v-flex flex xs12 sm10 md10 lg8 xl8>
                        <h1>Тут будут данные пользователя {{user}}</h1>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'user'
    ])
  },
  created () {
    this.$store.dispatch('login')
  },
}
</script>