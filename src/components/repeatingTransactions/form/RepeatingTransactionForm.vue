<template>
  <div>
    <v-card class="form-card">

      <validation-observer v-slot="{ handleSubmit }">
        <v-form ref="transactionForm" @submit.prevent="handleSubmit(saveData)">

          <!-- name -->
          <validation-provider rules="required|regex" v-slot="{ errors }">
            <v-text-field counter="100"
                          label="Name"
                          maxlength="100"
                          v-model="name"
                          :error-messages="errors"
            ></v-text-field>
          </validation-provider>

          <!-- description -->
          <validation-provider rules="regex" v-slot="{ errors }">
            <v-textarea
                maxlength="1000"
                v-model="description"
                :error-messages="errors"
            >
              <template v-slot:label>
                <div>
                  Beschreibung <small>(optional)</small>
                </div>
              </template>
            </v-textarea>
          </validation-provider>

          <!-- moneyAccounts -->
          <validation-provider rules="required" v-slot="{ errors }">
            <v-select
                :items="items"
                label="Konto"
                v-model="moneyAccount"
                :error-messages="errors"
            ></v-select>
          </validation-provider>

          <!-- money -->
          <validation-provider rules="required|not_zero" v-slot="{ errors }">
            <v-text-field type="number"
                          label="Geld"
                          step="0.01"
                          prefix="€"
                          v-model.number="money"
                          :error-messages="errors"
            ></v-text-field>
          </validation-provider>

          <!-- first date -->
          <validation-provider rules="required" v-slot="{ errors }">
            <v-menu
                v-model="menuStart"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
                :disabled="disabled"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="computedStartingDateFormatted"
                    label="Erste Ausführung"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    :disabled="disabled"
                    :error-messages="errors"
                ></v-text-field>
              </template>
              <v-date-picker
                  v-model="startingDate"
                  no-title
                  scrollable
                  @input="menuStart = false"
                  :allowed-dates="allowedStartingDates"
                  :disabled="disabled"
              ></v-date-picker>
            </v-menu>
          </validation-provider>

          <div class="rhythm-div">
            <!-- rhythmNumber -->
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
            <validation-provider rules="required" v-slot="{ errors }">
              <v-menu
                  v-model="menuRhythmNumber"
                  :close-on-content-click="true"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                  :disabled="disabled"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      class="rhythm-number"
                      :value="rhythmNumbers[rhythmNumberIndex]"
                      label="Intervall"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :disabled="disabled"
                      :error-messages="errors"
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
            </validation-provider>

            <!-- rhythmType -->
            <validation-provider rules="required" v-slot="{ errors }">
              <v-menu
                  v-model="menuRhythmType"
                  :close-on-content-click="true"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                  :disabled="disabled"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      class="rhythm-type"
                      :value="rhythmTypes[rhythmTypeIndex]"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :disabled="disabled"
                      :error-messages="errors"
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
            </validation-provider>
            <!--
            <v-select
                :items="rhythmNumbers"
                value="Monat"
                v-model="rhythmNumber"
                :rules="this.rhythmTypeRules"
            ></v-select>
            -->

            <!--
            <v-select
                :items="rhythmTypes"
                label="Rhythmus"
                value="Monate"
                v-model="rhythmType"
                :rules="this.rhythmTypeRules"
            ></v-select>
            -->

            <!-- weekdays -->
            <validation-provider v-if="rhythmTypeIndex === 0" rules="required" v-slot="{ errors, validated, invalid }">
              <v-chip-group
                  v-model="weekdayIndexes"
                  :class="{ weekdays, 'no-weekdays': validated && invalid }"
                  multiple
                  active-class="primary--text"
                  :error-messages="errors"
              >
                <v-chip
                    v-for="(day, index) in weekdays"
                    :key="index"
                    name="chipGroup"
                >
                  {{ day }}
                </v-chip>
              </v-chip-group>
            </validation-provider>

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
                  label="Letzte Ausführung / Enddatum (optional)"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  :rules="endingDateRules"
              ></v-text-field>
            </template>
            <v-date-picker
                v-model="endingDate"
                no-title
                scrollable
                @input="menuEnd = false"
                :allowed-dates="allowedEndingDates"
            ></v-date-picker>
          </v-menu>


          <save-delete @saveData="saveData"
                       @deleteData="deleteData"
          ></save-delete>
          <!-- <edit-money-account v-else></edit-money-account> -->

        </v-form>
      </validation-observer>

    </v-card>

    <button @click="test">Test</button>

  </div>
