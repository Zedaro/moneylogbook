<template>

  <v-container>
    <v-btn class="mx-2" fab dark small color="green" :to="item">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
  </v-container>

</template>



<script>
  export default {
    name: "PlusMinus",
    computed: {
      item() {
        if(this.$route.meta.title == 'Übersicht') {
          return {
            name: 'moneyAccountForm',
            params: { item: 'new' }
          };
        } else {
          return {
            name: 'transactionForm',
            params: { item: 'new' }
          };
        }
      }
    }
}
</script>



<style scoped>

  .container {
    position: fixed;
    left: 25%;
    top: 80%;
    width: 50%;
    /* border: black solid 1px; */
  }

  .v-btn {
    position: relative;
    left: 70%;
  }

</style>