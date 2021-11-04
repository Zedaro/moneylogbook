<template>
  <div>
    Übersicht
    <button @click="test">Test</button>
    <!-- <button id="newLocalStorageButton" @click="newLocalStorage">New localStorage</button> -->
  </div>

</template>

<script>
export default {
  name: "OverviewPage",
  methods: {
    test() {
      var myStorage = window.localStorage;
      console.log(myStorage);
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

</style>