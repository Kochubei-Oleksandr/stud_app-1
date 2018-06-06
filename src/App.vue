<template>
  <div id="app">
    <v-app id="inspire">
      <v-navigation-drawer
          :clipped="$vuetify.breakpoint.lgAndUp"
          v-model="drawer"
          fixed
          app
          >
            <v-btn flat depressed :to="{name: 'ShowPosts'}">Показать все объявления</v-btn>
            <v-btn flat depressed :to="{name: 'MainPage'}">Показать все VIP-объявления</v-btn>
            <div v-if="(('/' == this.$route.path) || ('/products' == this.$route.path))">
                <v-radio-group v-model="sortDate">
                    <p>Сортировка по дате публикации</p>
                    <v-radio v-on:change="sortAction" label="Сначала новые" value="1"></v-radio>
                    <v-radio v-on:change="sortAction" label="Сначала старые" value="2"></v-radio>
                </v-radio-group>
                <v-radio-group v-model="sortCost">
                    <p>Сортировка по стоимости</p>
                    <v-radio v-on:change="sortAction" label="Сначала дешевые" value="1"></v-radio>
                    <v-radio v-on:change="sortAction" label="начала дорогие" value="2"></v-radio>
                </v-radio-group>
                <v-list dense>
                    <template v-for="item in items1">
                        <v-list-group
                        v-model="item.model"
                        :key="item.text"
                        :prepend-icon="item.model ? item.icon : item['icon-alt']"
                        append-icon=""
                        >
                            <v-list-tile slot="activator">
                                <v-list-tile-content>
                                    <v-list-tile-title>
                                        {{ item.text }}
                                    </v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile
                            v-for="(child, i) in categoriesList"
                            :key="i"
                            @click=""
                            >
                                <v-list-tile-content>
                                    <v-list-tile avatar>
                                        <v-list-tile-action>
                                            <v-checkbox v-model="categories"></v-checkbox>
                                        </v-list-tile-action>
                                        <v-list-tile-content>
                                            <v-list-tile-title>{{ child.category }}</v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list-group>
                    </template>
                </v-list>
                <v-list dense>
                    <v-list-tile-title>Выберите нужный регион</v-list-tile-title>
                    <template v-for="item in regionList">
                        <v-list-group
                        v-model="item.model"
                        :key="item.text"
                        :prepend-icon="item.model ? iconUp : iconDown"
                        append-icon=""
                        >
                            <v-list-tile slot="activator">
                                <v-list-tile-content>
                                    <v-list-tile-title>
                                        {{ item.region }}
                                    </v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile
                            v-for="(child, i) in cityList"
                            v-if="((item.id == child.id_region))"
                            :key="i"
                            @click=""
                            >
                                <v-list-tile-content>
                                    <v-list-tile avatar>
                                        <v-list-tile-action>
                                            <v-checkbox v-model="cities"></v-checkbox>
                                        </v-list-tile-action>
                                        <v-list-tile-content>
                                            <v-list-tile-title>{{ child.city }}</v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list-group>
                    </template>
                </v-list>
            </div>
        </v-navigation-drawer>
        <v-toolbar
        :clipped-left="$vuetify.breakpoint.lgAndUp"
        color="blue darken-3"
        dark
        app
        fixed
        >
            <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
                <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
                <v-btn flat depressed :to="{name: 'MainPage'}" class="hidden-sm-and-down">Baraholka</v-btn>
            </v-toolbar-title>
            <v-text-field
                flat
                solo-inverted
                prepend-icon="search"
                label="Search"
                class="hidden-sm-and-down"
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-btn
                flat
                v-for="item in nav"
                :to="item.path"
                :key="item.path"
                v-if="item.auth === 'both' || item.auth === isAuth"
            >{{ item.title }}
            </v-btn>

            <v-btn flat v-if="isAuth == true" @click="logoutActions" :to="{name: 'MainPage'}">Выйти</v-btn>

            <v-btn
                flat
                v-for="item in authNav"
                :to="item.path"
                :key="item.path"
                v-if="item.auth === isAuth"
            >{{ item.title }}
            </v-btn>
        </v-toolbar>
      <router-view/>
    </v-app>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'App',
  computed: {
      ...mapState(['nav','authNav','isAuth','categoriesList','cityList','regionList'])
  },
  created () {
    this.$store.dispatch('loadCategoriesList');
    this.$store.dispatch('loadCityList');
    this.$store.dispatch('logout');
    this.$store.dispatch('loadRegionsList');
  },
  methods: {
    logoutActions: function () {
      this.$store.dispatch('logout', {token: localStorage.getItem('apiToken')})
        .then(() => {
          this.hasError = false
          if (this.isAuth){
            this.$router.push({name: 'MainPage'})
          }
        }).catch(err => {
          if (err.response.status !== 200) {
            this.hasError = true
          }
        })
    },
    sortAction: function () {
        ('/' == this.$route.path) ? this.sortPath = 'main' : this.sortPath = 'posts'
        this.$store.dispatch('sortPost', {date: this.sortDate, price: this.sortCost, path: this.sortPath})
        .then(() => {
            this.hasError = false
        }).catch(err => {
            if (err.response.status !== 200) {
                this.hasError = true
            }
        })
    }
  },
  data: () => ({
      drawer: null,
      categories: '',
      cities: '',
      sortPath: '',
      sortDate: '',
      sortCost: '',
      iconUp: 'keyboard_arrow_up',
      iconDown: 'keyboard_arrow_down',
      iconModel: false,
      items1: [
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Категории',
          model: false
        }
      ]
    })
}
</script>
