<template>

  <v-card class="list-item" :to="moneyAccountsExist ? item : ''">
    <div class="color" :style="{ backgroundColor: color }"></div>
    <v-card-title class="card-title">{{ this.name }}</v-card-title>
    <v-card-text class="text-center grey--text">{{ this.description }}</v-card-text>
    <v-card-text class="text-center subtitle-1 money" :class="moneyColor">{{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(this.money) }}</v-card-text>
    <v-card-text class="text-center grey--text">{{ this.moneyAccount }}</v-card-text>
    <v-card-text class="text-center grey--text">{{ this.rhythmText }}</v-card-text>
    <v-card-text class="text-center grey--text">{{ formattedDate(startingDate) }} - {{ formattedDate(endingDate) }}</v-card-text>
  </v-card>

</template>



<script>
export default {
  name: "RepeatingTransactionItem",
  props: ['color', 'name', 'description', 'money', 'moneyAccount', 'startingDate', 'endingDate', 'rhythmNumber', 'rhythmType', 'rhythmText', 'index'],
  computed: {
    moneyAccountsExist() {
      const account = this.$store.getters.getMoneyAccounts.find(account => account.name === this.moneyAccount);

      //returns boolean
      return (typeof account != 'undefined');
    },
    item() {
      return {
        name: 'repeatingTransactionForm',
        params: { item: this.index }
      };
    },
    moneyColor() {
      return ( (this.money > 0) ? 'green--text' : 'red--text' );
    },
    formattedDate() {
      return (date) => {
        if(date !== '') {
          const [year, month, day] = date.split('-');
          return `${day}.${month}.${year}`;
        } else {
          return 'Kein Ende';
        }
      };
    },
    formattedStartingDate() {
      const [year, month, day] = this.startingDate.split('-');
      return `${day}.${month}.${year}`;
    },
    formattedEndingDate() {
      if(this.endingDate !== '') {
        const [year, month, day] = this.endingDate.split('-');
        return `${day}.${month}.${year}`;
      } else {
        return 'Kein Ende';
      }
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