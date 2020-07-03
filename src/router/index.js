import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Cliente from '../components/client/Client'
import Funcionario from '../components/employee/Employee'
import Ponto from '../components/register/Register'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cliente',
    name: 'Cliente',
    component: Cliente
  },
  {
    path: '/funcionario',
    name: 'Funcionario',
    component: Funcionario
  },
  {
    path: '/ponto',
    name: 'Ponto',
    component: Ponto
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