</template>

<script>
import SaveDelete from "@/components/buttons/SaveDelete";
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import '../../../ValidationRules/validationRules';

export default {
  name: "RepeatingTransactionForm",
  components: { SaveDelete, ValidationObserver, ValidationProvider },
  data() {


    //<editor-fold desc="Rules">
    const nameRules = [
      v => !!v || "Geben Sie bitte einen Namen an"
    ];
    const moneyRules = [
      v => !!v || "Geben Sie bitte einen Betrag an"
    ];
    const selectRules = [
      v => !!v || "Geben Sie bitte ein Konto an"
    ];
    const endingDateRules = [
      () => {
          if(this.endingDate !== '') {
            const startingDateParts = this.startingDate.split('-');
            const endingDateParts = this.endingDate.split('-');
            if( endingDateParts[0] < startingDateParts[0]  ||  (endingDateParts[0] == startingDateParts[0] && endingDateParts[1] < startingDateParts[1])  ||  (endingDateParts[0] == startingDateParts[0] && endingDateParts[1] == startingDateParts[1] && endingDateParts[2] < startingDateParts[2]) ) {
              return "Das Enddatum darf nicht kleiner sein als das Startdatum";
            }
          }
          return true;
        },
      /*
      () => {
          if(this.endingDate !== '') {
            let today = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
            const todayParts = today.split('-');
            console.log(todayParts);
            const endingDateParts = this.endingDate.split('-');
            if( endingDateParts[0] < todayParts[0]  ||  (endingDateParts[0] == todayParts[0] && endingDateParts[1] < todayParts[1])  ||  (endingDateParts[0] == todayParts[0] && endingDateParts[1] == todayParts[1] && endingDateParts[2] < todayParts[2]) ) {
              return "Das Enddatum darf nicht vor dem heutigen sein";
            }
          }
          return true;
        }
      */
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
    //</editor-fold>


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
        endingDateRules: endingDateRules,

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
        endingDateRules: endingDateRules,

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
    },
    disabled() {
      return (this.$route.params.item === 'new') ? false : true;
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
    allowedStartingDates(v) {
      const today = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
      const todayParts = today.split('-');

      const startingDateParts = v.split('-');

      return ( startingDateParts[0] > todayParts[0]  ||  (startingDateParts[0] == todayParts[0] && startingDateParts[1] > todayParts[1])  ||  (startingDateParts[0] == todayParts[0] && startingDateParts[1] == todayParts[1] && startingDateParts[2] >= todayParts[2]) );
    },
    allowedEndingDates(v) {
      const today = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
      const todayParts = today.split('-');

      const startingDateParts = this.startingDate.split('-');
      const endingDateParts = v.split('-');

      const endingDateAfterOrOnThisDay = ( endingDateParts[0] > todayParts[0]  ||  (endingDateParts[0] == todayParts[0] && endingDateParts[1] > todayParts[1])  ||  (endingDateParts[0] == todayParts[0] && endingDateParts[1] == todayParts[1] && endingDateParts[2] >= todayParts[2]) );

      const endingDateAfterOrOnStartingDate = ( endingDateParts[0] > startingDateParts[0]  ||  (endingDateParts[0] == startingDateParts[0] && endingDateParts[1] > startingDateParts[1])  ||  (endingDateParts[0] == startingDateParts[0] && endingDateParts[1] == startingDateParts[1] && endingDateParts[2] >= startingDateParts[2]) )

      return (endingDateAfterOrOnThisDay && endingDateAfterOrOnStartingDate);
    },
    formatDate(date) {
      const [year, month, day] = date.split('-');
      return `${day}.${month}.${year}`;
    },
    saveData() {
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
      //sort weekdayIndexes (ascending)
      let orderedWeekdayIndexes = this.weekdayIndexes.sort(function(a, b) {return a - b});
      //console.log(this.weekdayIndexes.length);
      //fill variable "weekdays" with weekday abbreviations (e.g. MO, DI, etc.)
      for(let i=0; i < this.weekdayIndexes.length; i++) {
        weekdays.push(this.weekdays[orderedWeekdayIndexes[i]]);
      }
      console.log(this.weekdayIndexes);

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

.no-weekdays {
  background-color: RGBA(249,96,97,0.79);
}

@media only screen and (min-width: 768px) {
  .rhythm-div {
    display: flex;
    flex-wrap: wrap;
  }

  .weekdays {

  }
}

</style>