<template>
  <div id="app">
    <v-app id="inspire">
      <v-navigation-drawer
          :clipped="$vuetify.breakpoint.lgAndUp"
          v-model="drawer"
          fixed
          app
          >
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
                <template v-for="item in items">
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
                    v-else-if="item.children"
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
                        v-for="(child, i) in item.children"
                        :key="i"
                        @click=""
                        >
                            <v-list-tile-action v-if="child.icon">
                                <v-icon>{{ child.icon }}</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    {{ child.text }}
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list-group>
                    <v-list-tile v-else :key="item.text" @click="">
                        <v-list-tile-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>
                                {{ item.text }}
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
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
                <span class="hidden-sm-and-down">Baraholka</span>
            </v-toolbar-title>
            <v-text-field
                flat
                solo-inverted
                prepend-icon="search"
                label="Search"
                class="hidden-sm-and-down"
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-btn color="info">Вход</v-btn>
            <v-btn color="info">Регистрация</v-btn>
        </v-toolbar>
      <router-view/>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
      drawer: null,
      sortDate: 1,
      sortCost: 1,
      items: [
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Категории',
          model: false,
          children: [
            { text: 'Компьютеры' },
            { text: 'Автомобили' },
            { text: 'Для дома' },
            { text: 'Техника' },
            { text: 'Спорт' }
          ]
        },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Город',
          model: false,
          children: [
            { text: 'Сумы' },
            { text: 'Киев' },
            { text: 'Харьков' }
          ]
        }
      ]
    })
}
</script>
