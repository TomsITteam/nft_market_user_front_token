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
import mixCollection from "../../../mixins/collection";
import Nfts from "@/mixins/Profile/Nfts";

export default {
  name: "Nfts",
  mixins:[
    mixCollection,
    Nfts
  ],
  components: {
    NftItem
  },
}
</script>

<style scoped>

</style>
