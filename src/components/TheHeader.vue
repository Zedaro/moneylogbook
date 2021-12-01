<template>
  <v-app-bar app>
    <v-app-bar-nav-icon v-if="Object.keys($route.params).length === 0 && this.$route.params.item !== 'new'" @click="clickDrawer"></v-app-bar-nav-icon>   <!-- Object.keys($route.params).length === 0 -->
    <v-app-bar-nav-icon v-else @click="$router.back()">
      <v-icon>mdi-arrow-left</v-icon></v-app-bar-nav-icon>
    <v-toolbar-title>{{ toolbarTitle }}</v-toolbar-title>
    <button @click="test">Test</button>
    <button class="newLocalStorageButton" @click="newLocalStorage">Reset localStorage</button>
    <!-- <button class="newLocalStorageButton" @click="deleteLocalStorage">Delete localStorage</button> -->

    <!--
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
            v-model=""
            readonly
            v-bind="attrs"
            v-on="on"
        ></v-text-field>
      </template>
      <v-select
          :items="languages"
          label="Konto"
          v-model="moneyAccount"
      >

      </v-select>
    </v-menu>
    -->

  </v-app-bar>
</template>

<script>
export default {
  name: "TheHeader",
  data() {
    return {
      menu: false
    }
  },
  computed: {
    toolbarTitle() {
      //Übersichts-Seiten
      if(this.$route.meta.title) {
        return this.$route.meta.title;
      }
      //Neuer Eintrag
      else if(this.$route.params.item === 'new')
        if(this.$route.meta.formType === this.$t('formType.moneyAccount')) {
          return this.$t('headerTitle.new.moneyAccount');
        } else if(this.$route.meta.formType === this.$t('formType.transaction')) {
          return this.$t('headerTitle.new.transaction');
        } else if(this.$route.meta.formType === this.$t('formType.repeatingTransaction')) {
          return this.$t('headerTitle.new.repeatingTransaction');
        } else {
          return this.$t('headerTitle.new.transfer');
        }
      //Eintrag bearbeiten
      else {
        if(this.$route.meta.formType === this.$t('formType.moneyAccount')) {
          return this.$t('headerTitle.edit.moneyAccount');
        } else if(this.$route.meta.formType === this.$t('formType.transaction')) {
          return this.$t('headerTitle.edit.transaction');
        } else if(this.$route.meta.formType === this.$t('formType.repeatingTransaction')) {
          return this.$t('headerTitle.edit.repeatingTransaction');
        } else {
          return this.$t('headerTitle.edit.transfer');
        }
      }
    }
  },
  methods: {
    clickDrawer() {
      this.$store.dispatch("setDrawer");
    },
    test() {
      //console.log( parseFloat((10.05 + 10.05).toFixed(2)) );
      console.log(10.1 > 0);
    },
    newLocalStorage() {
      this.$store.dispatch('setLocalStorage', true);
    },
    deleteLocalStorage() {
      localStorage.removeItem('state');
    }
  }
}
</script>

<style scoped>

  .newLocalStorageButton {
    border: solid black 1px;
    margin-left: 10px;
  }

</style>