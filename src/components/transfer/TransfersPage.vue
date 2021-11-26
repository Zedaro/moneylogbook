<template>
  <div>
    <transfers-list></transfers-list>
  </div>
</template>

<script>
import TransfersList from "@/components/transfer/TransfersList";
export default {
  name: "TransfersPage",
  components: { TransfersList },
  mounted() {
    //this.$store.dispatch('setTitle', 'Transaktionen');
  }
}
</script>

<style scoped>

</style>