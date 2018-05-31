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
            <v-radio-group v-model="sortDate">
                <p>Сортировка по дате публикации</p>
                <v-radio label="Сначала новые" value="sortNew"></v-radio>
                <v-radio label="Сначала старые" value="sortOld"></v-radio>
            </v-radio-group>
            <v-radio-group v-model="sortCost">
                <p>Сортировка по стоимости</p>
                <v-radio label="Сначала дешевые" value="sortLowCost"></v-radio>
                <v-radio label="начала дорогие" value="sortMaxCost"></v-radio>
            </v-radio-group>
            <v-list dense>
                <template v-for="item in items1">
                    <v-layout
                    v-if="item.heading"
                    :key="item.heading"
                    row
                    align-center
                    >
                        <v-flex xs6>
                            <v-subheader v-if="item.heading">
                                {{ item.heading }}
                            </v-subheader>
                        </v-flex>
                        <v-flex xs6 class="text-xs-center">
                            <a href="#!" class="body-2 black--text">EDIT</a>
                        </v-flex>
                    </v-layout>
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
                                <v-list-tile-title>
                                    {{ child.category }}
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list-group>
                </template>
            </v-list>
            <v-list dense>
                <template v-for="item in items2">
                    <v-layout
                    v-if="item.heading"
                    :key="item.heading"
                    row
                    align-center
                    >
                        <v-flex xs6>
                            <v-subheader v-if="item.heading">
                                {{ item.heading }}
                            </v-subheader>
                        </v-flex>
                        <v-flex xs6 class="text-xs-center">
                            <a href="#!" class="body-2 black--text">EDIT</a>
                        </v-flex>
                    </v-layout>
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
                        v-for="(child, i) in cityList"
                        :key="i"
                        @click=""
                        >
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    {{ child.region }}
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list-group>
                </template>
            </v-list>
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
      ...mapState(['nav','authNav','isAuth','categoriesList','cityList'])
  },
  created () {
    this.$store.dispatch('loadCategoriesList');
    this.$store.dispatch('loadCityList');
  },
  data: () => ({
      drawer: null,
      sortDate: 1,
      sortCost: 1,
      items1: [
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Категории',
          model: false
        }
      ],
      items2: [
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Город',
          model: false
        }
      ]
    })
}
</script>
