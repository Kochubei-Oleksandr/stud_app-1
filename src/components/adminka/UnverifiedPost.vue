<template>
    <v-app id="inspire">
            <v-container fluid grid-list-xl>
                <v-layout row wrap>
                    <v-flex xs12 sm2 md2>
                        <v-checkbox v-on:change="sortAction" v-model="sortDate" label="Сначала новые" value="1"></v-checkbox>
                    </v-flex>
                    <v-flex xs12 sm2 md2>
                        <v-checkbox v-on:change="sortAction" v-model="sortDate" label="Сначала старые" value="2"></v-checkbox>
                    </v-flex>
                    <v-flex xs12 sm2 md2>
                        <v-checkbox v-on:change="sortAction" v-model="sortVip" label="Только VIP" value="1"></v-checkbox>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex flex xs12 sm4 md3 lg2 xl2 
                    v-for="list in lists.data"
                    v-if="list.moderate == 0"
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
                <template>
                    <div class="text-xs-center">
                        <v-pagination @input="sortAction" :length="lists.count_post" v-model="page" :total-visible="7"></v-pagination>
                    </div>
                </template>
            </v-container>
    </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data () {
        return {
            page: 1,
            sortDate: '',
            sortVip: '',
            token: localStorage.getItem('apiToken'),
            idPost: '',
            moderated: '0'
        }
    },
  computed: {
    ...mapState({
      lists: 'adminPosts', user: 'user'
    })
  },
  created () {
    this.$store.dispatch('sortPostAdmin', 
        {
            token: localStorage.getItem('apiToken'),
            moderated: this.moderated
        } 
    );    
  },
  methods: {
    sortAction: function (page) {
        this.$nextTick(function () {
            this.$store.dispatch('sortPostAdmin', {
                page: this.page,
                date: this.sortDate,
                vip: this.sortVip, 
                token: this.token,
                moderated: this.moderated
            })
        })
    },
    deletePostAction: function (id) {
        this.idPost = id
        this.$store.dispatch('deletePost', {data: {token: this.token, idPost: this.idPost} })
        .then(() => {
            this.hasError = false
            this.$router.push({name: 'UnverifiedPost'})
        }).catch(err => {
            if (err.response.status !== 200) {
                this.hasError = true
            }
        })
    }
  }
}
</script>