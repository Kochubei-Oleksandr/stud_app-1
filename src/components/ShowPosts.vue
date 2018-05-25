<template>
    <v-app id="inspire">
        <v-content style="padding-top: 0;">
            <v-container fluid grid-list-xl>
                <v-layout row wrap align-center>
                    <v-flex flex xs12 sm4 md3 lg2 xl2 v-for="list in lists" :key="list.id">
                        <v-card class="" hover>
                            <v-card-media
                            class="white--text"
                            height="150px"
                            :src="list.img"
                            >
                            </v-card-media>
                            <v-card-text style="padding: 0;">
                                {{ list.title }}
                                <p style="margin-bottom: 0;">Стоимость: {{ list.price }}</p>
                                <p>{{ list.img }}</p>
                            </v-card-text>
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
  computed: {
    ...mapState({
      lists: 'showPosts'
    })
  },
  created () {
    this.$store.dispatch('showPostsLoad')
  }
}
</script>
