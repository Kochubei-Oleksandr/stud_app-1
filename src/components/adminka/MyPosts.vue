<template>
    <v-app id="inspire">
            <v-container fluid grid-list-xl>
                <v-layout row wrap>
                    <v-flex flex xs12 sm4 md3 lg2 xl2 
                    v-for="list in lists"
                    v-if="list.id_user == user.userId"
                    :key="list.id">
                        <v-card 
                        :to="{ name: 'ShowPost', params: { id: list.id } }"
                        hover>
                            <v-card-media
                            class="white--text"
                            height="150px"
                            :src="list.img"
                            >
                            </v-card-media>
                            <v-card-text style="padding: 0;">
                                {{ list.title }}
                                <p style="margin-bottom: 0;">Стоимость: {{ list.price }}</p>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
    </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      lists: 'showPosts', user: 'user'
    })
  },
  created () {
    this.$store.dispatch('showPostsLoad')
  }
}
</script>