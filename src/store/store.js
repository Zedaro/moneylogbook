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
        getFormattedTotalMoney (state) {
            return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(state.localStorage.totalMoney)
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
                            money: 1000,
                            color: "#EA0A8E"
                        },
                        {
                            name: 'ING DiBa',
                            money: 2000,
                            color: "#FF6600"
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
        }
    }
});

