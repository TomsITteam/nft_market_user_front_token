export default {
  computed:{
    tab(){
      return this.$route.params.tab
    },
    tokens(){
      if(this.$route.params.tab == 'sale'){
        return this.collectionSaleNFTData
      }else if(this.$route.params.tab == 'owner'){
        return this.collectionHoldingNFTData
      }else if(this.$route.params.tab == 'creator'){
        return this.collectionCreatedNFTData
      }

      return []
    },
    dataLoading(){
      if(this.$route.params.tab == 'sale'){
        return this.loading.collectionSaleNFTData
      }else if(this.$route.params.tab == 'owner'){
        return this.loading.collectionHoldingNFTData
      }else if(this.$route.params.tab == 'creator'){
        return this.loading.collectionCreatedNFTData
      }

      return false
    },
    hasAddData(){
      if(this.$route.params.tab == 'sale'){
        if((this.collectionSaleNFTTotal - (this.currentPage * this.limit)) > 0){
          return true
        }
      }else if(this.$route.params.tab == 'owner'){
        if((this.collectionHoldingNFTTotal - (this.currentPage * this.limit)) > 0){
          return true
        }
      }else if(this.$route.params.tab == 'creator'){
        if((this.collectionCreatedNFTTotal - (this.currentPage * this.limit)) > 0){
          return true
        }
      }


      return false
    }
  },
  watch:{
    collectionData(val){
      if(this.$route.params.tab == 'sale'){
        document.title = val.nick + " " + this.$t('collection.collection_sale') + " | " + this.$env.VUE_APP_NAME
      }else if(this.$route.params.tab == 'owner'){
        document.title = val.nick + " " + this.$t('collection.owned_collection') + " | " + this.$env.VUE_APP_NAME
      }else if(this.$route.params.tab == 'creator'){
        document.title = val.nick + " " + this.$t('collection.collection_created') +  " | " + this.$env.VUE_APP_NAME
      }
    }
  },
  props:{
    collectionData : {
      type : Object
    }
  },
  data(){
    return {
      loading : {
        collectionHoldingNFTData : true,
        collectionSaleNFTData : true,
        loadNfts : false
      },

      currentPage : 1,
      limit : 8,

      collectionHoldingNFTTotal : 0,
      collectionHoldingNFTData : [],
      collectionSaleNFTTotal : 0,
      collectionSaleNFTData : [],
    }
  },
  methods : {
    async loadNfts(){
      if(this.loading.loadNfts == true){
        return
      }

      let data = {
        address : this.$route.params.address
      }

      this.loading.loadNfts = true

      if(this.$route.params.tab == 'sale'){
        await this.collectionSaleNFT({
          ...data,
          offset : this.currentPage * this.limit
        })
      }else if(this.$route.params.tab == 'owner'){
        await this.collectionHoldingNFT({
          ...data,
          offset : this.currentPage * this.limit
        })
      }else if(this.$route.params.tab == 'creator'){
        await this.collectionCreatedNFT({
          ...data,
          offset : this.currentPage * this.limit
        })
      }

      this.loading.loadNfts = false

      this.currentPage++
    },
    async collectionHoldingNFT(data){
      let result = await this.$api.collectionHoldingNFT({
        data
      })

      this.collectionHoldingNFTTotal = result.total
      this.collectionHoldingNFTData = [
        ...this.collectionHoldingNFTData,
        ...result.data
      ]
    },
    async firstCollectionHoldingNFT(data){
      this.loading.collectionHoldingNFTData = true
      await this.collectionHoldingNFT(data)
      this.loading.collectionHoldingNFTData = false
    },

    async firstCollectionCreatedNFT(data){
      this.loading.collectionCreatedNFTData = true
      await this.collectionCreatedNFT(data)
      this.loading.collectionCreatedNFTData = false
    },
    async collectionSaleNFT(data){
      let result = await this.$api.collectionSaleNFT({
        data
      })

      this.collectionSaleNFTTotal = result.total
      this.collectionSaleNFTData = [
        ...this.collectionSaleNFTData,
        ...result.data
      ]
    },
    async firstCollectionSaleNFT(data){
      this.loading.collectionSaleNFTData = true
      await this.collectionSaleNFT(data)
      this.loading.collectionSaleNFTData = false
    },

    dataUpdate(data,tab){
      if(tab == 'sale'){
        if(this.collectionData != undefined) {
          document.title = this.collectionData.nick + " " + this.$t('collection.collection_sale') + " | " + this.$env.VUE_APP_NAME
        }

        this.collectionSaleNFTTotal = 0
        this.collectionSaleNFTData = []
        this.firstCollectionSaleNFT(data)
      }else if(tab == 'owner'){
        if(this.collectionData != undefined) {
          document.title = this.collectionData.nick + " " + this.$t('collection.owned_collection') + " | " + this.$env.VUE_APP_NAME
        }

        this.collectionHoldingNFTTotal = 0
        this.collectionHoldingNFTData = []
        this.firstCollectionHoldingNFT(data)
      }else if(tab == 'creator'){
        if(this.collectionData != undefined) {
          document.title = this.collectionData.nick + " " + this.$t('collection.collection_created') + " | " + this.$env.VUE_APP_NAME
        }

        this.collectionCreatedNFTTotal = 0
        this.collectionCreatedNFTData = []
        this.firstCollectionCreatedNFT(data)
      }
    }
  },
  beforeRouteUpdate(to,from,next){
    this.currentPage = 1

    this.dataUpdate({
      address : to.params.address
    },to.params.tab)
    next()
  },
  created() {

    this.dataUpdate({
      address : this.$route.params.address
    },this.$route.params.tab)
  }
}
