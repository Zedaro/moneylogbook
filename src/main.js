


//<editor-fold desc="Import Statements">
import Vue from 'vue'
import App from './App.vue'
//</editor-fold>



//<editor-fold desc="Router">
import {router} from "./router";
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



//Vuetify
import vuetify from './plugins/vuetify'



//Keine Ahnung
Vue.config.productionTip = false



//Vue App erstellen und rendern
new Vue({
  el: "#app",
  router,
  store,
  vuetify,
  render: h => h(App)
})
