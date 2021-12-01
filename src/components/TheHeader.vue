<template>
  <v-app-bar app>
    <v-app-bar-nav-icon v-if="Object.keys($route.params).length === 0 && this.$route.params.item !== 'new'" @click="clickDrawer"></v-app-bar-nav-icon>   <!-- Object.keys($route.params).length === 0 -->
    <v-app-bar-nav-icon v-else @click="$router.back()">
      <v-icon>mdi-arrow-left</v-icon></v-app-bar-nav-icon>
    <v-toolbar-title>{{ toolbarTitle }}</v-toolbar-title>
    <button @click="test">Test</button>
    <button class="newLocalStorageButton" @click="newLocalStorage">Reset localStorage</button>
    <!-- <button class="newLocalStorageButton" @click="deleteLocalStorage">Delete localStorage</button> -->
  </v-app-bar>
</template>

<script>
export default {
  name: "TheHeader",
  data() {
    return {

    }
  },
  computed: {
    toolbarTitle() {
      //Übersichts-Seiten
      if(this.$route.meta.title) {
        return this.$route.meta.title;
      }
      //Neuer Eintrag
      else if(this.$route.params.item === 'new')
        if(this.$route.meta.formType === 'Konto-Formular') {
          return 'Neues Konto';
        } else if(this.$route.meta.formType === 'Transaktions-Formular') {
          return 'Neue Transaktion';
        } else if(this.$route.meta.formType === 'Dauerauftrags-Formular') {
          return 'Neuer Dauerauftrag';
        } else {
          return 'Neue Umbuchung';
        }
      //Eintrag bearbeiten
      else {
        if(this.$route.meta.formType === 'Konto-Formular') {
          return 'Konto bearbeiten';
        } else if(this.$route.meta.formType === 'Transaktions-Formular') {
          return 'Transaktion bearbeiten';
        } else if(this.$route.meta.formType === 'Dauerauftrags-Formular') {
          return 'Dauerauftrag bearbeiten';
        } else {
          return 'Umbuchung bearbeiten';
        }
      }
    }
  },
  methods: {
    clickDrawer() {
      this.$store.dispatch("setDrawer");
    },
    test() {
      //console.log( parseFloat((10.05 + 10.05).toFixed(2)) );
      console.log(10.1 > 0);
    },
    newLocalStorage() {
      this.$store.dispatch('setLocalStorage', true);
    },
    deleteLocalStorage() {
      localStorage.removeItem('state');
    }
  }
}
</script>

<style scoped>

  .newLocalStorageButton {
    border: solid black 1px;
    margin-left: 10px;
  }

</style>