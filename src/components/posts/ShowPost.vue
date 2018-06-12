<template>
  <v-app id="inspire">
        <v-content style="padding-top: 0;">
            <v-container fluid grid-list-xl>
                <v-layout row wrap align-center justify-center
                v-for="list in lists.data" 
                v-if="list.id == route"
                :key="list.id">
                   <v-flex flex xs12 sm10 md10 lg8 xl8>
                        <v-card class="" hover>
                            <v-card-media
                            class="white--text"
                            height="500px"
                            :src="list.img"
                            >
                            </v-card-media>
                            <v-card-text style="padding: 0;">
                                <h3>{{ list.title }}</h3>
                                <p style="margin-bottom: 0;">Описание: {{ list.text }}</p>
                                <p style="margin-bottom: 0;">Состояние: {{ list.id_status }}</p>
                                <p style="margin-bottom: 0;">Стоимость: {{ list.price }}</p>
                                <p style="margin-bottom: 0;">Город: {{ list.id_city }}</p>
                                <p style="margin-bottom: 0;">Контактный телефон: {{ list.telephone }}</p>
                                <p style="margin-bottom: 0;">Дата обновления: {{ list.updated_at }}</p>
                                <p style="margin-bottom: 0;">Количество просмотров: {{ list.wiews }}</p>
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
    data () {
        return {
            route: this.$route.params.id
        }
    },
  computed: {
    ...mapState({
        lists: 'showPosts'
    })
  }
}
</script>
