<template>
  <v-app id="inspire">
        <v-content style="padding-top: 0;">
            <v-container fluid grid-list-xl>
              <v-tabs
              dark
              color="cyan"
              show-arrows
              >
                <v-tabs-slider color="yellow"></v-tabs-slider>
                <v-tab :href="'#tab-1'">
                  <p>{{personal}}</p>
                </v-tab>
                <v-tab :href="'#tab-2'" v-if="isAdmin == false">
                  <p>{{createPost}}</p>
                </v-tab>
                <v-tab :href="'#tab-3'" v-if="isAdmin == false">
                  <p>{{myPost}}</p>
                </v-tab>
                <v-tab :href="'#tab-4'" v-if="isAdmin == true">
                  <p>{{moderate}}</p>
                </v-tab>
                <v-tab :href="'#tab-5'" v-if="isAdmin == true">
                  <p>{{noModerate}}</p>
                </v-tab>
                <v-tabs-items>
                  <v-tab-item :id="'tab-1'">
                    <PersonalData></PersonalData>
                  </v-tab-item>
                  <v-tab-item :id="'tab-2'">
                    <AddPost></AddPost>
                  </v-tab-item>
                  <v-tab-item :id="'tab-3'">
                    <v-layout row wrap align-center justify-center>
                      <v-flex flex xs12 sm10 md10 lg8 xl8>
                            <h1>{{myPost}} {{user}}</h1>
                        </v-flex>
                    </v-layout>
                  </v-tab-item>
                  <v-tab-item :id="'tab-4'">
                    <v-layout row wrap align-center justify-center>
                      <v-flex flex xs12 sm10 md10 lg8 xl8>
                            <h1>{{moderate}} {{user}}</h1>
                        </v-flex>
                    </v-layout>
                  </v-tab-item>
                  <v-tab-item :id="'tab-5'">
                    <v-layout row wrap align-center justify-center>
                      <v-flex flex xs12 sm10 md10 lg8 xl8>
                            <h1>{{noModerate}} {{user}}</h1>
                        </v-flex>
                    </v-layout>
                  </v-tab-item>
                </v-tabs-items>
              </v-tabs>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import { mapState } from 'vuex'
import PersonalData from './PersonalData.vue'
import AddPost from './AddPost.vue'

export default {
  components: {
    PersonalData,
    AddPost
  },
  data () {
    return {
      isAdmin: (localStorage.getItem('userRole') == "1") ? true : false,
      personal: 'Персональные данные',
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
    };
  }
}
</script>