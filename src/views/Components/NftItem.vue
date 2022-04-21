<template>
    <div class="last_img_box w-100 bg-white" v-if="nft != false">
      <router-link :to="'/nft/' + nft.id">
        <video v-if="nft.video_url" :src="nft.video_url" webkit-playsinline playsinline autoplay loop muted="muted"/>
        <img v-else :src="nft.image_url" :alt="nft.name">
      </router-link>
      <div class="last_text">
        <h4 class="text-left">{{ nft.name }}</h4>
        <p class="price_p">{{ priceTitle }}<span v-if="nft.interface  == 'erc1155'">({{ $t('nft.mintAmount') }}: {{ nft.token_amount }})</span></p>
        <p><strong>{{ nftAmount }} {{ nft.net }}</strong><span v-if="nft.net != ''"> &asymp; ￦{{ (nftPrice(nft.net,nftAmount)) }}</span></p>
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
import {mapGetters} from 'vuex'
import mixNft from "../../mixins/nft";
export default {
  name: "NftItem",
  mixins:[mixNft],
  props : {
    nft : {
      required : true,
      type : Object
    }
  },
  computed:{
    profile(){
      if(this.nft.interface == 'erc1155'){
        return this.nft.creator
      }

      return this.nft.owner
    },
    nftAmount(){
      if(this.nft.offer == undefined || this.nft.offer.isForSale != true){
        return this.nft.price
      }

      return this.nft.offer.minValue
    },
    priceTitle(){
      if(this.nft.offer != undefined && this.nft.offer.isForSale == true){
        return this.$t('nft.bid_price')
      }

      return this.$t('nft.price')
    },
    isSale(){
      if(this.nft.offer == undefined){
        return false
      }

      return this.nft.offer.isForSale
    }
  },
  watch:{
    time(val){
      if(this.nft == undefined || this.nft.offer == undefined || this.nft.offer.endTime == undefined){
        return ""
      }

      let remainingsScond = this.nft.offer.endTime - val
      if(remainingsScond < 0){
        this.remainingTime = '00:00'
        return
      }else if(remainingsScond > 86400){
        this.remainingTime =parseInt(remainingsScond / 86400) + this.$t('nft.day')
        return
      }

      let hours = parseInt(remainingsScond / 3600)

      remainingsScond -= hours * 3600
      if(hours < 10){
        hours = "0" + hours
      }

      let minutes = parseInt(remainingsScond  / 60)
      remainingsScond -= minutes * 60
      if(minutes < 10){
        minutes = "0" + minutes
      }

      let scond  = parseInt(remainingsScond )
      remainingsScond -= scond
      if(scond < 10){
        scond = "0" + scond
      }

      if(hours > 0){
        this.remainingTime = `${hours}:${minutes}`
        return
      }

      this.remainingTime = `${minutes}:${scond}`
    }
  },
  data(){
    return {
      nftData : null,
      timer : null,
      time : 0,
      remainingTime : '00:00'
    }
  },
  methods:{
    setTime(){
      this.time = parseInt((new Date()).getTime() / 1000)
    },
    startTimer() {
      this.timer = setInterval(() => this.setTime(), 1000);
    },
    nftPrice(net,amount){
      let price = parseInt(this.amountToPrice(net,amount))

      return price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  created() {
    this.nftData = this.nft

    if(this.nftData.interface == 'erc1155'){
      return
    }

    this.setTime()
    this.startTimer()
  }
}
</script>

<style scoped>

</style>
