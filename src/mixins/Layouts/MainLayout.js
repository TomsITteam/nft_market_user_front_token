export default {
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
}
