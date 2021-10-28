import Vuex from "vuex"
import Vue from "vue";
Vue.use(Vuex)



export const store = new Vuex.Store({
    state: {
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
    getters: {
        getDrawer: state => {
            return state.drawer;
        },
        getToolbarTitle(state) {
            return state.toolbarTitle;
        },
        getMoneyAccounts(state) {
            return state.moneyAccounts;
        }
    },
    actions: {
        setDrawer(context) {
            context.commit("setDrawer");
        }
    },
    mutations: {
        setDrawer(state) {
            state.drawer = !state.drawer;
        }
    }
});

