<template>
  <div>

    <plus-minus></plus-minus>
  </div>
</template>

<script>
import PlusMinus from "@/components/buttons/PlusMinus";
export default {
  name: "RepeatingTransactionsPage",
  components: { PlusMinus },
  mounted() {
    //this.$store.dispatch('setTitle', 'Transaktionen');
  }
}
</script>

<style scoped>

</style>