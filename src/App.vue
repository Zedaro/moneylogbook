<template>
  <v-app id="inspire">
    <navigation-drawer></navigation-drawer>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import NavigationDrawer from "@/components/NavigationDrawer";

export default {
  name: 'App',
  components: {
    NavigationDrawer
  }
}
</script>
