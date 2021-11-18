<template>
  <div>

  <money-accounts-list></money-accounts-list>

    <!--
    <money-account-card :name="moneyAccounts[0].name" :money="moneyAccounts[0].money" :color="moneyAccounts[0].color"></money-account-card>
    -->
    <plus-minus></plus-minus>
    <!-- <button @click="print">Button</button> -->
  </div>
</template>

<script>

import PlusMinus from "@/components/buttons/PlusMinus";
import MoneyAccountsList from "@/components/moneyAccounts/page/MoneyAccountsList";
export default {
  name: "MoneyAccountsPage",
  components: {MoneyAccountsList, PlusMinus },
  data() {
    return {
      moneyAccounts: this.$store.getters.getMoneyAccounts
    };
  },
  methods: {
    print() {
      console.log(this.moneyAccounts);
    }
  }
}
</script>

<style scoped>



</style>