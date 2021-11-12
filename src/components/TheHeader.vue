<template>
  <v-app-bar app>
    <v-app-bar-nav-icon v-if="Object.keys($route.params).length === 0 && this.$route.params.item !== 'new'" @click="clickDrawer"></v-app-bar-nav-icon>   <!-- Object.keys($route.params).length === 0 -->
    <v-app-bar-nav-icon v-else @click="$router.back()">
      <v-icon>mdi-arrow-left</v-icon></v-app-bar-nav-icon>
    <v-toolbar-title>{{ toolbarTitle }}</v-toolbar-title>
    <!-- <button @click="test">Test</button> -->
    <button class="newLocalStorageButton" @click="newLocalStorage">Reset localStorage</button>
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
        } else {
          return 'Neuer Dauerauftrag';
        }
      //Eintrag bearbeiten
      else {
        if(this.$route.meta.formType === 'Konto-Formular') {
          return 'Konto bearbeiten';
        } else if(this.$route.meta.formType === 'Transaktions-Formular') {
          return 'Transaktion bearbeiten';
        } else {
          return 'Dauerauftrag bearbeiten';
        }
      }
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
      let state = {
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
        ],
        transfers: [
          {
            name: 'Umbuchung 1',
            description: 'Test',
            from: 'ING DiBa',
            to: 'Sparkasse',
            money: 10,
            date: '2021-11-05'
          }
        ]
      };
      state.totalMoney = state.moneyAccounts[0].money + state.moneyAccounts[1].money;
      localStorage.setItem('state', JSON.stringify(state));
      window.location.reload();
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