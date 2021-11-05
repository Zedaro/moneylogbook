<template>
  <div>
    <v-card>
      <v-form ref="moneyAccountForm">
        <v-text-field counter="100"
                      label="Name"
                      maxlength="100"
                      v-model="name"
                      :rules="this.nameRules"
        ></v-text-field>
        <v-text-field type="number"
                      label="Geld"
                      step="0.01"
                      prefix="€"
                      v-model.number="money"
                      :rules="this.moneyRules"
        ></v-text-field>
        <v-color-picker mode="hexa"
                        v-model="color">
        </v-color-picker>
        <save-delete @saveData="saveData"
                     @deleteData="deleteData"
        ></save-delete>
          <!-- <edit-money-account v-else></edit-money-account> -->
      </v-form>
    </v-card>

    <button @click="test">Test</button>

  </div>
</template>

<script>
import SaveDelete from "@/components/moneyAccounts/buttons/SaveDelete";
export default {
  name: "MoneyAccountForm",
  components: { SaveDelete },
  data() {

    // eslint-disable-next-line no-unused-vars
    const nameRules = [
        v => !!v || "Geben Sie bitte einen Namen an"
    ];
    // eslint-disable-next-line no-unused-vars
    const moneyRules = [
        v => !!v || "Geben Sie bitte einen Betrag an"
    ];


    if (this.$route.params.item == 'new') {
      return {
        new: true,
        name: '',
        money: null,
        color: '#000000',
        nameRules: nameRules,
        moneyRules: moneyRules
      };
    }
    else {
      return {
        new: false,
        name: (this.$store.getters.getMoneyAccounts[this.$route.params.item].name),
        money: (this.$store.getters.getMoneyAccounts[this.$route.params.item].money),
        color: (this.$store.getters.getMoneyAccounts[this.$route.params.item].color),
        nameRules: nameRules,
        moneyRules: moneyRules
      };
    }


    /*
    return {
      new: null,
      name: (this.$route.params.item == 'new' ? '' : this.$store.getters.getMoneyAccounts[this.$route.params.item].name),
      money: (this.$route.params.item == 'new' ? null : this.$store.getters.getMoneyAccounts[this.$route.params.item].money),
      color: (this.$route.params.item == 'new' ? '#000000' : this.$store.getters.getMoneyAccounts[this.$route.params.item].color),
      nameRules: nameRules,
      moneyRules: moneyRules
    };
    */

  },
  methods: {
    test() {
      /*
      console.log(this.$refs['moneyField']);
      console.log(this.name);
      console.log(this.money);
      console.log(this.color);
       */
    },
    saveData() {
      //console.log(this.accountData);
      if(this.$refs.moneyAccountForm.validate()) {
        /*
        if(typeof this.money == 'string') {
          this.money = parseFloat(this.money);
        }
        */
        const data = {
          item: this.$route.params.item,
          name: this.name,
          money: parseFloat(this.money.toFixed(2)),   //.replace(/\./g, ','),
          color: this.color
        };
        this.$store.dispatch('saveMoneyAccount', data)
            .then( () => {
              this.$store.dispatch('updateTotalMoney');
            })
            .then(() => {
              this.$router.push({name: 'overview'});
            });
      }
    },
    deleteData() {
      this.$store.dispatch('deleteMoneyAccount', { item: this.$route.params.item })
          .then( () => {
            this.$store.dispatch('updateTotalMoney');
          })
          .then(() => {
            this.$router.push({name: 'overview'});
          });
    }
  },
  /*
  beforeMounted() {
    if(this.$route.params.item === 'new')
      this.$store.dispatch('setTitle', 'Neues Konto');
    else
      this.$store.dispatch('setTitle', 'Konto bearbeiten');
  }
   */
}
</script>



<style scoped>

  .v-card {
    width: 50%;
    margin: 50px auto 0 auto;
    padding: 2%;
  }

</style>