import Vue from "vue";
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import OverviewPage from "@/components/OverviewPage";
import TransactionsPage from "@/components/TransactionsPage";
import RepeatingTransactionsPage from "@/components/RepeatingTransactionsPage";
import MoneyAccountsPage from "@/components/moneyAccounts/page/MoneyAccountsPage";
import MoneyAccountForm from "@/components/moneyAccounts/form/MoneyAccountForm";


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
    name: 'moneyAccountForm',
    component: MoneyAccountForm
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