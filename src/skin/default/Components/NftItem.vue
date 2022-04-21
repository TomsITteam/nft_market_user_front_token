<template>
  <div class="last_img_box w-100 bg-white">
    <router-link :to="'/nft/' + nft.id">
      <img v-if="(nft.video_url && nft.image_url && mouse==false) || (!nft.video_url && nft.image_url)" :src="nft.image_url" :alt="nft.name"  width="310px" height="263px">
      <video v-bind:class="{ 'd-none':(!mouse && nft.image_url) }" v-if="nft.video_url" :src="nft.video_url" webkit-playsinline playsinline autoplay loop muted="muted"/>

      <span v-if="nft.video_url" style="position: absolute;top:18px;right:24px;color:#fff;">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style="width: 24px;height: 24px;fill: #fff;"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M384 112v288c0 26.51-21.49 48-48 48h-288c-26.51 0-48-21.49-48-48v-288c0-26.51 21.49-48 48-48h288C362.5 64 384 85.49 384 112zM576 127.5v256.9c0 25.5-29.17 40.39-50.39 25.79L416 334.7V177.3l109.6-75.56C546.9 87.13 576 102.1 576 127.5z"/></svg>
        </span>
    </router-link>
    <div class="last_text">
      <h4 class="text-left">{{ nft.name }}</h4>
      <p class="price_p">{{ priceTitle }}<span v-if="nft.interface  == 'erc1155'">({{ nft.token_amount }})</span></p>
      <p v-if="nftData.token == undefined || nftData.token.symbol == undefined">{{ $t('nft.unregistered') }}</p>
      <p v-else>
        <strong>
          {{ (nftAmount) }}
          <span v-if="$env.VUE_APP_HAS_MULTI_NET == 'on' && nftData.net != nftData.token.symbol">
              {{ nftData.net }}-
            </span>
          <span v-if="nftData.token != undefined">
              {{ nftData.token.symbol }}
            </span>
          <span v-else>
              {{ $env.VUE_APP_BASE_MAINNET }}
            </span>
        </strong>
        <span v-if="nftData.token == undefined && nftData.token.tokenAddress == '0x0000000000000000000000000000000000000000'"> &asymp; ￦{{ (nftPrice(nftData.net,nftAmount)) }}</span>
      </p>
    </div>

    <div class="d-flex justify-content-center align-items-center last_icon pr-3 pl-3">

      <router-link class="d-flex align-items-center" :to="'/profile/' + profile.address">
          <span class="position-relative" v-bind:class="{ 'asset__action--verified' : profile.auth }">
            <img  class="avatar border-radius-50 mr-2" :src="profile.avatar" :alt="profile.name">
          </span>
        <span class="nick">@{{ profile.name }}</span>
      </router-link>

      <button class="card__likes ml-auto" type="button" @click="liked(nft.token_id)" style="height: 20px;">
        <i class="fal fa-heart mr-1"></i>
        <b-spinner small v-if="loading.liked"></b-spinner>
        <span v-else>
            {{ reduceUint(nftData.like) }}
          </span>
      </button>
    </div>

    <div class="sec7-text-box" v-if="isSale">
          <span>
            <i class="fas fa-tag mr-2"></i>
            {{ remainingTime }}
          </span>
    </div>
  </div>
</template>

<script>
import mixNft from "../../../mixins/nft";
import NftItem from "@/mixins/Components/NftItem";
export default {
  name: "NftItem",
  mixins:[mixNft, NftItem],
}
</script>

<style scoped>

</style>
