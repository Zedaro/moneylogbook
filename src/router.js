import Vue from "vue";
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import OverviewPage from "@/components/OverviewPage";
import TransactionsPage from "@/components/TransactionsPage";
import RepeatingTransactionsPage from "@/components/RepeatingTransactionsPage";
import MoneyAccountsPage from "@/components/MoneyAccountsPage";
import NewMoneyAccount from "@/components/MoneyAccountDetails";


const routes = [
  {
    path: '/',
    redirect: '/uebersicht'
  },
  {
    path: '/overview',
    name: 'overview',
    component: OverviewPage
  },
  {
    path: '/transactions',
    name: 'transactions',
    component: TransactionsPage
  },
  {
    path: '/repeatingTransactions',
    name: 'repeatingTransactions',
    component: RepeatingTransactionsPage
  },
  {
    path: '/moneyAccounts',
    name: "moneyAccounts",
    component: MoneyAccountsPage
  },
    /*
  {
    path: '/moneyAccounts/new',
    name: 'newMoneyAccount',
    component: NewMoneyAccount
  },
  {
    path: '/moneyAccounts/edit',
    name: 'editMoneyAccount',
    component: NewMoneyAccount
  },
     */

  {
    path: '/moneyAccounts/:item',
    name: 'moneyAccountItem',
    component: NewMoneyAccount
  },
  {
    path: '/:primaryPage/:detailsPage',
  }
]

export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})