<template>
  <b-modal id="bv-modal-bid" hide-footer>
    <template #modal-title>
      NFT {{ $t('nft.bid') }}
    </template>
    <b-form @submit.prevent="onBidSubmit">
      <label class="sign__label">{{ $t('nft.bid_price') }}</label>
      <b-input type="text" required class="sign__input mb-1 border" v-model="formData.price"/>
      <p class="text-danger pl-2 pt-0 mt-0 mb-0" v-if="lackBalance">{{ $t('nft.insufficient_balance') }}</p>
      <label class="sign__label mb-4 pl-2">{{ formData.price }} {{ nftData.net }} ≈ ￦{{ amountToPrice(nftData.net,formData.price) }}</label>
      <b-button variant="primary" class="height-50 base-font-weight mt-2 mb-4 w-100" block type="submit" v-bind:class="{ disabled : isDisabledBid }">
        <b-spinner v-if="loading"></b-spinner>
        <span v-else>{{ $t('nft.bid') }}</span>
      </b-button>
    </b-form>
  </b-modal>
</template>

<script>
export default {
  name: "ModalBid",
  props:{
    propNftData : Object,
    updateNftData : Function
  },
  watch:{
    propNftData(val){
      console.log(val)
      this.nftData = val
    }
  },
  computed:{
    lackBalance(){
      this.setBalance()

      if(this.formData.price > this.balance){
        return true
      }

      return false
    },
    isDisabledBid(){
      if(this.loading) {
        return true
      }

      if( this.lackBalance == true || this.nftData == undefined || this.nftData.bid == undefined || this.$wallet.getWallet().getAccount() == undefined){
        return true
      }

      var bidValue = this.nftData.bid.value
      var offerMinValue = this.nftData.offer.minValue
      if(bidValue == 0 && offerMinValue <= this.formData.price){
        return false
      }else if(bidValue > 0 && bidValue < this.formData.price){
        return false
      }

      return true
    },
  },
  data(){
    return {
      nftData : {},
      loading : false,
      balance : 0,
      formData : {
        price : 0
      }
    }
  },
  methods:{
    onBidSubmit(){
      if(this.isDisabledBid == true){
        return
      }

      this.bid()
    },
    async bid(){
      if(await this.before() == false){
        return
      }

      this.loading = true
      let tx_hash = await this.$contract.singleNFT.bid(this.nftData.net,this.nftData.token_id,this.formData.price)
      this.loading = false
      if(tx_hash == false){
        return
      }

      if(this.$env.VUE_APP_BASE_WALLET == 'METAMASK') {
        this.$cookies.set("tx_" + this.nftData.id, tx_hash, "7d");
      }

      let nftData = this.nftData
      nftData.bid = {
        hasBid : true,
        bidder : this.$wallet.getWallet().getAccount(),
        value : this.formData.price,
      }
      this.updateNftData(nftData)

      this.$bvModal.hide("bv-modal-bid")
    },
    async before(){
      if(this.$wallet.isConnect() == false || this.$wallet.getWallet().getAccount() == undefined){
        this.$wallet.connectWallet()
        return false
      }

      return true
    },
    async setBalance(){
      this.balance = (await this.$wallet.getWallet().getBalance(this.$wallet.getWallet().getAccount())) / 1000000000000000000
    },
  }
}
</script>

<style scoped>

</style>
