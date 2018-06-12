<template>
    <v-app id="inspire">
            <v-container fluid grid-list-xl>
                <v-layout row wrap>
                    <v-flex flex xs12 sm4 md3 lg2 xl2 
                    v-for="list in lists.data"
                    v-if="((list.id_user == user.userId) && (list.moderate == 1))"
                    :key="list.id">
                        <v-card 
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
                            <v-card-actions>
                                <v-btn :to="{ name: 'RedactPost', params: { lists: list } }" flat color="orange">Изменить</v-btn>
                                <v-btn @click="deletePostAction(list.id)" flat color="orange">Удалить</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
    </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data () {
        return {
            token: localStorage.getItem('apiToken'),
            idPost: ''
        }
    },
  computed: {
    ...mapState({
      lists: 'showPosts', user: 'user'
    })
  },
  created () {
    //this.$store.dispatch('sortPost');  
  },
  methods: {
    deletePostAction: function (id) {
        this.idPost = id
        this.$store.dispatch('deletePost', {data: {token: this.token, idPost: this.idPost} })
        .then(() => {
            this.hasError = false
            this.$router.push({name: 'MyPosts'})
        }).catch(err => {
            if (err.response.status !== 200) {
                this.hasError = true
            }
        })
    }
  }
}
</script>