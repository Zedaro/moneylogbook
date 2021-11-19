<template>
  <div>
    <v-card>
      <v-form ref="transactionForm">

        <!-- name -->
        <v-text-field counter="100"
                      label="Name"
                      maxlength="100"
                      v-model="name"
                      :rules="this.nameRules"
        ></v-text-field>

        <!-- description -->
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

        <!-- moneyAccounts -->
        <v-select
            :items="items"
            label="Konto"
            v-model="moneyAccount"
            :rules="selectRules"
        ></v-select>

        <!-- money -->
        <v-text-field type="number"
                      label="Geld"
                      step="0.01"
                      prefix="€"
                      v-model.number="money"
                      :rules="this.moneyRules"
        ></v-text-field>

        <!-- first date -->
        <v-menu
            v-model="menuStart"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="computedStartingDateFormatted"
                label="Erste Ausführung"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
              v-model="startingDate"
              no-title
              scrollable
              @input="menuStart = false"
          ></v-date-picker>
        </v-menu>

        <div class="rhythm-div">
          <!-- rhythmNumber
          <v-text-field type="number"
                        :label="rhythmNumberLabel"
                        step="1"
                        min="1"
                        max="12"
                        v-model.number="rhythmNumber"
                        :rules="this.rhythmNumberRules"
          ></v-text-field>
          -->
          <v-menu
              v-model="menuRhythmNumber"
              :close-on-content-click="true"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                  class="rhythm-number"
                  :value="rhythmNumbers[rhythmNumberIndex]"
                  label="Intervall"
                  readonly
                  v-bind="attrs"
                  v-on="on"
              ></v-text-field>
            </template>
            <v-list>
              <v-list-item-group v-model="rhythmNumberIndex">
                <v-list-item
                    v-for="(item, index) in rhythmNumbers"
                    :key="index"
                >
                  <v-list-item-title>{{ item }}</v-list-item-title>
                </v-list-item>
              </v-list-item-group>
            </v-list>
            <!--
            <v-select
                :items="rhythmNumbers"
                value="Monat"
                v-model="rhythmNumber"
                :rules="this.rhythmTypeRules"
            ></v-select>
            -->
          </v-menu>

          <v-menu
              v-model="menuRhythmType"
              :close-on-content-click="true"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                  class="rhythm-type"
                  :value="rhythmTypes[rhythmTypeIndex]"
                  readonly
                  v-bind="attrs"
                  v-on="on"
              ></v-text-field>
            </template>
            <v-list>
              <v-list-item-group v-model="rhythmTypeIndex">
                <v-list-item
                    v-for="(item, index) in rhythmTypes"
                    :key="index"
                >
                  <v-list-item-title>{{ item }}</v-list-item-title>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-menu>
          <!--
          <v-select
              :items="rhythmNumbers"
              value="Monat"
              v-model="rhythmNumber"
              :rules="this.rhythmTypeRules"
          ></v-select>
          -->

          <!-- rhythmType -->
          <!--
          <v-select
              :items="rhythmTypes"
              label="Rhythmus"
              value="Monate"
              v-model="rhythmType"
              :rules="this.rhythmTypeRules"
          ></v-select>
          -->

          <v-chip-group
              v-if="rhythmTypeIndex === 0"
              v-model="weekdayIndexes"
              class="weekdays"
              multiple
              active-class="primary--text"
          >
            <v-chip
                v-for="(day, index) in weekdays"
                :key="index"
            >
              {{ day }}
            </v-chip>
          </v-chip-group>

          <!--
          <v-select
              v-if="rhythmTypeIndex === 0"
              :items="weekdays"
              label="Rhythmus"
              value="Monate"
              v-model="weekdayIndexes"
              :rules="this.rhythmTypeRules"
          ></v-select>
          -->
        </div>

        <!-- last date -->
        <v-menu
            v-model="menuEnd"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="computedEndingDateFormatted"
                label="Letzte Ausführung / Enddatum"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
              v-model="endingDate"
              no-title
              scrollable
              @input="menuEnd = false"
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
  name: "RepeatingTransactionForm",
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
    const rhythmNumberRules = [
      v => !!v || "Geben Sie bitte eine Zahl",
      v => (v >= 1  &&  v <= 12) || "Geben Sie bitte eine Zahl zwischen 1 und 12 an"
    ];
    const rhythmTypeRules = [
      v => !!v || "Geben Sie bitte einen Rhythmus an"
    ];
    /*const rhythmTypes = [
        "Wochen",
        "Monat",
        "Jahre"
    ]
    */


    const weekdays = ['MO', 'DI', 'MI', 'DO', 'FR', 'SA', 'SO'];

    if (this.$route.params.item === 'new') {
      return {
        new: true,
        name: '',
        description: '',
        items: (this.$store.getters.getMoneyAccountNames),
        moneyAccount: '',
        money: null,
        rhythmNumberIndex: 0,
        rhythmTypeIndex: 1,
        weekdays: weekdays,
        weekdayIndexes: [],

        nameRules: nameRules,
        moneyRules: moneyRules,
        selectRules: selectRules,
        rhythmNumberRules: rhythmNumberRules,
        rhythmTypeRules: rhythmTypeRules,

        startingDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        endingDate: '',//(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),

        menuStart: false,
        menuEnd: false,
        menuRhythmNumber: false,
        menuRhythmType: false
      };
    }
    else {
      //rhythmTypeIndex bestimmen
      const rhythmType = this.$store.getters.getRepeatingTransactions[this.$route.params.item].rhythmType;
      let rhythmTypeIndex = null;
      if(rhythmType === 'weekly') {
        rhythmTypeIndex = 0;
      } else if(rhythmType === 'monthly') {
        rhythmTypeIndex = 1;
      } else {
        rhythmTypeIndex = 2;
      }

      const selectedWeekdays = this.$store.getters.getRepeatingTransactions[this.$route.params.item].weekdays;
      let weekdayIndexes = []
      if(selectedWeekdays != null) {
        for(let i=0; i < selectedWeekdays.length; i++) {
          weekdayIndexes.push(weekdays.findIndex( (weekday) => weekday == selectedWeekdays[i] ));
        }
      }

      return {
        new: false,
        name: (this.$store.getters.getRepeatingTransactions[this.$route.params.item].name),
        description: (this.$store.getters.getRepeatingTransactions[this.$route.params.item].description),
        items: (this.$store.getters.getMoneyAccountNames),
        moneyAccount: (this.$store.getters.getRepeatingTransactions[this.$route.params.item].moneyAccount),
        money: (this.$store.getters.getRepeatingTransactions[this.$route.params.item].money),
        startingDate: (this.$store.getters.getRepeatingTransactions[this.$route.params.item].startingDate),
        endingDate: (this.$store.getters.getRepeatingTransactions[this.$route.params.item].endingDate),

        rhythmNumberIndex: (this.$store.getters.getRepeatingTransactions[this.$route.params.item].rhythmNumber - 1),
        rhythmTypeIndex: rhythmTypeIndex,
        weekdays: weekdays,
        weekdayIndexes: weekdayIndexes,
        //rhythmTypes: rhythmTypes,

        nameRules: nameRules,
        moneyRules: moneyRules,
        selectRules: selectRules,
        rhythmNumberRules: rhythmNumberRules,
        rhythmTypeRules: rhythmTypeRules,

        menuStart: false,
        menuEnd: false,
        menuRhythmNumber: false,
        menuRhythmType: false
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
    /*
    rhythmNumberLabel() {
      let word = "";
      if(this.rhythmType === "Woche") {
        word = "Jede ";
      } else if(this.rhythmType === "Monat") {
        word = "Jeden ";
      } else if(this.rhythmType === "Jahr") {
        word = "Jedes ";
      } else {
        word = "Alle ";
      }
      return word;
      //return (this.rhythmNumber == 1) ? ;
    },
    */

    rhythmNumbers() {
      let every = "";
      if(this.rhythmTypeIndex === 0) {
        every = "Jede ";
      } else if(this.rhythmTypeIndex === 1) {
        every = "Jeden ";
      } else if(this.rhythmTypeIndex === 2) {
        every = "Jedes ";
      }

      const rhythmNumbers = [every];
      for(let i = 2; i <= 12; i++) {
        rhythmNumbers.push("Alle " + i + ' ');
      }

      //const rhythmNumbers = [1, 2, 3];
      return rhythmNumbers;
    },
    /*
    selectedRhythmNumberComputed() {
      if(this.rhythmNumberIndex === 0) {
        if(this.rhythmTypeIndex === 0) {
          return "Jede";
        } else if(this.rhythmTypeIndex === 1) {
          return "Jeden";
        } else {
          return "Jedes";
        }
      } else {
        return this.rhythmNumberItems[this.rhythmNumberIndex];
      }
    },
    */
    rhythmTypes() {
      if(this.rhythmNumberIndex === 0) {
        return [
          "Woche",
          "Monat",
          "Jahr"
        ];
      } else {
        return [
          "Wochen",
          "Monate",
          "Jahre"
        ];
      }
    },
    /*
    selectedRhythmTypeComputed() {


      if(this.rhythmNumberIndex === 1) {
        return "Jede";
      } else if(this.rhythmTypeIndex === 2) {
        return "Jeden";
      } else {
        return "Jedes";
      }
    },
    */
    /*
    weekdays() {
      return ['MO', 'DI', 'MI', 'DO', 'FR', 'SA', 'SO'];
    },
    */
    computedStartingDateFormatted() {
      return this.formatDate(this.startingDate);
    },
    computedEndingDateFormatted() {
      return (this.endingDate != '') ? this.formatDate(this.endingDate) : '';
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
        /*
        const rhythmNumbers = () => {
          let arr = [];
          for(let i=0; i < 12; i++) {
            arr.push(i+1);
          }
          return arr;
        };
        */

        let rhythmNumbers = [];
        for(let i=0; i < 12; i++) {
          rhythmNumbers.push(i+1);
        }

        const rhythmTypes = ['weekly', 'monthly', 'yearly'];

        let weekdays = [];
        for(let i=0; i < this.weekdayIndexes.length; i++) {
          weekdays.push(this.weekdays[this.weekdayIndexes[i]]);
        }

        const data = {
          item: this.$route.params.item,
          color: this.$store.getters.getMoneyAccounts.find(account => account.name === this.moneyAccount).color,
          name: this.name,
          description: this.description,
          moneyAccount: this.moneyAccount,
          money: parseFloat(this.money.toFixed(2)),   //.replace(/\./g, ','),
          startingDate: this.startingDate,
          endingDate: this.endingDate,
          rhythmNumber: rhythmNumbers[this.rhythmNumberIndex],
          rhythmType: rhythmTypes[this.rhythmTypeIndex],
          weekdays: (this.weekdayIndexes.length == 0) ? null : weekdays,
          rhythmText: this.rhythmNumbers[this.rhythmNumberIndex] + this.rhythmTypes[this.rhythmTypeIndex]
          //color: this.color
        };

        console.log(weekdays);

        this.$store.dispatch('saveRepeatingTransaction', data)
            .then(() => {
              this.$router.push({name: 'repeatingTransactions'});
            });
      }
    },
    deleteData() {
      const data = {
        item: this.$route.params.item
      };

      this.$store.dispatch('deleteRepeatingTransaction', data)
          .then(() => {
            this.$router.push({name: 'repeatingTransactions'});
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
  width: 90%;
  margin: 50px auto 0 auto;
  padding: 2%;
}

.rhythm-div {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.rhythm-number {
  margin-right: 2.5%;
}

.rhythm-type {
  margin-left: 2.5%;
}

@media only screen and (min-width: 768px) {
  .v-card {
    width: 50%;
    margin: 50px auto 0 auto;
    padding: 2%;
  }

  .rhythm-div {
    display: flex;
    flex-wrap: wrap;
  }

  .weekdays {
    margin-left: 2.5%;
  }
}

</style>