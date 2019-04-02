import Vue from 'vue'
import Router from 'vue-router'
import register from '../components/register/register'
import login from '../components/login/login'
import homepage from '../components/homepage/homepage'
import about from '../components/about/about'
/* import recentwork from '../components/recentwork/recentwork' */
import classification from '../components/classification/classification'
import friendlylinks from '../components/friendlylinks/friendlylinks'
import bestrecommend from '../components/recommend/bestrecommend'
import hotrecommend from '../components/recommend/hotrecommend'
import lastestrecommend from '../components/recommend/lastestrecommend'
import hotcompanys from '../components/recommend/hotcompanys'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/homepage',
      name: 'homepage',
      component: homepage
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    /*     {
      path: '/recentwork',
      name: 'recentwork',
      component: recentwork
    }, */
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/classification',
      name: 'classification',
      component: classification
    },
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
    },
    {
      path: '/hotcompanys',
      name: 'hotcompanys',
      component: hotcompanys
    },
    {
      path: '/friendlylinks',
      name: 'friendlylinks',
      component: friendlylinks
    }
  ]
})
