<template>
  <div>
    <v-card>
      <v-form ref="transferForm">

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
            ref="from"
            :items="items"
            label="Von"
            v-model="from"
            :rules="fromRules"
        ></v-select>

        <v-select
            ref="to"
            :items="items"
            label="Zu"
            v-model="to"
            :rules="toRules"
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
import SaveDelete from "@/components/moneyAccounts/buttons/SaveDelete";
export default {
  name: "TransferForm",
  components: { SaveDelete },
  data() {

    const nameRules = [
      v => !!v || "Geben Sie bitte einen Namen an"
    ];
    const moneyRules = [
      v => !!v || "Geben Sie bitte einen Betrag an",
      v => v > 0 || "Geben Sie bitte einen positiven Betrag an"
    ];
    /*
    const selectRules = [
      (v) => {
          //return (console.log(this.to)) || 'Hello';
        if (this.to != '' && this.from != '') {
          //console.log(this.$refs.to.value);
          //(this.$refs.from.value !== this.$refs.to.value ? console.log('not equal') : console.log('equal'));
          return (this.from !== this.to) || "Bitte geben Sie zwei verschiedene Konten an";
        } else {
          return !!v || "Geben Sie bitte ein Konto an";
        }
      }
    ];
    */
    const fromRules = [
      (v) => {
        //return (console.log(this.to)) || 'Hello';
        if (v !== '' && this.to !== '') {
          //console.log(this.$refs.to.value);
          //(this.$refs.from.value !== this.$refs.to.value ? console.log('not equal') : console.log('equal'));
          return (v !== this.to) || "Bitte geben Sie zwei verschiedene Konten an";
        } else {
          return !!v || "Geben Sie bitte ein Konto an";
        }
      }
    ];
    const toRules = [
      (v) => {
        //return (console.log(this.to)) || 'Hello';
        if (v !== '' && this.from !== '') {
          //console.log(this.$refs.to.value);
          //(this.$refs.from.value !== this.$refs.to.value ? console.log('not equal') : console.log('equal'));
          return (v !== this.from) || "Bitte geben Sie zwei verschiedene Konten an";
        } else {
          return !!v || "Geben Sie bitte ein Konto an";
        }
      }
    ];

    /*
    const fromRules = [
      v => (v !== this.$refs.to.value) || "Bitte geben Sie zwei verschiedene Konten an"
    ];
    const toRules = [
      v => (v !== this.$refs.from.value) || "Bitte geben Sie zwei verschiedene Konten an"
    ]
    */

    //const obj = {};



    if (this.$route.params.item === 'new') {
      return {
        new: true,
        name: '',
        description: '',
        items: (this.$store.getters.getMoneyAccountNames),
        from: '',
        to: '',
        money: null,
        //color: '#000000',
        nameRules: nameRules,
        moneyRules: moneyRules,
        //selectRules: selectRules,
        fromRules: fromRules,
        toRules: toRules,
        //fromRules: fromRules,
        //toRules: toRules,

        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        menu: false
      };
    }
    else {
      return {
        new: false,
        name: (this.$store.getters.getTransfers[this.$route.params.item].name),
        description: (this.$store.getters.getTransfers[this.$route.params.item].description),
        items: (this.$store.getters.getMoneyAccountNames),
        from: (this.$store.getters.getTransfers[this.$route.params.item].from),
        to: (this.$store.getters.getTransfers[this.$route.params.item].to),
        money: (this.$store.getters.getTransfers[this.$route.params.item].money),
        date: (this.$store.getters.getTransfers[this.$route.params.item].date),
        //color: (this.$store.getters.getMoneyAccounts[this.$route.params.item].color),
        nameRules: nameRules,
        moneyRules: moneyRules,
        //selectRules: selectRules,
        fromRules: fromRules,
        toRules: toRules,
        //fromRules: fromRules,
        //toRules: toRules,

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
      if(this.$refs.transferForm.validate()) {
        /*
        if(typeof this.money == 'string') {
          this.money = parseFloat(this.money);
        }
        */
        const data = {
          item: this.$route.params.item,
          name: this.name,
          description: this.description,
          from: this.from,
          to: this.to,
          money: parseFloat(this.money.toFixed(2)),   //.replace(/\./g, ','),
          date: this.date
        };
        this.$store.dispatch('saveTransfer', data)
            /*.then( () => {
              console.log(this.$store.getters.getLocalStorage);
            })
            */
            .then(() => {
              this.$router.push({name: 'transfers'});
            });
      }
    },
    deleteData() {
      const data = {
        item: this.$route.params.item,
        name: this.name,
        description: this.description,
        from: this.from,
        to: this.to,
        money: parseFloat(this.money.toFixed(2)),   //.replace(/\./g, ','),
        date: this.date,
        //color: this.color
      };

      this.$store.dispatch('deleteTransfer', data)
          .then(() => {
            this.$router.push({name: 'transfers'});
          });
    }
  }
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