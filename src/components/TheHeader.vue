<template>
  <div>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="clickDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Übersicht</v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "TheHeader",
  data() {
    return {

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

</style>