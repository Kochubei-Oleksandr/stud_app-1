<template>
<!-- <v-layout row wrap align-center justify-center>
    <v-flex flex xs12 sm10 md10 lg8 xl8>
        <h1>Персональные данные: {{user}}</h1>
    </v-flex>
</v-layout> -->
<section>
  <v-container grid-list-xl>
    <v-layout row wrap justify-center class="my-1">
      <v-flex xs12 md6>
        <v-card class="elevation-0 transparent">
          <v-card-title primary-title class="layout justify-center">
            <div class="headline">Добро пожаловать, {{user.name}}</div>
          </v-card-title>
          <v-list class="transparent">
            <v-list-tile>
              <v-list-tile-action>
                <v-icon class="blue--text text--lighten-2">email</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{user.user_email}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex xs12 md6>
        <v-card class="elevation-0 transparent">
          <v-card-title primary-title class="layout justify-center">
            <div class="headline">Информация о сервисе</div>
          </v-card-title>
          <v-card-text class="about__company">
            Baraholka предлагает быстрый способ покупать, продавать или обмениваться товарами и услугами в 
            конкретных странах путем публикации объявлений. Каждый месяц миллионы людей по всему миру 
            продают и покупают с помощью Baraholka разнообразные товары, включая предметы быта, мебель, товары 
            длительного потребления, музыкальные инструменты, автомобили и мотоциклы, электронику и мобильные 
            устройства, недвижимость и услуги. Название Baraholka происходит от фразы «online Barahlo 
            («барахло онлайн»), что полностью отображает суть современных досок объявлений.
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'user'
    ])
  }
}
</script>

<style>
.about__company {
  text-align: justify;
}
</style>



