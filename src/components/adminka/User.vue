<template>
  <v-app id="inspire">
        <v-content>
            <v-container fluid grid-list-xl>
              <v-tabs
              dark
              color="cyan"
              show-arrows
              fix
              >
                <v-tabs-slider color="yellow"></v-tabs-slider>
                <v-tab :to="{path:'/user/personal'}">
                  <p>{{personal}}</p>
                </v-tab>
                <v-tab :to="{path:'/user/add-post'}" v-if="isAdmin == false">
                  <p>{{createPost}}</p>
                </v-tab>
                <v-tab :to="{path:'/user/my-posts'}"  v-if="isAdmin == false">
                  <p>{{myPost}}</p>
                </v-tab>
                <v-tab :to="{path:'/user/redact-post'}"  v-if="redactShow == this.$route.path">
                  <p>{{redakt}}</p>
                </v-tab>
                <v-tab :to="{path:'/user/verified-post'}" v-if="isAdmin == true">
                  <p>{{moderate}}</p>
                </v-tab>
                <v-tab :to="{path:'/user/unverified-post'}" v-if="isAdmin == true">
                  <p>{{noModerate}}</p>
                </v-tab>
              </v-tabs>
              <router-view></router-view>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      redactShow: '/user/redact-post',
      isAdmin: (localStorage.getItem('userRole') == "1") ? true : false,
      personal: 'Персональные данные',
      redakt: 'Редактировать объявление',
      myPost: 'Мои объявления',
      createPost: 'Создать объявление',
      moderate: 'Проверенные объявления',
      noModerate: 'Непроверенные объявления'
    }
  },
  computed: {
    ...mapState([
      'user', 'isAuth'
    ])
  },
  created () {
    if (this.isAuth == false) {
      this.$router.push({name: 'Page404'})
    }
  }
}
</script>