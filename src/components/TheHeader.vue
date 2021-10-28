<template>
  <v-app-bar app>
    <v-app-bar-nav-icon v-if="Object.keys($route.params).length === 0" @click="clickDrawer"></v-app-bar-nav-icon>
    <v-app-bar-nav-icon v-else @click="$router.back()">
      <v-icon>mdi-arrow-left</v-icon></v-app-bar-nav-icon>
    <v-toolbar-title>Übersicht</v-toolbar-title>
    <!-- <button @click="test">Test</button> -->
  </v-app-bar>
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
    },
    test() {
      console.log(this.$router);
    }
  }
}
</script>

<style scoped>



</style>