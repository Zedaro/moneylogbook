<template>
  <div>
    <repeating-transactions-list></repeating-transactions-list>
    <plus-minus></plus-minus>
  </div>
</template>

<script>
import RepeatingTransactionsList from "@/components/repeatingTransactions/RepeatingTransactionsList";
import PlusMinus from "@/components/buttons/PlusMinus";
export default {
  name: "RepeatingTransactionsPage",
  components: { RepeatingTransactionsList, PlusMinus },
  mounted() {
    //this.$store.dispatch('setTitle', 'Transaktionen');
  }
}
</script>

<style scoped>

</style>