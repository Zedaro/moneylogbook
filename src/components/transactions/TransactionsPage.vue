<template>
  <div>
    Transaktionen
    <plus-minus></plus-minus>
  </div>
</template>

<script>
import PlusMinus from "@/components/moneyAccounts/buttons/PlusMinus";
export default {
  name: "TransactionsPage",
  components: { PlusMinus },
  mounted() {
    //this.$store.dispatch('setTitle', 'Transaktionen');
  }
}
</script>

<style scoped>

</style>