import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import API from './api'

Vue.use(Vuex)

const Store = new Vuex.Store({
  state: {
    user: {
      userRole: (localStorage.getItem('userRole')) ? localStorage.getItem('userRole') : null,
      userId: (localStorage.getItem('userId')) ? localStorage.getItem('userId') : null,
      apiToken: (localStorage.getItem('apiToken')) ? localStorage.getItem('apiToken') : null,
      name: (localStorage.getItem('name')) ? localStorage.getItem('name') : null
    },
    isAuth: ( (localStorage.getItem('apiToken') == null) || (localStorage.getItem('apiToken') == "undefined") ) ? false : true,
    showPosts: [],
    adminPosts: [],
    myPosts: [],
/*     showPost:  [], */
    nav: [
      { path: "/user/personal", title: "Личный кабинет", auth: true }
    ],
    authNav: [
        { path: "/register", title: "Register", auth: false },
        { path: "/login", title: "Login", auth: false }
    ],
    categoriesList: [],
    cityList: [],
    regionList: [],
    statusList: []
  },

  mutations: {
    loadShowMyPosts (state, data) {
      state.myPosts = data
    },
    loadShowPosts (state, data) {
      state.showPosts = data
    },
    loadShowAdminPosts (state, data) {
      state.adminPosts = data
    },
    loadCatList (state, data) {
      state.categoriesList = data
    },
    loadTownList (state, data) {
      state.cityList = data
    },
    loadRegionList (state, data) {
      state.regionList = data
    },
    loadStatusList (state, data) {
      state.statusList = data
    },
    updateAuth (state, data) {
      state.isAuth = data
    },
    updateUser (state, data) {
      state.user = data,
      localStorage.setItem("userId", data.user_id),
      localStorage.setItem("apiToken", data.api_token),
      localStorage.setItem("userRole", data.user_role),
      localStorage.setItem("name", data.name)
    }
  },

  actions: {
    sortPost (context, params) {
      return axios.post(API.sort, JSON.stringify(params), {withCredentials: true})
      .then(responce => {
        context.commit('loadShowPosts', responce.data)
      })
    },
    sortPostAdmin (context, params) {
      return axios.post(API.sortAdmin, JSON.stringify(params), {withCredentials: true})
      .then(responce => {
        context.commit('loadShowAdminPosts', responce.data)
      })
    },
    loadMyPosts (context, params) {
      return axios.get(API.myPosts, params)
      .then(responce => {
        context.commit('loadShowMyPosts', responce.data)
      })
    },
    /* sortCategoryPost (context, params) {
      return axios.post(API.sortCategory, JSON.stringify(params), {withCredentials: true})
      .then(responce => {
        context.commit('loadShowPosts', responce.data)
      })
    },
    searchPost (context, params) {
      return axios.post(API.search, JSON.stringify(params), {withCredentials: true})
      .then(responce => {
        context.commit('loadShowPosts', responce.data)
      })
    },
    showPostsLoad (context, params) {
      return axios.get(API.products + params.page)
        .then(responce => {
          context.commit('loadShowPosts', responce.data)
        })
    }, */
    /* showVipPostsLoad (context, params) {
      return axios.get(API.productsVip)
        .then(responce => {
          context.commit('loadVipShowPosts', responce.data)
        })
    }, */
    /* showPostLoad (context, params) {      
      return axios.get(API.product + params.id)
        .then(responce => {
        context.commit('loadShowPost', responce.data)
        })
    }, */
    loadCategoriesList (context, params) {
      return axios.get(API.categoriesList)
        .then(responce => {
          context.commit('loadCatList', responce.data)
        })
    },
    loadCityList (context, params) {
      return axios.get(API.cityList)
        .then(responce => {
          context.commit('loadTownList', responce.data)
        })
    },
    loadRegionsList (context, params) {
      return axios.get(API.regionList)
        .then(responce => {
          context.commit('loadRegionList', responce.data)
        })
    },
    loadStatusList (context, params) {
      return axios.get(API.statusList)
        .then(responce => {
          context.commit('loadStatusList', responce.data)
        })
    },
    login (context, params) {
      return axios.post(API.login, JSON.stringify(params), {withCredentials: true})
      .then(responce => {
        context.commit('updateUser', responce.data)
        context.commit('updateAuth', true)
      })
    },
    logout (context, params) {
      return axios.post(API.logout, JSON.stringify(params), {withCredentials: true})
      .then(responce => {
        context.commit('updateUser', responce.data)
        context.commit('updateAuth', false)
      })
    },
    register (context, params) {
      return axios.post(API.register, JSON.stringify(params), {withCredentials: true})
      .then(responce => {
        context.commit('updateUser', responce.data)
        context.commit('updateAuth', true)
      })
    },
    createdPost (context, params) {
      return axios.post(API.product, params, {withCredentials: true})
      .then(responce => {
        alert('Запись была успешно добавлена')
      })
    },
    deletePost (context, params) {
      return axios.delete(API.product, params)
      .then(responce => {
        alert('Запись была успешно удалена')
      })
    },
    updatePost (context, params) {
      return axios.post(API.productUpdate, params, {withCredentials: true})
      .then(responce => {
        alert('Запись была успешно изменена')
      })
    }
  }
})

export default Store
