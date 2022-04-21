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
import ExplorerNfts from "@/mixins/Explorer/ExplorerNfts";
export default {
  name: "ExplorerNfts",
  mixins: [ExplorerNfts],
  components: {
    NftItem
  },
}
</script>

<style scoped>

</style>
