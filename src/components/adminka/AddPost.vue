<template>
<div>
  <v-container fluid fill-height>
    <v-layout justify-center>
      <v-flex xs12 sm10 md8>
        <v-card class="elevation-12">
        <v-toolbar dark color="primary">
            <v-toolbar-title>Форма для создания объявления</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <v-form>
                <v-text-field
                v-model="title"
                prepend-icon="short_text"
                :rules="[(v) => v.length <= 100 || 'Max 100 characters']"
                :counter="100"
                label="Заголовок">
                </v-text-field>

                <v-text-field
                v-model="text"
                prepend-icon="wrap_text"
                name="text"
                label="Описание"
                multi-line :rules="[(v) => v.length <= 500 || 'Max 500 characters']"
                :counter="500">
                </v-text-field>

                <v-text-field
                v-model="telephone"
                name="input-1-3"
                label="Телефон для связи"
                prepend-icon="phone">
                </v-text-field>

                <v-text-field
                v-model="price"
                prepend-icon="₴"
                label="Стоимость">
                </v-text-field>

                <v-select
                :items="categoriesList"
                item-value="id"
                item-text="category"
                v-model="idPostCategory"
                prepend-icon="category"
                label="Выберите нужную категорию"
                hint="Нажмите, что бы выбрать категорию"
                persistent-hint>
                </v-select>
                
                <v-select
                :items="regionList"
                item-value="id"
                item-text="region"
                v-model="idRegion"
                prepend-icon="location_city"
                label="Выберите ваш регион"
                hint="Нажмите, что бы выбрать регион"
                persistent-hint>
                </v-select>

                <template v-if="(idRegion != '')" v-for="item in items1">
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
                        v-show="child.id_region == idRegion"
                        :key="i"
                        >
                            <v-list-tile-content>
                                <v-list-tile avatar>
                                    <v-list-tile-action>
                                        <v-radio-group v-model="idCity">
                                            <v-radio :id="child.id" :value="child.id"></v-radio>
                                        </v-radio-group>
                                    </v-list-tile-action>
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ child.city }}</v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list-group>
                </template>

                <v-select
                :items="statusList"
                item-value="id"
                item-text="status"
                v-model="idStatus"
                prepend-icon="fiber_new"
                label="Выберите состояние товара"
                hint="Нажмите, что бы выбрать состояние товара"
                persistent-hint>
                </v-select>

                <div>
                    <v-btn @click="onButtonClick">
                        <v-icon>attach_file</v-icon>
                        Select File
                    </v-btn>

                    <v-text-field
                        v-model="formData.displayFileName"
                        readonly
                    ></v-text-field>

                    <input type="file" class="input-field-file" ref="fupload" @change="onFileChange">

                    <div v-if="readyToUpload">
                        <img :src="formData.uploadFileData" class="preview-image">
                    </div>

                </div>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="createdPostAction" color="primary">Создать объявление</v-btn>
        </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>


<script>
import axios from 'axios'
import { mapState } from "vuex";

export default {
    computed: {
        ...mapState(['categoriesList','cityList','regionList','statusList']),
        readyToUpload() {
            return (
                this.formData.displayFileName && this.formData.uploadFileData
            );
        }
    },
    created () {
        this.$store.dispatch('loadCategoriesList');
        this.$store.dispatch('loadCityList');
        this.$store.dispatch('loadRegionsList');
        this.$store.dispatch('loadStatusList');
    },
    data () {
        return {
            items1: [
                {
                icon: 'keyboard_arrow_up',
                'icon-alt': 'keyboard_arrow_down',
                text: 'Выбирите нужный город',
                model: false
                }
            ],
            formData: {
                    displayFileName: null,
                    uploadFileData: null,
                    file: null
                },
            title: '',
            text: '',
            telephone: '',
            price: '',
            img: '',
            idPostCategory: '',
            idCity: '',
            idStatus: '',
            idRegion: '',
            token: localStorage.getItem('apiToken')
        }
    },
   methods: {
        createdPostAction: function () {

            let data = new FormData();
            data.append("fupload", this.formData.file);
            data.append("title", this.title);
            data.append("text", this.text);
            data.append("telephone", this.telephone);
            data.append("price", this.price);
            data.append("img", this.img);
            data.append("idPostCategory", this.idPostCategory);
            data.append("idCity", this.idCity);
            data.append("idStatus", this.idStatus);
            data.append("token", this.token);

            this.$store.dispatch('createdPost', data)
            .then(() => {
                this.hasError = false
                this.$router.push({name: 'MyPosts'})
                
            }).catch(err => {
                if (err.response.status !== 200) {
                    this.hasError = true
                }
            })
        },
        onFileChange(event) {
            if (event.target.files && event.target.files.length) {
                let file = event.target.files[0];
                this.img = event.target.files[0].name;
                this.formData.file = file;
                this.formData.displayFileName =
                    event.target.files[0].name +
                    " (" +
                    this.calcSize(file.size) +
                    "Kb)";

                let reader = new FileReader();
                reader.onload = e => {
                    this.formData.uploadFileData = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },

        onButtonClick() {
            this.$refs.fupload.click();
        },

        calcSize(size) {
            return Math.round(size / 1024);
        },

        showInfo(message) {
            this.$store.commit("showInfo", message);
        }
    }
}
</script>

<style>
.input-field-file {
    display: none;
}

.preview-image {
    width: 250px;
    padding: 15px;
    border: 1px solid #999;
    border-radius: 5px;
}
</style>
