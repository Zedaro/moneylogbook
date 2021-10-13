import Vue from "vue"
import Vuex from "vuex"


Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        menuIsOpen: true,
        count: 0
    },
    getters: {
        isMenuOpen: state => {
            return state.menuIsOpen;
        }
    },
    actions: {
        clickMenuIcon(context) {
            context.commit("clickMenuIcon");
        }
    },
    mutations: {
        clickMenuIcon(state) {
            state.menuIsOpen = !state.menuIsOpen;
        },
        increment(state) {
            state.count++
        }
    }
});

