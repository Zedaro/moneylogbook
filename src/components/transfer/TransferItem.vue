<template>

  <v-card width="50%" :to="item">
    <div class="color" :style="{ backgroundColor: colorFrom }"></div>
    <div class="color" :style="{ backgroundColor: colorTo }"></div>
    <v-card-title class="card-title">{{ this.name }}</v-card-title>
    <v-card-text class="text-center grey--text">{{ this.description }}</v-card-text>
    <v-card-text class="text-center subtitle-1 money">{{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(this.money) }}</v-card-text>
    <v-card-text class="text-center grey--text">Von: {{ this.from }}</v-card-text>
    <v-card-text class="text-center grey--text">Zu: {{ this.to }}</v-card-text>
    <v-card-text class="text-center grey--text">{{ formattedDate }}</v-card-text>
  </v-card>

</template>



<script>
export default {
  name: "TransferItem",
  props: ['name', 'description', 'money', 'from', 'to', 'date', 'index'],
  computed: {
    item() {
      return {
        name: 'transferForm',
        params: { item: this.index }
      };
    },
    colorFrom() {
      const account = this.$store.getters.getMoneyAccounts.find(account => account.name === this.from);
      return account.color;
    },
    colorTo() {
      const account = this.$store.getters.getMoneyAccounts.find(account => account.name === this.to);
      return account.color;
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
  width: 2.5%;
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