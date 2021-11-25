<template>
  <div>
    <doughnut-chart></doughnut-chart>
    <v-card class="list-item">
      <v-card-title id="card-title">Gesamt</v-card-title>
      <v-card-text class="text-center">{{ totalMoney }}</v-card-text>
    </v-card>
    <money-accounts-list></money-accounts-list>
    <plus-minus></plus-minus>
    <!-- <button @click="test">Test</button> -->
    <!-- <button id="newLocalStorageButton" @click="newLocalStorage">New localStorage</button> -->
  </div>

</template>

<script>
import DoughnutChart from "@/components/chart/DoughnutChart";
import MoneyAccountsList from "@/components/moneyAccounts/page/MoneyAccountsList";
import PlusMinus from "@/components/buttons/PlusMinus";
export default {
  name: "OverviewPage",
  components: { DoughnutChart, MoneyAccountsList, PlusMinus },
  computed: {
    totalMoney() {
        return this.$store.getters.getFormattedTotalMoney;
      //this.money.replace(/\./g, ',') €
    }
  },
  methods: {
    test() {

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

  .v-card {
    margin: auto;
    background-color: #9fc788;
  }

  .v-card__title {
    justify-content: center;
  }

</style>