/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Router from 'vue-router'
import register from '../components/register/register'
import login from '../components/login/login'
import accountmanage from '../components/accountmanage/accountmanage'
import mainpage from '../components/mainpage/mainpage'
import bestrecommend from '../components/recommend/bestrecommend'
import hotrecommend from '../components/recommend/hotrecommend'
import lastestrecommend from '../components/recommend/lastestrecommend'
import collection from '../components/collection/collection'
import ReceiveCount from '../components/eventBus/ReceiveCount'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/mainpage',
      name: 'mainpage',
      component: mainpage,
      children: [
        {
          path: '/bestrecommend',
          name: 'bestrecommend',
          component: bestrecommend
        }
        /* {
          path: '/hotrecommend',
          name: 'hotrecommend',
          component: hotrecommend
        },
        {
          path: '/lastestrecommend',
          name: 'lastestrecommend',
          component: lastestrecommend
        } */
      ]
    },
    {
      path: '/accountmanage',
      name: 'accountmanage',
      component: accountmanage
    },
    {
      path: '/ReceiveCount',
      name: 'ReceiveCount',
      component: ReceiveCount
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/collection',
      name: 'collection',
      component: collection
    },
    {
      path: '/register',
      name: 'register',
      component: register,
      children: [
        {
          path: '/login',
          name: 'login',
          component: login,
          children: [
            {
              path: '/register',
              name: 'register',
              component: register
            }
          ]
        }
      ]
    }
  ]
})
