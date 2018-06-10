<template>
<v-layout row wrap align-center justify-center>
    <v-flex flex xs12 sm10 md10 lg8 xl8>
        <h1>Персональные данные: {{user}}</h1>
    </v-flex>
</v-layout>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'user'
    ])
  }
}
</script>

