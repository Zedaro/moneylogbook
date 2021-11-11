import Vuex from "vuex"
import Vue from "vue";
Vue.use(Vuex)



export const store = new Vuex.Store({
    state: {
        drawer: false,
        localStorage: null,

    },

        /*
        {
            drawer: false,
            toolbarTitle: 'Übersicht',
            moneyAccounts: [
                {
                    name: 'Sparkasse',
                    money: 1000,
                    color: "#EA0A8E"
                },
                {
                    name: 'ING DiBa',
                    money: 2000,
                    color: "#FF6600"
                }
            ]
        },
    */
    getters: {
        getLocalStorage() {
            return JSON.parse(localStorage.getItem('state'));
        },
        getState(state) {
            return state;
        },
        getDrawer: state => {
            return state.drawer;
        },
        getDrawerListItems(state) {
            return state.drawerListItems;
        },
        getToolbarTitle(state) {
            return state.localStorage.toolbarTitle;
        },
        getMoneyAccounts(state) {
            return state.localStorage.moneyAccounts;
        },
        getTotalMoney(state) {
            return state.localStorage.totalMoney;
        },
        getFormattedTotalMoney(state) {
            return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(state.localStorage.totalMoney)
        },
        getMoneyAccountNames(state) {
            let names = [];
            state.localStorage.moneyAccounts.forEach( (account) => names.push(account.name) );
            return names;
        },
        getTransactions(state) {
            return state.localStorage.transactions;
        }
    },
    actions: {
        setLocalStorage(context) {
          context.commit('setLocalStorage');
        },
        setState(context) {
            context.commit('setState');
        },
        setDrawer(context) {
            context.commit("setDrawer");
        },
        setTitle(context, title) {
          context.commit('setTitle', title);
        },
        saveMoneyAccount(context, data) {
            if(data.item === 'new') {
                context.commit('saveNewMoneyAccount', data);
            } else {
                context.commit('saveEditedMoneyAccount', data);
            }
        },
        deleteMoneyAccount(context, data) {
            context.commit('deleteMoneyAccount', data);
        },
        updateTotalMoney(context) {
            let totalMoney = 0;
            const moneyAccounts = context.state.localStorage.moneyAccounts;
            moneyAccounts.forEach(account => totalMoney += account.money);
            context.commit('updateTotalMoney', totalMoney);
        },
        saveTransaction(context, data) {
            //Das ist der Account von der neuen Transaktion!!!
            data.accountIndex = context.state.localStorage.moneyAccounts.findIndex(account => account.name === data.moneyAccount);

            if(data.item === 'new') {
                context.commit('saveNewTransaction', data);
            } else {
                //hol dir alte und neue Transaktion. Vergleiche die moneyAccount Einträge
                const oldTransaction = context.state.localStorage.transactions[data.item];
                data.oldTransaction = oldTransaction;
                if(oldTransaction.moneyAccount === data.moneyAccount) {
                    context.commit('saveEditedTransaction', data);
                } else {
                    data.oldAccountIndex = context.state.localStorage.moneyAccounts.findIndex(account => account.name === oldTransaction.moneyAccount);
                    context.commit('saveEditedTransactionWithNewMoneyAccount', data);
                }
            }
        },
        deleteTransaction(context, data) {
            data.accountIndex = context.state.localStorage.moneyAccounts.findIndex(account => account.name === data.moneyAccount);

            context.commit('deleteTransaction', data);
        }
    },
    mutations: {
        /*
        updateLocalStorage(state) {
            localStorage.setItem('state', JSON.stringify(state));
        },
        setState(state) {
            state.moneyAccounts = JSON.parse(localStorage.getItem('state')).moneyAccounts;
        },
        */
        setLocalStorage(state) {
            state.localStorage = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : ( () => {
                let obj = {
                    toolbarTitle: 'Übersicht',
                    moneyAccounts: [
                        {
                            name: 'Sparkasse',
                            money: 1010,
                            color: "#EA0A8E"
                        },
                        {
                            name: 'ING DiBa',
                            money: 2000,
                            color: "#FF6600"
                        }
                    ],
                    transactions: [
                        {
                            name: 'Robux',
                            description: 'Meine Nichte ist süchtig...',
                            moneyAccount: 'Sparkasse',
                            money: 10,
                            date: '2021-11-05'
                        }
                    ]
                };
                obj.totalMoney = obj.moneyAccounts[0].money + obj.moneyAccounts[1].money;
                return obj;
            })
        },
        setDrawer(state) {
            state.drawer = !state.drawer;
        },
        setTitle(state, title) {
          state.localStorage.toolbarTitle = title;
        },
        saveEditedMoneyAccount(state, data) {
            state.localStorage.moneyAccounts[data.item] = { name: data.name, money: data.money, color: data.color };
            localStorage.setItem('state', JSON.stringify(state.localStorage));
        },
        saveNewMoneyAccount(state, data) {
            state.localStorage.moneyAccounts.push({ name: data.name, money: data.money, color: data.color });
            localStorage.setItem('state', JSON.stringify(state.localStorage));
        },
        deleteMoneyAccount(state, data) {
            state.localStorage.moneyAccounts.splice(data.item, 1);
            localStorage.setItem('state', JSON.stringify(state.localStorage));
        },
        updateTotalMoney(state, updatedTotalMoney) {
            state.localStorage.totalMoney = updatedTotalMoney;
            localStorage.setItem('state', JSON.stringify(state.localStorage));
        },
        saveNewTransaction(state, data) {
            state.localStorage.transactions.push({ name: data.name, description: data.description, money: data.money, moneyAccount: data.moneyAccount, date: data.date });
            state.localStorage.moneyAccounts[data.accountIndex].money += data.money;
            localStorage.setItem('state', JSON.stringify(state.localStorage));
        },
        saveEditedTransaction(state, data) {
            const newTransaction = data.money;
            //accountIndex wird noch nicht übergeben
            state.localStorage.moneyAccounts[data.accountIndex].money += (newTransaction - data.oldTransaction.money);
            state.localStorage.transactions[data.item] = { name: data.name, description: data.description, money: data.money, moneyAccount: data.moneyAccount, date: data.date };
            localStorage.setItem('state', JSON.stringify(state.localStorage));
        },
        saveEditedTransactionWithNewMoneyAccount(state, data) {
            const newTransaction = data.money;

            //Alten Betrag der vorherigen Transaktion von deren Konto abziehen / wieder drauf rechnen.
            state.localStorage.moneyAccounts[data.oldAccountIndex].money -= data.oldTransaction.money;

            //Neuen Betrag auf neues Konto anrechnen
            state.localStorage.moneyAccounts[data.accountIndex].money += newTransaction;
            state.localStorage.transactions[data.item] = { name: data.name, description: data.description, money: data.money, moneyAccount: data.moneyAccount, date: data.date };
            localStorage.setItem('state', JSON.stringify(state.localStorage));
        },
        deleteTransaction(state, data) {
            state.localStorage.moneyAccounts[data.accountIndex].money -= data.money;
            state.localStorage.transactions.splice(data.item, 1);
            localStorage.setItem('state', JSON.stringify(state.localStorage));
        }
    }
});

