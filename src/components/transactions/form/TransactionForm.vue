<template>
  <div>
    <v-card>
      <v-form ref="transactionForm">

        <v-text-field counter="100"
                      label="Name"
                      maxlength="100"
                      v-model="name"
                      :rules="this.nameRules"
        ></v-text-field>

        <v-textarea
            maxlength="1000"
            v-model="description"
        >
          <template v-slot:label>
            <div>
              Beschreibung <small>(optional)</small>
            </div>
          </template>
        </v-textarea>

        <v-select
            :items="items"
            label="Konto"
            v-model="moneyAccount"
            :rules="selectRules"
        ></v-select>

        <v-text-field type="number"
                      label="Geld"
                      step="0.01"
                      prefix="€"
                      v-model.number="money"
                      :rules="this.moneyRules"
        ></v-text-field>

        <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="computedDateFormatted"
                label="Datum"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
              v-model="date"
              no-title
              scrollable
              @input="menu = false"
          ></v-date-picker>
        </v-menu>

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
import SaveDelete from "@/components/buttons/SaveDelete";
export default {
  name: "TransactionForm",
  components: { SaveDelete },
  data() {

    const nameRules = [
      v => !!v || "Geben Sie bitte einen Namen an"
    ];
    const moneyRules = [
      v => !!v || "Geben Sie bitte einen Betrag an"
    ];
    const selectRules = [
      v => !!v || "Geben Sie bitte ein Konto an"
    ];


    if (this.$route.params.item === 'new') {
      return {
        new: true,
        name: '',
        description: '',
        items: (this.$store.getters.getMoneyAccountNames),
        moneyAccount: '',
        money: null,
        //color: '#000000',
        nameRules: nameRules,
        moneyRules: moneyRules,
        selectRules: selectRules,

        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        menu: false
      };
    }
    else {
      return {
        new: false,
        name: (this.$store.getters.getTransactions[this.$route.params.item].name),
        description: (this.$store.getters.getTransactions[this.$route.params.item].description),
        items: (this.$store.getters.getMoneyAccountNames),
        moneyAccount: (this.$store.getters.getTransactions[this.$route.params.item].moneyAccount),
        money: (this.$store.getters.getTransactions[this.$route.params.item].money),
        date: (this.$store.getters.getTransactions[this.$route.params.item].date),
        //color: (this.$store.getters.getMoneyAccounts[this.$route.params.item].color),
        nameRules: nameRules,
        moneyRules: moneyRules,
        selectRules: selectRules,

        menu: false
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
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    }
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
    formatDate(date) {
      const [year, month, day] = date.split('-');
      return `${day}.${month}.${year}`;
    },
    saveData() {
      if(this.$refs.transactionForm.validate()) {
        /*
        if(typeof this.money == 'string') {
          this.money = parseFloat(this.money);
        }
        */
        const data = {
          item: this.$route.params.item,
          color: this.$store.getters.getMoneyAccounts.find(account => account.name === this.moneyAccount).color,
          name: this.name,
          description: this.description,
          moneyAccount: this.moneyAccount,
          money: parseFloat(this.money.toFixed(2)),   //.replace(/\./g, ','),
          date: this.date,
          //color: this.color
        };
        this.$store.dispatch('saveTransaction', data)
            .then( () => {
              this.$store.dispatch('updateTotalMoney');
            })
            /*.then( () => {
              console.log(this.$store.getters.getLocalStorage);
            })
            */
            .then(() => {
              this.$router.push({name: 'transactions'});
            });
      }
    },
    deleteData() {
      const data = {
        item: this.$route.params.item,
        name: this.name,
        description: this.description,
        moneyAccount: this.moneyAccount,
        money: parseFloat(this.money.toFixed(2)),   //.replace(/\./g, ','),
        date: this.date,
        //color: this.color
      };

      this.$store.dispatch('deleteTransaction', data)
          .then( () => {
            this.$store.dispatch('updateTotalMoney');
          })
          .then(() => {
            this.$router.push({name: 'transactions'});
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