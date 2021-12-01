


//<editor-fold desc="Import Statements">
import Vue from 'vue'
import App from './App.vue'
import VueI18n from "vue-i18n/dist/vue-i18n.esm.js";
//</editor-fold>







//<editor-fold desc="BootstrapVue">
import { BootstrapVue, IconsPlugin } from "bootstrap-vue"
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
Vue.component('vue-bootstrap-typeahead', VueBootstrapTypeahead)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
//</editor-fold>



//<editor-fold desc="Global Components">

//</editor-fold>



//Store
import {store} from "@/store/store";

//<editor-fold desc="Router">
import {router} from "./router";
//</editor-fold>

//Vuetify
import vuetify from './plugins/vuetify'

//Keine Ahnung
Vue.config.productionTip = false

//Localization -> Vue I18n
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'ja', // set locale
  messages, // set locale messages
})


//Vue App erstellen und rendern
new Vue({
  el: "#app",
  store,
  router,
  vuetify,
  i18n,
    /*
  created: function() {
    this.$store.dispatch('setState')
        .then( () => {
            console.log("After setState:");
            console.log(this.$store.getters.getState);
        }) ;
  },
  */
  created: function() {
    store.dispatch('setLocalStorage', false)
        .then( () => console.log(this.$store.getters.getState) );
  },
  render: h => h(App)
})
