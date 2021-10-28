<template>
  <v-navigation-drawer
      :value="drawer"
      app
  >
    <v-list>
      <v-list-item-group>

        <v-list-item v-for="(item, index) in listItems" :key="index" :to="{name: item.pathName}" three-line @click="clickDrawer">
          <v-list-item-content>
            <v-list-item-title class="text-h6">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!--
        <v-list-item :to="{name: 'overview'}" three-line @click="clickDrawer">
          <v-list-item-content>
            <v-list-item-title class="text-h6">Übersicht</v-list-item-title>
          </v-list-item-content>
        </v-list-item>



        <v-list-item :to="{name: 'transactions'}" three-line @click="clickDrawer">
          <v-list-item-content>
            <v-list-item-title class="text-h6">Transaktionen</v-list-item-title>
          </v-list-item-content>
        </v-list-item>



        <v-list-item :to="{name: 'repeatingTransactions'}" three-line @click="clickDrawer">
          <v-list-item-content>
            <v-list-item-title class="text-h6">Daueraufträge</v-list-item-title>
          </v-list-item-content>
        </v-list-item>


        <v-list-item :to="{name: 'moneyAccounts'}" three-line @click="clickDrawer">
          <v-list-item-content>
            <v-list-item-title class="text-h6">Konten</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        -->

      </v-list-item-group>
    </v-list>

  </v-navigation-drawer>
</template>

<script>
export default {
  name: "NavigationDrawer",
  data() {
    return {
      listItems: [
        {
          pathName: 'overview',
          title: 'Übersicht'
        },
        {
          pathName: 'transactions',
          title: 'Transaktionen'
        },
        {
          pathName: 'repeatingTransactions',
          title: 'Daueraufträge'
        },
        {
          pathName: 'moneyAccounts',
          title: 'Konten'
        },
      ]
    };
  },
  computed: {
    drawer() {
      return this.$store.getters.getDrawer;
    },
    height() {
      return 50;
    }
  },
  methods: {
    clickDrawer() {
      this.$store.dispatch("setDrawer");
    }
  }
}
</script>

<style scoped>
  a {
    text-decoration: none;
  }

  a:visited {
    color: black;
  }

  a:hover {
    font-weight: bold;
  }
</style>