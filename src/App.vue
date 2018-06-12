<template>
  <div id="app">
    <v-app id="inspire">
      <v-navigation-drawer
          :clipped="$vuetify.breakpoint.lgAndUp"
          v-model="drawer"
          fixed
          app
          >
            <v-btn v-on:click="sortAction" flat depressed :to="{name: 'ShowPosts', params: { page: 1 }}">Показать все объявления</v-btn>
            <v-btn v-on:click="sortAction" flat depressed :to="{name: 'MainPage'}">Показать все VIP-объявления</v-btn>
            <div>
                <v-radio-group v-model="sortCost">
                    <p>Сортировка по стоимости</p>
                    <v-radio v-on:change="sortAction" label="Сначала дешевые" value="2"></v-radio>
                    <v-radio v-on:change="sortAction" label="Сначала дорогие" value="1"></v-radio>
                </v-radio-group>
                <v-radio-group v-model="sortDate">
                    <p>Сортировка по дате публикации</p>
                    <v-radio v-on:change="sortAction" label="Сначала новые" value="1"></v-radio>
                    <v-radio v-on:change="sortAction" label="Сначала старые" value="2"></v-radio>
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
                                            <v-checkbox v-on:change="sortAction" :id="child.id" :value="child.id" v-model="categories"></v-checkbox>
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
                                            <v-checkbox v-on:change="sortAction" :id="child.id" :value="child.id" v-model="cities"></v-checkbox>
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
                <v-btn v-on:click="sortAction" flat depressed :to="{name: 'MainPage'}" class="hidden-sm-and-down">Baraholka</v-btn>
            </v-toolbar-title>
            <v-text-field
                v-on:keyup.enter="sortAction"
                v-model="messageSearch"
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
      <router-view></router-view>
      <template>
        <div class="text-xs-center">
            <v-pagination :length="this.showPosts.count_post" v-on:click="prevPage(sortAction())" v-model="currentPage" :total-visible="7"></v-pagination>
        </div>
      </template>
      <div>
            <div class="pagination">
                <div class="pagination__left"  v-on:click="prevPage(sortAction())">
                    <router-link v-if="currentPage != 1" :to="{ name: 'ShowPosts', params: { page: (this.currentPage - 1)} }">Назад</router-link>
                </div>
                <div class="pagination__right"  v-on:click="nextPage(sortAction())">
                    <router-link v-if="currentPage != showPosts.count_post" :to="{ name: 'ShowPosts', params: { page: (this.currentPage + 1) } }">Вперед</router-link>
                </div>
            </div>
        </div>
    </v-app>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'App',
  data: () => ({
      page: 1,
      currentPage: 1,
      messageSearch: '',
      drawer: null,
      categories: [],
      cities: [],
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
    }),
  computed: {
      ...mapState(['nav','authNav','isAuth','categoriesList','cityList','regionList', 'showPosts'])
  },
  created () {
    this.$store.dispatch('loadCategoriesList');
    this.$store.dispatch('loadCityList');
    this.$store.dispatch('loadRegionsList');
    this.$store.dispatch('sortPost');
  },
  methods: {
    nextPage: function() {
        if (this.currentPage > this.showPosts.count_post) {
            return this.currentPage = this.showPosts.count_post
        } else {
            return this.currentPage += 1
        }
    },
    prevPage: function() {
        if (this.currentPage < 2) {
            return this.currentPage = 1
        } else {
            return this.currentPage -= 1
        }
    },
    pathMain: function() {
        var path = (/\//.test(this.$route.path))
        return path
    },
    pathProducts: function() {
        var path = (/products\/\d+/.test(this.$route.path))
        return path
    },
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
        this.$nextTick(function () {
            this.$store.dispatch('sortPost', {
                cities: this.cities,
                categories: this.categories,
                data: this.messageSearch,
                page: this.currentPage,
                date: this.sortDate, 
                price: this.sortCost,
                path: this.$route.path
            })
        })
    }
  }
}
</script>


<style>
    .application--wrap{
        min-height: 0px;
    }
</style>