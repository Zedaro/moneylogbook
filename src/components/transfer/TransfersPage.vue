<template>
  <div>
    <transfers-list></transfers-list>
    <plus-minus></plus-minus>
  </div>
</template>

<script>
import PlusMinus from "@/components/buttons/PlusMinus";
import TransfersList from "@/components/transfer/TransfersList";
export default {
  name: "TransfersPage",
  components: { PlusMinus, TransfersList },
  mounted() {
    //this.$store.dispatch('setTitle', 'Transaktionen');
  }
}
</script>

<style scoped>

</style>