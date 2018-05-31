import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import API from './api'

Vue.use(Vuex)

const Store = new Vuex.Store({
  state: {
    addsList: [
      {
        id: '1',
        name: 'test1'
      },
      {
        id: '2',
        name: 'test2'
      },
      {
        id: '3',
        name: 'test3'
      }
    ],
    addItem: {},
    user: {
      userRole: (localStorage.getItem('userRole')) ? localStorage.getItem('userRole') : null,
      userId: (localStorage.getItem('userId')) ? localStorage.getItem('userId') : null,
      apiToken: (localStorage.getItem('apiToken')) ? localStorage.getItem('apiToken') : null,
      name: (localStorage.getItem('name')) ? localStorage.getItem('name') : null
    },
    isAuth: (localStorage.getItem('apiToken')) ? true : false,
    showPosts: [],
    showPost:  [],
    showVipPosts: [],
    nav: [
      { path: "/user", title: "Личный кабинет", auth: true },
    ],
    authNav: [
        { path: "/register", title: "Register", auth: false },
        { path: "/login", title: "Login", auth: false }
    ]
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
    updateAddsList (state, data) {
      state.addsList = data
    },
    updateAddItem (state, data) {
      state.addItem = data
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
    setList (context, params) {
      context.commit('updateAddsList', params.data)
    },
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
    loadById (context, params) {
      context.state.addsList.forEach(item => {
        if (item.id === params.id) {
          let editedItem = {}
          Object.assign(editedItem, item)
          context.commit('updateAddItem', editedItem)
        }
      })
    },
    save (context, params) {
      context.state.addsList.forEach(item => {
        if (item.id === params.item.id) {
          item.name = params.item.name
        }
      })

      context.commit('updateAddsList', context.state.addsList)
    },
    login (context, params) {
      return axios.post(API.login, JSON.stringify(params), {withCredentials: true})
      .then(responce => {
        context.commit('updateUser', responce.data)
        context.commit('updateAuth', true)
      })
    }
  }
})

export default Store
