<template>
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

                <v-select
                :items="cityList"
                item-value="id"
                item-text="city"
                v-model="idCity"
                prepend-icon="location_city"
                label="Выберите ваш город"
                hint="Нажмите, что бы выбрать город"
                persistent-hint>
                </v-select>

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

                    <v-btn v-if="readyToUpload" @click="uploadImage">
                        <v-icon left>cloud_upload</v-icon>
                        Upload File
                    </v-btn>
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
    <!-- {{cityList}} -->
  </v-container>
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
        // this.regions = this.regionList
    },
    data () {
        return {
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
            token: localStorage.getItem('apiToken'),
            regions: [],
            category: [
                {
                value: 1,
                text: 'Автомобили'
                },
                {
                value: 2,
                text: 'Компьютеры'
                },
                {
                value: 3,
                text: 'Телефоны'
                }
            ],
            city: [
                {
                value: 1,
                text: 'Киев'
                },
                {
                value: 2,
                text: 'Сумы'
                },
                {
                value: 3,
                text: 'Харьков'
                }
            ],
            status: [
                {
                value: 1,
                text: 'Новое'
                },
                {
                value: 2,
                text: 'Б\У'
                }
            ]
        }
    },
   methods: {
        createdPostAction: function () {

            let data = new FormData();
            data.append("fupload", this.formData.file);
            alert (data.append("fupload", this.formData.file));

            axios.post("/upload_file", data, {withCredentials: true}).then(response => {
                alert (data);
                this.showInfo(data);
                this.formData = {
                    displayFileName: null,
                    uploadFileData: null,
                    file: null
                };
            });

            this.$store.dispatch('createdPost', {
                title: this.title,
                text: this.text,
                telephone: this.telephone,
                price: this.price,
                img: this.img,
                idPostCategory: this.idPostCategory,
                idCity: this.idCity,
                idStatus: this.idStatus,
                token: this.token
            })
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

        uploadImage() {
            let data = new FormData();
            data.append("fupload", this.formData.file);

            axios.post("/upload_file", data).then(response => {
                this.showInfo("File was successfuly uploaded11111!");
                this.formData = {
                    displayFileName: null,
                    uploadFileData: null,
                    file: null
                };
            });
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
