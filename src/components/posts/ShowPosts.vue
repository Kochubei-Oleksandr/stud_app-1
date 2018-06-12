<template>
    <v-app id="inspire">
        <v-content style="padding-top: 0;">
            <v-container fluid grid-list-xl>
                <h2>Все объявления на baraholka.pp.ua</h2>
                <v-layout row wrap align-center>
                    <v-flex flex xs12 sm4 md3 lg2 xl2 v-for="list in showPosts.data" :key="list.id" v-if="list.moderate == 1">
                        <v-card :to="{ name: 'ShowPost', params: { id: list.id } }" class="" hover>
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
        </v-content>
    </v-app>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
      ...mapState(['showPosts'])
  }
}
</script>

