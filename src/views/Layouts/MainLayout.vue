<template>
  <div class="network-btc state-app state-app_setup state-app_setup_register">
    <main-header></main-header>
    <router-view></router-view>
    <main-footer v-if="nonFooter"></main-footer>
  </div>
</template>

<script>
import MainHeader from "@/views/Layouts/MainHeader";
import MainFooter from "@/views/Layouts/MainFooter";

export default {
  name: "MainLayout",
  components: {MainFooter, MainHeader},
  computed:{
    nonFooter(){
      let result = this.$route.matched.some(function(el){
        if(el.meta.nonFooter == true)
          return true
      })

      if(result == true){
        return false
      }

      return true
    }
  },
  methods:{

  }
}
</script>

<style scoped>

</style>
