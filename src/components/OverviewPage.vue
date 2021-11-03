<template>
  <div>
    Übersicht
    <button @click="test">Test</button>
  </div>

</template>

<script>
export default {
  name: "OverviewPage",
  methods: {
    test() {
      var myStorage = window.localStorage;
      console.log(myStorage);
    }
  }
}
</script>

<style scoped>

</style>