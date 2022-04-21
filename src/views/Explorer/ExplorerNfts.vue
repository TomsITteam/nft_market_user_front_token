<template>
  <div class="tab_content pt-5 pb-5" id="digital1_content">
    <b-container>
      <b-skeleton-wrapper class="w-100" :loading="loading.explorerNFTData">
        <template #loading>
          <b-row>
            <div class="col-12 col-sm-6 col-lg-4 col-xl-3" v-for="n in 8">
              <div class="card mb-30">
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

        <b-row v-if="explorerNFTData.length > 0">
          <div class="col-12 col-md-6 col-lg-4 col-xl-3 mb-30" v-for="item of explorerNFTData">
            <NftItem :nft="item"></NftItem>
          </div>
        </b-row>
        <div v-else class="col-12 pt-5 pb-5">
          <img class="d-block m-auto" src="/img/01Sub_empty-2.png"/>
          <p class="text-center big-size-2 mb-4">등록된 NFT가 없습니다</p>
          <b-button class="but-created d-block base-font-weight" variant="primary" v-on:click="gotoCreated">NFT 만들기</b-button>
        </div>
      </b-skeleton-wrapper>
    </b-container>
    <b-button class="more d-block m-auto" v-if="hasAddData" variant="primary" style="width: 100px;height:40px;" @click="loadNfts" v-bind:class="{ disabled : this.loading.loadNfts }">
      <b-spinner v-if="this.loading.loadNfts == true"></b-spinner>
      <span v-else>더 로드</span>
    </b-button>
  </div>
</template>

<script>
import NftItem from "../Components/NftItem";
export default {
  name: "ExplorerNfts",
  components: {
    NftItem
  },
  computed:{
    hasAddData(){
      if((this.explorerNFTTotal - (this.currentPage * this.limit)) > 0){
        return true
      }

      return false
    }
  },
  data(){
    return {
      loading : {
        explorerNFTData : true,
        loadNfts : false
      },

      currentPage : 1,
      limit : 12,

      explorerNFTTotal : 0,
      explorerNFTData : []
    }
  },
  methods:{
    gotoCreated() {
      this.$router.gotoCreated()
    },
    async loadNfts(){
      if(this.loading.loadNfts == true){
        return
      }

      let data = {
        tab : this.$route.params.tab
      }
      if(this.$route.query.q != undefined){
        data.q = this.$route.query.q
      }

      this.loading.loadNfts = true

      await this.explorerNFT({
        ...data,
        offset : this.currentPage * this.limit
      })

      this.loading.loadNfts = false

      this.currentPage++
    },
    async explorerNFT(data){
      let result = await this.$api.explorerNFT({
        data
      })

      this.explorerNFTTotal = result.total
      this.explorerNFTData = [
        ...this.explorerNFTData,
        ...result.data
      ]
    },
    async firstExplorerNFT(data){
      this.loading.explorerNFTData = true

      await this.explorerNFT(data)

      this.loading.explorerNFTData = false
    },
    dataUpdate(data){
      this.firstExplorerNFT(data)
    }
  },
  beforeRouteUpdate(to,from,next){
    if(to.params.tab == "all"){
      document.title =  "전체 NFT 전체 목록 | " + this.$env.VUE_APP_NAME
    }else if(to.params.tab == "game"){
      document.title =  "게임 NFT 전체 목록 | " + this.$env.VUE_APP_NAME
    }else if(to.params.tab == "art"){
      document.title =  "아트 NFT 전체 목록 | " + this.$env.VUE_APP_NAME
    }else if(to.params.tab == "photo"){
      document.title =  "사진 NFT 전체 목록 | " + this.$env.VUE_APP_NAME
    }else if(to.params.tab == "memes"){
      document.title =  "밈 NFT 전체 목록 | " + this.$env.VUE_APP_NAME
    }else if(to.params.tab == "music"){
      document.title =  "음악 NFT 전체 목록 | " + this.$env.VUE_APP_NAME
    }else if(to.params.tab == "search"){
      document.title =   to.query.q + " 검색결과 | " + this.$env.VUE_APP_NAME
    }

    this.currentPage = 1

    let data = {
      tab : to.params.tab
    }
    if(to.query.q != undefined){
      data.q = to.query.q
    }

    this.explorerNFTTotal = 0
    this.explorerNFTData = []
    this.dataUpdate(data)
    next()
  },
  created() {
    if(this.$route.params.tab == "all"){
      document.title =  "전체 NFT 전체 목록 | " + this.$env.VUE_APP_NAME
    }else if(this.$route.params.tab == "game"){
      document.title =  "게임 NFT 전체 목록 | " + this.$env.VUE_APP_NAME
    }else if(this.$route.params.tab == "art"){
      document.title =  "아트 NFT 전체 목록 | " + this.$env.VUE_APP_NAME
    }else if(this.$route.params.tab == "photo"){
      document.title =  "사진 NFT 전체 목록 | " + this.$env.VUE_APP_NAME
    }else if(this.$route.params.tab == "memes"){
      document.title =  "밈 NFT 전체 목록 | " + this.$env.VUE_APP_NAME
    }else if(this.$route.params.tab == "music"){
      document.title =  "음악 NFT 전체 목록 | " + this.$env.VUE_APP_NAME
    }else if(this.$route.params.tab == "search"){
      document.title =   this.$route.query.q + " 검색결과 | " + this.$env.VUE_APP_NAME
    }

    let data = {
      tab : this.$route.params.tab
    }
    if(this.$route.query.q != undefined){
      data.q = this.$route.query.q
    }

    this.firstExplorerNFT(data)
  }
}
</script>

<style scoped>

</style>
