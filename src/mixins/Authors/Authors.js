export default {
  computed:{
    tabText(){
      if(this.$route.params.tab == 'auth'){
        return this.$t('header.certified_creator')
      }else if(this.$route.params.tab == 'unauth'){
        return this.$t('header.uncertified_creator')
      }

      return this.$t('header.all')
    },
    hasAddData(){
      return (this.explorerCollectionTotal - (this.currentPage * this.limit)) > 0;
    }
  },
  data(){
    return {
      loading : {
        explorerCollectionData : true,
        loadCollectionData : false
      },
      explorerCollectionTotal : 0,
      explorerCollectionData : [],

      currentPage : 1,
      limit : 12,

      orderBy:"like_cun",

      formData:{
        q : ""
      }
    }
  },
  methods:{
    changeOrderBy(){
      if(this.orderBy == this.$route.params.tab){
        return
      }

      this.$router.push({
        path : '/authors/' + this.$route.params.tab + '?order_by=' + this.orderBy
      })
    },
    onSearchSubmit(event){
      event.preventDefault()

      let query = {}
      if(this.$route.query.order_by != undefined){
        query.order_by = this.$route.query.order_by
      }

      if(this.formData.q != ""){
        query.q = this.formData.q
      }

      this.$router.push({
        name : "authors",
        params : {
          tab : this.$route.params.tab
        },
        query
      })
    },
    async explorerCollection(data){
      let result = await this.$api.explorerCollection({
        data : {
          ...data,
          minNFT : 4
        }
      })

      for(var index in result.data){
        let images = await this.collectionCreatedNFT({
          address : result.data[index].address,
          offset  : 0,
          limit : 4
        })

        result.data[index].images = images.data
      }

      this.explorerCollectionTotal = result.total
      this.explorerCollectionData = [
        ...this.explorerCollectionData,
        ...result.data
      ]
    },
    async firstExplorerCollection(data){
      this.loading.explorerCollectionData = true

      await this.explorerCollection(data)

      this.loading.explorerCollectionData = false
    },
    dataUpdate(data){
      this.firstExplorerCollection(data)
    },
    async loadCollection(){
      if(this.loading.loadCollectionData == true){
        return
      }

      let data = this.getData(this.$route)
      data.offset = this.currentPage * this.limit

      this.loading.loadCollectionData = true

      await this.explorerCollection(data)

      this.loading.loadCollectionData = false

      this.currentPage++
    },
    getData(route){
      let data = {
        tab : route.params.tab,
        order_by : "",
        q : ""
      }

      if(route.query.order_by != undefined){
        data.order_by = route.query.order_by
      }

      if(route.query.q != undefined){
        data.q = route.query.q
      }

      if(route.query.page != undefined){
        this.currentPage = route.query.page
        data.offset = (route.query.page-1) * this.limit
      }

      return data
    },
  },
  beforeRouteUpdate(to,from,next){
    if(to.params.tab == 'all') {
      if(to.query.q == undefined){
        document.title = "모든 저자 | " + this.$env.VUE_APP_NAME
      }else{
        document.title = to.query.q + " 저자 검색결과 | " + this.$env.VUE_APP_NAME
      }
    }else if(to.params.tab == 'auth'){
      document.title = "인증된 저자 | " + this.$env.VUE_APP_NAME
    }else if(to.params.tab == 'unauth'){
      document.title = "미인증 저자 | " + this.$env.VUE_APP_NAME
    }

    this.explorerCollectionData = []
    this.explorerCollectionTotal = 0

    this.dataUpdate(this.getData(to))
    next()
  },
  created() {
    if(this.$route.query.order_by != undefined) {
      this.orderBy = this.$route.query.order_by
    }

    if(this.$route.params.tab == 'all') {
      if(this.$route.query.q == undefined){
        document.title = "모든 저자 | " + this.$env.VUE_APP_NAME
      }else{
        document.title = this.$route.query.q + " 저자 검색결과 | " + this.$env.VUE_APP_NAME
      }
    }else if(this.$route.params.tab == 'auth'){
      document.title = "인증된 저자 | " + this.$env.VUE_APP_NAME
    }else if(this.$route.params.tab == 'unauth'){
      document.title = "미인증 저자 | " + this.$env.VUE_APP_NAME
    }


    this.firstExplorerCollection(this.getData(this.$route))
  }
}
