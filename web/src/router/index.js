import axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import HomeView from '../views/HomeView.vue'
import OlderSchedulesView from '../views/OlderSchedulesView.vue'
import RegisterView from '../views/RegisterView.vue'

Vue.use(VueRouter)

async function validateSession(){
  if(localStorage.getItem('token') != undefined){

    var req = {
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    
    try{
      await axios.post('http://localhost:3300/user/authenticate', {}, req);
    }catch(err){
      return false;
    }
    return true;
  }
  else{
    return false;
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    beforeEnter: async (to, from, next) => {
      await validateSession() ? next() : next('/')
    }
  },
  {
    path: '/dashboard/older',
    name: 'dashboard-older',
    component: OlderSchedulesView,
    beforeEnter: async (to, from, next) => {
      await validateSession() ? next() : next('/')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
