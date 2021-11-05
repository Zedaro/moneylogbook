import Vue from "vue";
import VueRouter from 'vue-router';
//import {store} from "@/store/store";

Vue.use(VueRouter)

import OverviewPage from "@/components/OverviewPage";
import TransactionsPage from "@/components/transactions/TransactionsPage";
import RepeatingTransactionsPage from "@/components/RepeatingTransactionsPage";
import MoneyAccountsPage from "@/components/moneyAccounts/page/MoneyAccountsPage";
import MoneyAccountForm from "@/components/moneyAccounts/form/MoneyAccountForm";
import TransactionForm from "@/components/transactions/form/TransactionForm";


const routes = [
  {
    path: '/',
    redirect: { name: 'overview' }
  },
  {
    path: '/overview',
    name: 'overview',
    component: OverviewPage,
    meta: { title: 'Übersicht' }
  },
  {
    path: '/transactions',
    name: 'transactions',
    component: TransactionsPage,
    meta: { title: 'Transaktionen' }
  },
  {
    path: '/transactions/:item',
    name: 'transactionForm',
    component: TransactionForm,
    meta: { formType: 'Transaktions-Formular' }
  },
  {
    path: '/repeatingTransactions',
    name: 'repeatingTransactions',
    component: RepeatingTransactionsPage,
    meta: { title: 'Daueraufträge' }
  },
  {
    path: '/moneyAccounts',
    name: "moneyAccounts",
    component: MoneyAccountsPage,
    meta: { title: 'Konten' }
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
    component: MoneyAccountForm,
    meta: { formType: 'Konto-Formular' }
    /*
    beforeEnter: (to) =>  {
      if(to.params.item == 'new') {
        this.$store.dispatch('setTitle', 'Neues Konto');
      }
      else {
        this.$store.dispatch('setTitle', 'Konto bearbeiten');
      }
    }
    */
  },
  {
    path: '/:primaryPage/:detailsPage',
  }
]

export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

/*
router.afterEach( (to) => {
  const name = to.name;

  if(name === 'overview')
    store.dispatch('setTitle', 'Übersicht');
  else if(name === 'transactions')
    store.dispatch('setTitle', 'Transaktionen');
  else if(name === 'repeatingTransactions')
    store.dispatch('setTitle', 'Daueraufträge');
  else if(name === 'moneyAccounts')
    store.dispatch('setTitle', 'Konten');
  else if(name === 'moneyAccountForm') {
    if(to.params.item === 'new')
      store.dispatch('setTitle', 'Neues Konto');
    else
      store.dispatch('setTitle', 'Konto bearbeiten');
  }
} );

 */