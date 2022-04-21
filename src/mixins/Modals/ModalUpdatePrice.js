export default {
  props:{
    nftData : Object,
    updateNftData : Function
  },
  data(){
    return {
      loading : false,
      formData : {
        price : 0
      },
    }
  },
  methods:{
    onUpdatePriceSubmit(event){
      event.preventDefault()
      this.updatePrice(this.formData.price)
    },
    async updatePrice(price){
      if(this.loading == true){
        return
      }

      this.loading = true
      let tx_hash = await this.$contract.singleNFT.updatePrice(this.nftData.net,this.nftData.token_id,'0x' + (this.toWei(price,this.nftData.token.decimals)).toString(16))
      this.loading = false

      if(tx_hash == false){
        return
      }

      if(this.$env.VUE_APP_BASE_WALLET == 'METAMASK') {
        this.$cookies.set("tx_" + this.nftData.id, tx_hash, "7d");
      }

      let nftData = this.nftData
      nftData.price = price
      this.updateNftData(nftData)

      this.$bvModal.hide("bv-modal-update-price")
    },
  }
}
