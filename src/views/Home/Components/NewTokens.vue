<template>
  <div class="new_sec">
    <div class="container">
      <h3 class="sub_title">{{ $t('home.new_nft') }}</h3>

        <b-skeleton-wrapper :loading="loading.newTokensData">
          <template #loading>
            <b-row>
              <div class="d-none col-12 col-sm-6 col-lg-4 col-xl-3" v-for="n in 4"
                   v-bind:class="{
                    'd-xl-block' : n==4,
                    'd-lg-block' : n==3,
                    'd-sm-block' : n==2,
                    'd-block' : n==1
                  }"
              >
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
          <b-row v-if="newTokensData.length > 0">
            <b-col class="col-12 col-sm-6 col-lg-4 col-xl-3 mb-3" v-for="item in newTokensData">
              <NftItem :nft="item"></NftItem>
            </b-col>
          </b-row>
          <div v-else class="pt-5 pb-5">
            <img class="d-block m-auto" src="/img/01Sub_empty-4.png"/>
            <p class="text-center big-size-2 mt-4 mb-4">등록된 NFT가 없습니다</p>
          </div>
        </b-skeleton-wrapper>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import NftItem from "../../Components/NftItem";

export default {
  name: "NewTokens",
  components: {
    Carousel,
    Slide,
    NftItem
  },
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
</script>

<style scoped>

</style>
