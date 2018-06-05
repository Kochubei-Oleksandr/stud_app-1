import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'
import Page404 from '@/components/Page404'
import ShowPosts from '@/components/ShowPosts'
import ShowPost from '@/components/ShowPost'
import MainPage from '@/components/MainPage'
import User from '@/components/adminka/User'
import AddPost from '@/components/adminka/AddPost'
import MyPosts from '@/components/adminka/MyPosts'
import PersonalData from '@/components/adminka/PersonalData'
import RedactPost from '@/components/adminka/RedactPost'

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
      component: User,
      children: [
        {
          path: 'personal',
          name: 'PersonalData',
          component: PersonalData
        },
        {
          path: 'add-post',
          name: 'AddPost',
          component: AddPost
        },
        {
          path: 'my-posts',
          name: 'MyPosts',
          component: MyPosts,
        },
        {
          path: 'redact-post',
          name: 'RedactPost',
          component: RedactPost
        }
      ]
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
      path: '*',
      name: 'Page404',
      component: Page404
    }
  ],
  mode: 'history'
})
