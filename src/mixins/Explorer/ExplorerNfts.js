export default {
  computed:{
    hasAddData(){
      return (this.explorerNFTTotal - (this.currentPage * this.limit)) > 0;
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
