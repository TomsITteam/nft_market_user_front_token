<template>
  <div class="network-btc state-app state-app_setup state-app_setup_register">
    <main-header></main-header>
    <router-view></router-view>
    <main-footer v-if="nonFooter"></main-footer>
  </div>
</template>

<script>
import MainHeader from "@/skin/default/Layouts/MainHeader";
import MainFooter from "@/skin/default/Layouts/MainFooter";
import MainLayout from "@/mixins/Layouts/MainLayout";

export default {
  name: "MainLayout",
  mixins: [MainLayout],
  components: {MainFooter, MainHeader},
}
</script>

<style scoped>

</style>
