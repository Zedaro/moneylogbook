<template>
  <v-app-bar app>
    <v-app-bar-nav-icon v-if="Object.keys($route.params).length === 0" @click="clickDrawer"></v-app-bar-nav-icon>
    <v-app-bar-nav-icon v-else @click="$router.back()">
      <v-icon>mdi-arrow-left</v-icon></v-app-bar-nav-icon>
    <v-toolbar-title>{{ this.$store.getters.getToolbarTitle }}</v-toolbar-title>
    <!-- <button @click="test">Test</button> -->
    <button id="newLocalStorageButton" @click="newLocalStorage">New localStorage</button>
  </v-app-bar>
</template>

<script>
export default {
  name: "TheHeader",
  data() {
    return {

    }
  },
  methods: {
    clickDrawer() {
      this.$store.dispatch("setDrawer");
    },
    test() {
      console.log(this.$router);
    },
    newLocalStorage() {
      localStorage.clear();
      const state = {
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
      localStorage.setItem('state', JSON.stringify(state));
      window.location.reload();
    }
  }
}
</script>

<style scoped>

  #newLocalStorageButton {
    border: solid black 1px;
    margin-left: 10px;
  }

</style>