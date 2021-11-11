<template>

  <v-card width="50%" :to="item">
    <div class="color" :style="{ backgroundColor: color }"></div>
    <v-card-title class="card-title">{{ this.name }}</v-card-title>
    <v-card-text class="text-center grey--text">{{ this.description }}</v-card-text>
    <v-card-text class="text-center subtitle-1 money" :class="moneyColor">{{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(this.money) }}</v-card-text>
    <v-card-text class="text-center grey--text">{{ this.moneyAccount }}</v-card-text>
    <v-card-text class="text-center grey--text">{{ formattedDate }}</v-card-text>
  </v-card>

</template>



<script>
export default {
  name: "TransactionItem",
  props: ['name', 'description', 'money', 'moneyAccount', 'date', 'index'],
  computed: {
    item() {
      return {
        name: 'transactionForm',
        params: { item: this.index }
      };
    },
    color() {
      const account = this.$store.getters.getMoneyAccounts.find(account => account.name === this.moneyAccount);
      return account.color;
    },
    moneyColor() {
      return ( (this.money > 0) ? 'green--text' : 'red--text' );
    },
    formattedDate() {
      const [year, month, day] = this.date.split('-');
      return `${day}.${month}.${year}`;
    }
  }
}
</script>



<style scoped>

.v-card {
  margin: auto;
}

.color {
  position: absolute;
  width: 5%;
  height: 100%;
  background-color: pink;
}

.v-card__title {
  justify-content: center;
}

.money {
  padding-bottom: 0;
}

</style>