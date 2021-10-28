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
