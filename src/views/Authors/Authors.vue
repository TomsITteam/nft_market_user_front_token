<template>
  <main class="main">
    <div id="writer_search">
      <div class="container">
        <b-breadcrumb class="d-none d-sm-flex p-0">
          <b-breadcrumb-item to="/">{{ $t('header.home') }}</b-breadcrumb-item>
          <b-breadcrumb-item active class="text-primary">{{ $t('header.creator') }} {{ $t('header.explorer') }}</b-breadcrumb-item>
        </b-breadcrumb>
        <h2>{{ $t('header.creator') }} {{ $t('header.explorer') }}</h2>

        <div class="search_Wbar">
          <div class="all_search">

            <div class="selectBox2 d-flex align-items-center pl-2">
              <b-dropdown :text="tabText" variant="transparency" toggle-class="font-size-16" style="color:#333333;font-size:16px;">
                <b-dropdown-item to="/authors/all">{{ $t('header.all') }}</b-dropdown-item>
                <b-dropdown-item to="/authors/auth">{{ $t('header.certified_creator') }}</b-dropdown-item>
                <b-dropdown-item to="/authors/unauth">{{ $t('header.uncertified_creator') }}</b-dropdown-item>
              </b-dropdown>
            </div>

            <b-form class="search_area" @submit="onSearchSubmit">
              <b-input  type="text" :placeholder="$t('creator.search_creator')" v-model="formData.q" required/>
              <b-button type="submit" variant="transparency">{{ $t('creator.search') }}</b-button>
            </b-form>

            <div class="like_new text-right text-lg-left">
              <input @change="changeOrderBy" type="radio" name="chk_info" value="like_cun" v-model="orderBy" id="chk_info_01">
              <label for="chk_info_01" id="chk_label_01">{{ $t('creator.like') }}</label>
              <input @change="changeOrderBy" type="radio" name="chk_info" value="created_at" v-model="orderBy" id="chk_info_02">
              <label for="chk_info_02" id="chk_label_02">{{ $t('creator.new') }}</label>
            </div>
          </div>
        </div>
      </div>

      <b-skeleton-wrapper class="w-100" :loading="loading.explorerCollectionData">
        <template #loading>
          <b-container class="mt-4 mb-4 pb-4" style="padding-top: 80px !important;">
            <div class="card mb-4" v-for="n in 8">
              <b-row>
                <b-col class="col-12 mb-4 col-lg-4 pt-4">
                  <div class="d-flex">
                    <b-skeleton type="avatar" width="83px" height="83px" style="margin-right:29px"></b-skeleton>
                    <div style="width:calc(100% - 112px)">
                      <b-skeleton width="50%" height="20px"></b-skeleton>
                      <b-skeleton width="30%" height="15px"></b-skeleton>
                      <b-skeleton width="80%" height="12px"></b-skeleton>
                      <b-skeleton width="80%" height="12px"></b-skeleton>
                    </div>
                  </div>
                </b-col>
                <b-col class="d-none d-lg-block col-8">
                  <div class="overflow-hidden">
                    <div class="d-flex" style="width: max-content;">
                      <b-skeleton class="mr-3" width="230px" height="164px"></b-skeleton>
                      <b-skeleton class="mr-3" width="230px" height="164px"></b-skeleton>
                      <b-skeleton class="mr-3" width="230px" height="164px"></b-skeleton>
                      <b-skeleton class="mr-3" width="230px" height="164px"></b-skeleton>
                    </div>
                  </div>
                </b-col>
                <b-col class="d-block d-lg-none col-12">
                  <div class="overflow-hidden">
                    <div class="d-flex" style="width: max-content;">
                      <b-skeleton class="mr-3" width="170px" height="121px"></b-skeleton>
                      <b-skeleton class="mr-3" width="170px" height="121px"></b-skeleton>
                      <b-skeleton class="mr-3" width="170px" height="121px"></b-skeleton>
                      <b-skeleton class="mr-3" width="170px" height="121px"></b-skeleton>
                    </div>
                  </div>
                </b-col>
              </b-row>

            </div>
          </b-container>
        </template>

        <div class="more_slide_box">
          <Author v-for="author in explorerCollectionData" :author="author" />
        </div>

        <div class="load_bttn" v-if="hasAddData">
          <b-button class="more" @click="loadCollection" v-bind:class="{ disabled : this.loading.loadCollectionData }">
            <b-spinner v-if="this.loading.loadCollectionData == true"></b-spinner>
            <span v-else>더 로드</span>
          </b-button>
        </div>
      </b-skeleton-wrapper>
    </div>
  </main>
</template>

<script>
import Author from "../Components/Author";
import mixCollection from "@/mixins/collection";
export default {
  name: "Authors",
  mixins:[mixCollection],
  components: {
    Author
  },
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
      if((this.explorerCollectionTotal - (this.currentPage * this.limit)) > 0){
        return true
      }

      return false
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
</script>

<style scoped>

</style>
