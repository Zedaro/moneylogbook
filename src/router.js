import Vue from "vue";
import VueRouter from 'vue-router';
import { i18n } from "@/languages/lang";
//import {store} from "@/store/store";

Vue.use(VueRouter)

import OverviewPage from "@/components/OverviewPage";
import TransactionsPage from "@/components/transactions/TransactionsPage";
import RepeatingTransactionsPage from "@/components/repeatingTransactions/RepeatingTransactionsPage";
import MoneyAccountForm from "@/components/moneyAccounts/form/MoneyAccountForm";
import TransactionForm from "@/components/transactions/form/TransactionForm";
import RepeatingTransactionForm from "@/components/repeatingTransactions/form/RepeatingTransactionForm";
import TransfersPage from "@/components/transfer/TransfersPage";
import TransferForm from "@/components/transfer/TransferForm";
import TestCSS from "@/components/TestCSS";


const routes = [
  {
    path: '/',
    redirect: { name: 'overview' }
  },
  {
    path: '/testcss',
    name: 'testcss',
    component: TestCSS,
    meta: { title: 'testcss' }
  },
  {
    path: '/overview',
    name: 'overview',
    component: OverviewPage,
    meta: { title: i18n.t('headerTitle.moneyAccounts') }
  },
  {
    path: '/transactions',
    name: 'transactions',
    component: TransactionsPage,
    meta: { title: i18n.t('headerTitle.transactions') }
  },
  {
    path: '/transactions/:item',
    name: 'transactionForm',
    component: TransactionForm,
    meta: { formType: i18n.t('formType.transaction') }
  },
  {
    path: '/repeatingTransactions',
    name: 'repeatingTransactions',
    component: RepeatingTransactionsPage,
    meta: { title: i18n.t('headerTitle.repeatingTransactions') }
  },
  {
    path: '/repeatingTransactions/:item',
    name: 'repeatingTransactionForm',
    component: RepeatingTransactionForm,
    meta: { formType: i18n.t('formType.repeatingTransaction') }
  },
  {
    path: '/transfers',
    name: 'transfers',
    component: TransfersPage,
    meta: { title: i18n.t('headerTitle.transfers') }
  },
  {
    path: '/transfers/:item',
    name: 'transferForm',
    component: TransferForm,
    meta: { formType: i18n.t('formType.transfer') }
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
    meta: { formType: i18n.t('formType.moneyAccount') }
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