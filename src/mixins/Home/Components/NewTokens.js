export default {
  data(){
    return {
      loading:{
        newTokensData : true,
      },
      newTokensData : [],
    }
  },
  methods:{
    async newTokens(){
      this.loading.newTokensData = true
      let result = await this.$api.newTokens({
        data : {}
      })

      this.newTokensData = result
      this.loading.newTokensData = false
    },
  },
  created() {
    this.newTokens()
  }
}
