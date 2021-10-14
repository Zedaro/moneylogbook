import Vuex from "vuex"
import Vue from "vue";
Vue.use(Vuex)



export const store = new Vuex.Store({
    state: {
        drawer: false
    },
    getters: {
        getDrawer: state => {
            return state.drawer;
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

