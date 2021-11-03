<template>
  <v-navigation-drawer
      :value="drawer"
      app
  >
    <v-list>
      <v-list-item-group>

        <v-list-item v-for="(item, index) in this.$store.getters.getDrawerListItems" :key="index" :to="{name: item.pathName}" three-line @click="clickDrawer">
          <v-list-item-content>
            <v-list-item-title class="text-h6">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list-item-group>
    </v-list>

  </v-navigation-drawer>
</template>

<script>
export default {
  name: "NavigationDrawer",
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
      //this.$store.dispatch("setDrawer");
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