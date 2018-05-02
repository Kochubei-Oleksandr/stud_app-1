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
        name: 'test3'  {
      path: '/',
      name: 'AddsList',
      component: AddsList
    },
      }
    ],
    addItem: {},
    user: {},
    isAuth: false
  },
  mutations: {
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
      state.user = data
    }
  },
  actions: {
    setList (context, params) {
      context.commit('updateAddsList', params.data)
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
      return axios.post(API.login, params, {withCredentials: true})
        .then(responce => {
          context.commit('updateUser', responce.data)
          context.commit('updateAuth', true)
        })
    }
  }
})

export default Store
