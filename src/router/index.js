import Vue from 'vue'
import Router from 'vue-router'
import AddsList from '@/components/AddsList'
import Login from '@/components/Login'
import Register from '@/components/Register'
import SingleAdd from '@/components/SingleAdd'
import AddForm from '@/components/AddForm'
import Page404 from '@/components/Page404'
import ShowPosts from '@/components/ShowPosts'
import ShowPost from '@/components/ShowPost'
import MainPage from '@/components/MainPage'
import User from '@/components/User'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/products',
      name: 'ShowPosts',
      component: ShowPosts
    },
    {
      path: '/products/:id(\\d+)',
      name: 'ShowPost',
      component: ShowPost
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/add:id(\\d+)',
      name: 'SingleAdd',
      component: SingleAdd
    },
    {
      path: '/:id(\\d+)',
      name: 'AddForm',
      component: AddForm
    },
    {
      path: '*',
      name: 'Page404',
      component: Page404
    }
  ],
  mode: 'history'
})
