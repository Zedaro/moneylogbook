<template>
  <div>
    <transactions-list></transactions-list>
    <plus-minus></plus-minus>
  </div>
</template>

<script>
import PlusMinus from "@/components/moneyAccounts/buttons/PlusMinus";
import TransactionsList from "@/components/transactions/TransactionsList";
export default {
  name: "TransactionsPage",
  components: { PlusMinus, TransactionsList },
  mounted() {
    //this.$store.dispatch('setTitle', 'Transaktionen');
  }
}
</script>

<style scoped>

</style>