import Vue from 'vue'
import Router from 'vue-router'
import register from '../components/register/register'
import login from '../components/login/login'
import mainpage from '../components/mainpage/mainpage'
import bestrecommend from '../components/recommend/bestrecommend'
import hotrecommend from '../components/recommend/hotrecommend'
import lastestrecommend from '../components/recommend/lastestrecommend'

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
        },
        {
          path: '/hotrecommend',
          name: 'hotrecommend',
          component: hotrecommend
        },
        {
          path: '/lastestrecommend',
          name: 'lastestrecommend',
          component: lastestrecommend
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
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
