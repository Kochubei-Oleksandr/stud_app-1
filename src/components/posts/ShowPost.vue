<template>
  <v-app id="inspire">
        <v-content style="padding-top: 0;">
            <v-container fluid grid-list-xl>
                <v-layout row wrap align-center justify-center>
                   <v-flex flex xs12 sm10 md10 lg8 xl8>
                        <v-card class="" hover>
                            <v-card-media
                            class="white--text"
                            height="500px"
                            :src="showPost.img"
                            >
                            </v-card-media>
                            <v-card-text style="padding: 0;">
                                <h3>{{ showPost.title }}</h3>
                                <p style="margin-bottom: 0;">Описание: {{ showPost.text }}</p>
                                <p style="margin-bottom: 0;">Состояние: {{ showPost.id_status }}</p>
                                <p style="margin-bottom: 0;">Стоимость: {{ showPost.price }}</p>
                                <p style="margin-bottom: 0;">Город: {{ showPost.id_city }}</p>
                                <p style="margin-bottom: 0;">Контактный телефон: {{ showPost.telephone }}</p>
                                <p style="margin-bottom: 0;">Дата обновления: {{ showPost.updated_at }}</p>
                                <p style="margin-bottom: 0;">Количество просмотров: {{ showPost.wiews }}</p>
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
    ...mapState([
      'showPost'
    ])
  },
  created () {
    this.$store.dispatch('showPostLoad', {id: this.$route.params.id})
  }
}
</script>

/* {{ showPost.title }} */
