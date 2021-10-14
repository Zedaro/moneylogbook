import Vue from "vue";
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import OverviewPage from "@/components/OverviewPage";


const routes = [
  {
    path: '/',
    component: OverviewPage
  }
]


export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})