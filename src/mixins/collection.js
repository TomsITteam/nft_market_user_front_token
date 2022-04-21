export default {
  computed:{
  },
  watch:{
  },
  data(){
    return {
      loading : {
        liked : false,
        collectionCreatedNFTData : true,
      },
      collectionCreatedNFTTotal : 0,
      collectionCreatedNFTData : [],
    }
  },
  methods:{
    async collectionCreatedNFT(data){
      let result = await this.$api.collectionCreatedNFT({
        data
      })

      this.collectionCreatedNFTTotal = result.total
      this.collectionCreatedNFTData = [
        ...this.collectionCreatedNFTData,
        ...result.data
      ]

      return result
    },
    async liked(address){
      if(this.$wallet.getWallet().beforeWalletCheck() == false){
        return
      }
      this.loading.liked = true

      let result = await this.$api.liked({
        data : {
          category : 'collection',
          collection_address : address,
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
        this.collectionData.like_count++
      }else{
        this.collectionData.like_count--
      }
      this.loading.liked = false
    },
  },
  created() {
  }
}
