export default {
  computed:{
    title(){
      if(this.$route.params.tab == 'search'){
        return `"${this.$route.query.q}" 검색결과`
      }

      return "독점 디지털 자산 찾기 ⚡️"
    }
  },
}
