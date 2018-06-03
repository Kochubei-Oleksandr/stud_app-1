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
    showPost:  [],
    showVipPosts: [],
    nav: [
      { path: "/user", title: "Личный кабинет", auth: true }
    ],
    authNav: [
        { path: "/register", title: "Register", auth: false },
        { path: "/login", title: "Login", auth: false }
    ],
    categoriesList: [],
    cityList: []
  },

  mutations: {
    loadShowPosts (state, data) {
      state.showPosts = data
    },
    loadShowPost (state, data) {
      state.showPost = data
    },
    loadVipPosts (state, data) {
      state.showVipPosts = data
    },
    loadCatList (state, data) {
      state.categoriesList = data
    },
    loadTownList (state, data) {
      state.cityList = data
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
    showPostsLoad (context, params) {
      return axios.get(API.products)
        .then(responce => {
          context.commit('loadShowPosts', responce.data)
        })
    },
    showPostLoad (context, params) {      
      return axios.get(API.product + params.id)
        .then(responce => {
        context.commit('loadShowPost', responce.data)
        })
    },
    showVipPostsLoad (context, params) {
      return axios.get(API.productsVip)
        .then(responce => {
          context.commit('loadVipPosts', responce.data)
        })
    },
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
      return axios.post(API.product, JSON.stringify(params), {withCredentials: true})
      .then(responce => {
        alert ('SUCCESS');
      })
    }
  }
})

export default Store
