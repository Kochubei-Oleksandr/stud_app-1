<template>
  <div id="app">
    <v-app id="inspire">
      <v-navigation-drawer
          :clipped="$vuetify.breakpoint.lgAndUp"
          v-model="drawer"
          fixed
          app
          >
            <v-btn class="navigation__first__btn" style="color: #135DB1" v-on:click="forStart(sortAction())" flat depressed :to="{name: 'ShowPosts', params: { page: 1 }}">Показать все объявления</v-btn>
            <v-btn style="color: #135DB1" v-on:click="forStart(sortAction())" flat depressed :to="{name: 'MainPage', params: { page: 1 }}">Показать все VIP-объявления</v-btn>
            <div v-if="((postsPage() == true) || (vipsPage() == true))">
                <div class="navigation__sort__p">
                    <p>Сортировка по дате публикации:</p>
                    <v-checkbox hide-details v-on:change="sortAction" v-model="sortDate" label="Сначала новые" value="1"></v-checkbox>
                    <v-checkbox hide-details v-on:change="sortAction" v-model="sortDate" label="Сначала старые" value="2"></v-checkbox>
                </div>
                <div class="navigation__sort__p">
                    <p>Сортировка по стоимости:</p>
                    <v-checkbox hide-details v-on:change="sortAction" v-model="sortCost" label="Сначала дешевые" value="2">></v-checkbox>
                    <v-checkbox hide-details v-on:change="sortAction" v-model="sortCost" label="Сначала дорогие" value="1">></v-checkbox>
                </div>
                <v-list dense>
                    <p class="navigation__sort__p">Выберите нужную категорию:</p>
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
                    <p class="navigation__sort__p">Выберите нужный регион:</p>
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
                <v-btn flat depressed :to="{name: 'Main'}" class="hidden-sm-and-down">Baraholka</v-btn>
            </v-toolbar-title>
            <v-text-field
                v-if="((postsPage() == true) || (vipsPage() == true))"
                v-on:keyup.enter="forStart(sortAction())"
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

            <v-btn exact flat v-if="isAuth == true" @click="logoutActions" :to="{name: 'MainPage'}">Выйти</v-btn>

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

        <div v-if="((postsPage() == true) || (vipsPage() == true))" class="pagination__main">
            <div class="pagination__left"  v-on:click="prevPage(sortAction())">
                <ul>
                    <li v-if="currentPage != 1"><a>Назад</a></li>
                </ul>
            </div>

            <div class="pagination__mid">
              <ul>
                <li v-if="hasFirst()" @click.prevent="firstPage(sortAction())"><a>1</a></li>
                <li v-if="hasFirst()">...</li>
                
                <li v-if="hasFirstPrev()" @click.prevent="prevPage(sortAction())"><a>{{ currentPage-1 }}</a></li>
                <li><a class="page_active">{{ currentPage }}</a></li>
                <li v-if="hasLastNext()" @click.prevent="nextPage(sortAction())"><a>{{ currentPage+1 }}</a></li>

                <li v-if="hasLast()">...</li>
                <li v-if="hasLast()" @click.prevent="lastPage(sortAction())"><a>{{ showPosts.count_post }}</a></li>
              </ul>
            </div>

            <div class="pagination__right"  v-on:click="nextPage(sortAction())">
                <ul>
                    <li v-if="currentPage != showPosts.count_post"><a>Вперед</a></li>
                </ul>
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
      currentPage: 1,
      page: 1,
      messageSearch: '',
      drawer: null,
      categories: [],
      cities: [],
      sortDate: '1',
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
    isNaN(this.$route.params.page) ? this.currentPage = 1 : this.currentPage = parseInt(this.$route.params.page);
    this.$store.dispatch('loadCategoriesList');
    this.$store.dispatch('loadCityList');
    this.$store.dispatch('loadRegionsList');
    this.$store.dispatch('sortPost', {
                cities: this.cities,
                categories: this.categories,
                data: this.messageSearch,
                page: this.$route.params.page,
                date: this.sortDate, 
                price: this.sortCost,
                path: this.$route.path
            })
  },
  methods: {
    forStart: function() {
        this.currentPage = 1
    },
    lastPage: function() {
        if ((/products\/\d+/.test(this.$route.path)) == true) {
            this.$router.push({ name: 'ShowPosts', params: { page: (this.showPosts.count_post)} })
        }
        if ((/^\/\d+/.test(this.$route.path)) == true) {
            this.$router.push({ name: 'MainPage', params: { page: (this.showPosts.count_post)} })
        }
        return this.currentPage = this.showPosts.count_post
    },
    firstPage: function() {
        if ((/products\/\d+/.test(this.$route.path)) == true) {
            this.$router.push({ name: 'ShowPosts', params: { page: 1} })
        }
        if ((/^\/\d+/.test(this.$route.path)) == true) {
            this.$router.push({ name: 'MainPage', params: { page: 1} })
        }
        return this.currentPage = 1
    },
    hasFirst: function() {
      return this.currentPage > 2
    },
    hasFirstPrev: function() {
      return this.currentPage > 1
    },
    hasLast: function() {
      return this.currentPage < this.showPosts.count_post - 1
    },
    hasLastNext: function() {
      return this.currentPage < this.showPosts.count_post
    },
    postsPage: function() {
        return /products\/\d+/.test(this.$route.path)
    },
    vipsPage: function() {
        return /\/\d+/.test(this.$route.path)
    },
    nextPage: function() {
        if ((/products\/\d+/.test(this.$route.path)) == true) {
            this.$router.push({ name: 'ShowPosts', params: { page: (this.currentPage + 1) } })
        }
        if ((/^\/\d+/.test(this.$route.path)) == true) {
            this.$router.push({ name: 'MainPage', params: { page: (this.currentPage + 1) } })
        }
        if (this.currentPage > this.showPosts.count_post) {
            return this.currentPage = this.showPosts.count_post
        } else {
            return this.currentPage += 1
        }
    },
    prevPage: function() {
        if ((/products\/\d+/.test(this.$route.path)) == true) {
            this.$router.push({ name: 'ShowPosts', params: { page: (this.currentPage - 1)} })
        }
        if ((/^\/\d+/.test(this.$route.path)) == true) {
            this.$router.push({ name: 'MainPage', params: { page: (this.currentPage - 1)} })
        }
        if (this.currentPage < 2) {
            return this.currentPage = 1
        } else {
            return this.currentPage -= 1
        }
    },
    logoutActions: function () {
      this.$store.dispatch('logout', {token: localStorage.getItem('apiToken')})
        .then(() => {
          this.hasError = false
          if (this.isAuth){
            this.$router.push({name: 'MainPage', params: { page: 1 }})
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
.navigation__first__btn {
    color: #135DB1;
    margin-top: 16px;
}
.navigation__sort__p{
    text-align: left;
    margin: 16px 10px 0 14px;
}
.navigation__sort__p p {
    margin-top: 10px;
    margin-bottom: 10px;
}
.btn__content:before {
    opacity: .0;
}
.application--wrap {
    min-height: 0px;
}
/* Пагинация */
.pagination__main {
  width: 50%;
  height: 44px;
  display: flex;
  justify-content: space-between;
  margin: 30px auto 30px;
  padding: 0 15px;
  max-width: 1280px;
}

.pagination__left, .pagination__right {
  width: 20%;
}

.pagination__left {
  float: left;
}
.pagination__left a {
  float: left;
}

.pagination__right {
  float: right;
}

.pagination__right a {
  float: right;
}

.pagination__main a, .pagination__main span {
  display: block;
  text-align: center;
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 300;
  line-height: 42px;
  height: 44px;
  color: #999;
  font-size: 18px;
}

.pagination__main a {
  padding: 0 20px;
  max-width: 160px;
  background-color: transparent;
  border-radius: 4px;
  border: 1px solid #ccc;
  text-decoration: none;
  margin: 0 6px;
  transition: all .2s ease-in-out;
}

.pagination__main a.current {
  border-color: #ea4c89;
  color: #ea4c89;
}

@media (hover) {
   .pagination__main a:hover {
      border-color: #ea4c89;
      color: #ea4c89;
   }
}

.pagination__mid {
  display: flex;
  justify-content: center;
  width: 60%;
}

.pagination__mid ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.pagination__mid li {
  display: inline-block;
}

.page_active {border: 1px solid #1665c0 !important; color: #1665c0 !important; cursor:  default !important;}
</style>