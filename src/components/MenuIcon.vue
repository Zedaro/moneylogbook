<template>
  <img @click="clickMenuIcon" src="../assets/icons8-menu-50.png" alt="Menu Icon">
</template>

<script>
export default {
  name: "MenuIcon",
  methods: {
    clickMenuIcon() {
      this.$store.dispatch("clickMenuIcon")
    }
  }
}
</script>

<style scoped>

</style>