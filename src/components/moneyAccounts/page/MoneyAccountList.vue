<template>
  <div>
    <money-account-item v-for="(account, index) in this.$store.getters.getMoneyAccounts" :key="index"
                        :name="account.name" :money="account.money" :color="account.color" :index="index">
    </money-account-item>
  </div>
</template>

<script>
import MoneyAccountItem from "@/components/moneyAccounts/page/MoneyAccountItem";
export default {
  name: "MoneyAccountList",
  components: { MoneyAccountItem }
}
</script>

<style scoped>

</style>