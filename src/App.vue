<template>
  <v-app id="inspire">
    <navigation-drawer></navigation-drawer>
    <the-header></the-header>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import NavigationDrawer from "@/components/NavigationDrawer";
import TheHeader from "@/components/TheHeader";


export default {
  name: 'App',
  components: {
    NavigationDrawer,
    TheHeader
  }
}
</script>

<style>

.form-card {
  width: 90%;
  margin: 50px auto 0 auto;
  padding: 2%;
}

.list-item {
  width: 90%;
}

@media only screen and (min-width: 600px) {
  .form-card {
    width: 75%;
    margin: 50px auto 0 auto;
    padding: 2%;
  }

  .list-item {
    width: 75%;
  }
}

@media only screen and (min-width: 960px) {
  .form-card {
    width: 70%;
    margin: 50px auto 0 auto;
    padding: 2%;
  }

  .list-item {
    width: 70%;
  }
}

@media only screen and (min-width: 1264px) {
  .form-card {
    width: 50%;
    margin: 50px auto 0 auto;
    padding: 2%;
  }

  .list-item {
    width: 50%;
  }
}

@media only screen and (min-width: 1904px) {

}

</style>