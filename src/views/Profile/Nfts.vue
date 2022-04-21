<template>
  <div>
    <div class="tabs">
      <b-container class="pb-4 not-scroll">
        <b-row class="m-0" style="width:max-content">
          <b-button class="mr-2" variant="transparency" v-bind:class="{ 'btn-primary' : tab == 'sale' }" :to="'/profile/' + this.$route.params.address + '/nfts/sale'" style="width:120px">{{ $t('collection.sale') }}</b-button>
          <b-button class="mr-2" variant="transparency" v-bind:class="{ 'btn-primary' : tab == 'owner' }" :to="'/profile/' + this.$route.params.address  + '/nfts/owner'" style="width:120px">{{ $t('collection.holding') }}</b-button>
          <b-button class="mr-2" variant="transparency" v-bind:class="{ 'btn-primary' : tab == 'creator' }" :to="'/profile/' + this.$route.params.address  + '/nfts/creator'" style="width:120px">{{ $t('collection.created') }}</b-button>
          <b-button class="mr-2" variant="transparency" v-if="this.$route.params.address == this.$wallet.getWallet().getAccount()" :to="'/profile/' + this.$route.params.address  + '/setting'" style="width:120px">{{ $t('collection.setting') }}</b-button>
          <b-button class="mr-2" variant="transparency" v-if="this.$route.params.address == this.$wallet.getWallet().getAccount() && !collectionData.auth"  :to="'/profile/' + this.$route.params.address  + '/auth'" style="width:120px">{{ $t('collection.apply') }}</b-button>
        </b-row>
      </b-container>

      <div id="profile1_content" class="pt-4">
        <b-container>
          <b-skeleton-wrapper :loading="dataLoading">
            <template #loading>
              <b-row>
                <div class="col-12 col-sm-6 col-lg-4 col-xl-3 mb-3" v-for="n in 6">
                  <div class="card">
                    <div class="mb-4">
                      <b-skeleton-img height="200px"></b-skeleton-img>
                    </div>
                    <div class="mb-1">
                      <b-skeleton width="70%" height="20px"></b-skeleton>
                    </div>
                    <div class="mb-1">
                      <b-skeleton width="60%" height="20px"></b-skeleton>
                    </div>
                    <div class="mb-1">
                      <b-skeleton width="50%" height="20px"></b-skeleton>
                    </div>
                  </div>
                </div>
              </b-row>
            </template>
            <b-row v-if="tokens.length > 0">
              <b-col class="col-12 col-sm-6 col-lg-4 col-xl-3 mb-3" v-for="item in tokens">
                <NftItem :nft="item"></NftItem>
              </b-col>
              <b-col class="col-12 mb-3">
                <b-button class="more d-block m-auto" v-if="hasAddData" variant="primary" style="width: 100px;height:40px;" @click="loadNfts" v-bind:class="{ disabled : this.loading.loadNfts }">
                  <b-spinner v-if="this.loading.loadNfts == true"></b-spinner>
                  <span v-else>더 로드</span>
                </b-button>
              </b-col>
            </b-row>
            <div v-else class="col-12 pt-5 pb-5">
              <img class="d-block m-auto" src="/img/01Sub_empty-6.png"/>
              <p class="text-center big-size-2 mt-4 mb-4" v-if="this.$route.params.tab == 'sale'">{{ $t('collection.no_sale_nft') }}</p>
              <p class="text-center big-size-2 mt-4 mb-4" v-if="this.$route.params.tab == 'owner'">{{ $t('collection.no_owned_nft') }}</p>
              <p class="text-center big-size-2 mt-4 mb-4" v-if="this.$route.params.tab == 'creator'">{{ $t('collection.no_create_nft') }}</p>
            </div>
          </b-skeleton-wrapper>
        </b-container>
      </div>
    </div>
  </div>
</template>

<script>
import NftItem from "../Components/NftItem";
import mixCollection from "../../mixins/collection";

export default {
  name: "Nfts",
  mixins:[
    mixCollection
  ],
  components: {
    NftItem
  },
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
</script>

<style scoped>

</style>
