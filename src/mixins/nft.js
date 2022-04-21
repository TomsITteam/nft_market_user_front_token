export default {
  computed:{
  },
  watch:{
  },
  data(){
    return {
      loading : {
        liked : false,
      },
    }
  },
  methods:{
    async liked(tokenId){
      if(this.$wallet.getWallet().beforeWalletCheck() == false){
        return
      }

      if(this.loading.liked == true){
        return
      }

      this.loading.liked = true


      let result = await this.$api.liked({
        data : {
          category : 'nft',
          token_id : tokenId,
        }
      })
      this.loading.liked = false

      if(result.error != undefined){
        alert(result.error.message)
        return
      }else if(result == false){
        return
      }

      if(result.liked == true){
        this.nftData.like++
      }else{
        this.nftData.like--
      }

    },
  },
  created() {
  }
}
