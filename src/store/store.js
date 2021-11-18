import Vuex from "vuex"
import Vue from "vue";
Vue.use(Vuex)



export const store = new Vuex.Store({
    state: {
        drawer: false,
        initialLocalStorage: ( () => {
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
                        color: '#EA0A8E',
                        name: 'Robux',
                        description: 'Meine Nichte ist süchtig...',
                        moneyAccount: 'Sparkasse',
                        money: 10,
                        date: '2021-11-05'
                    }
                ],
                repeatingTransactions: [
                    {
                        color: '#EA0A8E',
                        name: 'Schweigegeld',
                        description: '...',
                        moneyAccount: 'Sparkasse',
                        money: 50,
                        startingDate: '2021-11-20',
                        endingDate: '2021-12-20',
                        rhythmNumber: 1,
                        rhythmType: 'monthly'
                    }
                ],
                transfers: [
                    {
                        colorFrom: '#FF6600',
                        colorTo: '#EA0A8E',
                        name: 'Umbuchung 1',
                        description: 'Test',
                        from: 'ING DiBa',
                        to: 'Sparkasse',
                        money: 10,
                        date: '2021-11-05'
                    }
                ]
            };
            obj.totalMoney = obj.moneyAccounts[0].money + obj.moneyAccounts[1].money;

            return obj;
        }),
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
        },
        getTransfers(state) {
            return state.localStorage.transfers;
        }
    },
    actions: {
        setLocalStorage(context, update) {
            if(update) {
                localStorage.clear();

                localStorage.setItem('state', JSON.stringify(context.state.initialLocalStorage()));
                window.location.reload();
            }
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
        updateTotalMoney(context) {
            let totalMoney = 0;
            const moneyAccounts = context.state.localStorage.moneyAccounts;
            moneyAccounts.forEach(account => totalMoney += account.money);
            context.commit('updateTotalMoney', totalMoney);
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
        },

        saveRepeatingTransaction(context, data) {
            data.accountIndex = context.state.localStorage.moneyAccounts.findIndex(account => account.name === data.moneyAccount);

            if(data.item === 'new') {
                context.commit('saveNewRepeatingTransaction', data);
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

        saveTransfer(context, data) {
            //Das ist der Account von der neuen Transaktion!!!
            data.fromIndex = context.state.localStorage.moneyAccounts.findIndex(account => account.name === data.from);
            data.toIndex = context.state.localStorage.moneyAccounts.findIndex(account => account.name === data.to);

            //Neue Umbuchung
            if(data.item === 'new') {
                context.commit('saveNewTransfer', data);
            }
            //Umbuchung bearbeiten
            else {
                data.oldTransfer = context.state.localStorage.transfers[data.item];
                //Umbuchung bearbeiten - ohne Kontoänderung
                if(data.oldTransfer.from === data.from  &&  data.oldTransfer.to === data.to) {
                    context.commit('saveEditedTransfer', data);
                }
                //Umbuchung bearbeiten - mit Kontoänderung
                else {
                    data.oldTransfer.fromIndex = context.state.localStorage.moneyAccounts.findIndex(account => account.name === data.oldTransfer.from);
                    data.oldTransfer.toIndex = context.state.localStorage.moneyAccounts.findIndex(account => account.name === data.oldTransfer.to);

                    //from und to haben sich geändert
                    if(data.oldTransfer.from !== data.from  &&  data.oldTransfer.to !== data.to) {
                        context.commit('saveEditedTransferWithNewFromTo', data);
                    }
                    //from hat sich geändert
                    else if(data.oldTransfer.from !== data.from) {
                        context.commit('saveEditedTransferWithNewFrom', data);
                    }
                    //to hat sich geändert
                    else {
                        context.commit('saveEditedTransferWithNewTo', data);
                    }
                }
            }
        },
        deleteTransfer(context, data) {
            data.fromIndex = context.state.localStorage.moneyAccounts.findIndex(account => account.name === data.from);
            data.toIndex = context.state.localStorage.moneyAccounts.findIndex(account => account.name === data.to);

            context.commit('deleteTransfer', data);
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
            state.localStorage = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : state.initialLocalStorage;
        },
        setDrawer(state) {
            state.drawer = !state.drawer;
        },
        setTitle(state, title) {
          state.localStorage.toolbarTitle = title;
        },
        updateTotalMoney(state, updatedTotalMoney) {
            state.localStorage.totalMoney = updatedTotalMoney;
            localStorage.setItem('state', JSON.stringify(state.localStorage));
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

        saveNewTransaction(state, data) {
            state.localStorage.transactions.push({ color: data.color, name: data.name, description: data.description, money: data.money, moneyAccount: data.moneyAccount, date: data.date });
            state.localStorage.moneyAccounts[data.accountIndex].money += data.money;
            localStorage.setItem('state', JSON.stringify(state.localStorage));
        },
        saveEditedTransaction(state, data) {
            const newTransaction = data.money;
            //accountIndex wird noch nicht übergeben
            state.localStorage.moneyAccounts[data.accountIndex].money += (newTransaction - data.oldTransaction.money);

            state.localStorage.transactions[data.item] = { color: data.color, name: data.name, description: data.description, money: data.money, moneyAccount: data.moneyAccount, date: data.date };
            localStorage.setItem('state', JSON.stringify(state.localStorage));
        },
        saveEditedTransactionWithNewMoneyAccount(state, data) {
            const newTransaction = data.money;

            //Alten Betrag der vorherigen Transaktion von deren Konto abziehen / wieder drauf rechnen.
            state.localStorage.moneyAccounts[data.oldAccountIndex].money -= data.oldTransaction.money;

            //Neuen Betrag auf neues Konto anrechnen
            state.localStorage.moneyAccounts[data.accountIndex].money += newTransaction;

            state.localStorage.transactions[data.item] = { color: data.color, name: data.name, description: data.description, money: data.money, moneyAccount: data.moneyAccount, date: data.date };
            localStorage.setItem('state', JSON.stringify(state.localStorage));
        },
        deleteTransaction(state, data) {
            state.localStorage.moneyAccounts[data.accountIndex].money -= data.money;
            state.localStorage.transactions.splice(data.item, 1);
            localStorage.setItem('state', JSON.stringify(state.localStorage));
        },

        saveNewRepeatingTransaction(state, data) {
            state.localStorage.repeatingTransactions.push({ color: data.color, name: data.name, description: data.description, money: data.money, moneyAccount: data.moneyAccount, startingDate: data.startingDate, endingDate: data.endingDate, rhythmNumber: data.rhythmNumber, rhythmType: data.rhythmType });
            //state.localStorage.moneyAccounts[data.accountIndex].money += data.money;
            localStorage.setItem('state', JSON.stringify(state.localStorage));
        },

        saveNewTransfer(state, data) {
            state.localStorage.transfers.push({ colorFrom: data.colorFrom, colorTo: data.colorTo, name: data.name, description: data.description, money: data.money, from: data.from, to: data.to, date: data.date });

            state.localStorage.moneyAccounts[data.fromIndex].money -= data.money;
            state.localStorage.moneyAccounts[data.toIndex].money += data.money;

            localStorage.setItem('state', JSON.stringify(state.localStorage));
        },
        saveEditedTransfer(state, data) {
            const newTransfer = data.money;
            state.localStorage.moneyAccounts[data.fromIndex].money -= (newTransfer - data.oldTransfer.money);
            state.localStorage.moneyAccounts[data.toIndex].money += (newTransfer - data.oldTransfer.money);

            //State und localStorage updaten
            state.localStorage.transfers[data.item] = { colorFrom: data.colorFrom, colorTo: data.colorTo, name: data.name, description: data.description, money: data.money, from: data.from, to: data.to, date: data.date };
            localStorage.setItem('state', JSON.stringify(state.localStorage));
        },
        saveEditedTransferWithNewFromTo(state, data) {
            //Geld beim alten from wiederherstellen
            state.localStorage.moneyAccounts[data.oldTransfer.fromIndex].money += data.oldTransfer.money;
            //Umbuchung vom neuen from abrechnen
            state.localStorage.moneyAccounts[data.fromIndex].money -= data.money;
            //Geld vom alten to wieder abziehen
            state.localStorage.moneyAccounts[data.oldTransfer.toIndex].money -= data.oldTransfer.money;
            //Umbuchung auf das neue to rechnen
            state.localStorage.moneyAccounts[data.toIndex].money += data.money;

            //State und localStorage updaten
            state.localStorage.transfers[data.item] = { colorFrom: data.colorFrom, colorTo: data.colorTo, name: data.name, description: data.description, money: data.money, from: data.from, to: data.to, date: data.date };
            localStorage.setItem('state', JSON.stringify(state.localStorage));
        },
        saveEditedTransferWithNewFrom(state, data) {
            const newTransferMoney = data.money;

            //Geld beim alten from wiederherstellen
            state.localStorage.moneyAccounts[data.oldTransfer.fromIndex].money += data.oldTransfer.money;
            //Umbuchung vom neuen from abrechnen
            state.localStorage.moneyAccounts[data.fromIndex].money -= data.money;
            //to updaten
            state.localStorage.moneyAccounts[data.toIndex].money += (newTransferMoney - data.oldTransfer.money);

            //State und localStorage updaten
            state.localStorage.transfers[data.item] = { colorFrom: data.colorFrom, colorTo: data.colorTo, name: data.name, description: data.description, money: data.money, from: data.from, to: data.to, date: data.date };
            localStorage.setItem('state', JSON.stringify(state.localStorage));


        },
        saveEditedTransferWithNewTo(state, data) {
            const newTransferMoney = data.money;

            //Geld vom alten to wieder abziehen
            state.localStorage.moneyAccounts[data.oldTransfer.toIndex].money -= data.oldTransfer.money;
            //Umbuchung auf das neue to rechnen
            state.localStorage.moneyAccounts[data.toIndex].money += data.money;
            //from updaten
            state.localStorage.moneyAccounts[data.fromIndex].money -= (newTransferMoney - data.oldTransfer.money);

            //State und localStorage updaten
            state.localStorage.transfers[data.item] = { colorFrom: data.colorFrom, colorTo: data.colorTo, name: data.name, description: data.description, money: data.money, from: data.from, to: data.to, date: data.date };
            localStorage.setItem('state', JSON.stringify(state.localStorage));

        },
        deleteTransfer(state, data) {
            state.localStorage.moneyAccounts[data.fromIndex].money += data.money;
            state.localStorage.moneyAccounts[data.toIndex].money -= data.money;

            state.localStorage.transfers.splice(data.item, 1);

            localStorage.setItem('state', JSON.stringify(state.localStorage));
        }
    }
});

