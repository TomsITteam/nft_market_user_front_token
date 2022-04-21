export default {
  props:{
    tokenBalance : Number,
    propNftData : Object,
    updateNftData : Function
  },
  watch:{
    propNftData(val){
      this.nftData = val
    }
  },
  computed:{
    lackBalance(){
      this.setBalance()

      if(this.nftData.token.tokenAddress == '0x0000000000000000000000000000000000000000' && this.formData.price > this.balance){
        return true
      }else if(this.nftData.token.tokenAddress != '0x0000000000000000000000000000000000000000' && this.toUint(this.tokenBalance,this.nftData.token.decimals) < this.formData.price){
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

      let value = 0
      let tokenValue = 0
      if(this.nftData.token.tokenAddress == '0x0000000000000000000000000000000000000000'){
        value = this.formData.price
      }else{
        tokenValue = this.toWei(this.formData.price,this.nftData.token.decimals)
      }

      this.loading = true
      let tx_hash = await this.$contract.singleNFT.bid(this.nftData.net,this.nftData.token_id,value,tokenValue)
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
      if(this.$wallet.getWallet().isConnect() == false || this.$wallet.getWallet().getAccount() == undefined){
        this.$wallet.getWallet().connectWallet()
        return false
      }

      return true
    },
    async setBalance(){
      this.balance = (await this.$wallet.getWallet().getBalance(this.$wallet.getWallet().getAccount())) / 1000000000000000000
    },
  }
}
