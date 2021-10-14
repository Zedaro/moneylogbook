<template>
  <v-navigation-drawer
      :value="drawer"
      app
  >
    <!--  -->
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "NavigationDrawer",
  computed: {
    drawer() {
      return this.$store.getters.getDrawer;
    }
  }
}
</script>

<style scoped>

</style>