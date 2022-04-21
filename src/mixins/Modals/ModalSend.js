export default {
  props:{
    nftData : Object,
    updateNftData : Function,
    multiNftRow : Object,
  },
  computed:{
    maxSendAmount(){
      if(this.formData.interface != 'erc1155'){
        return 0
      }else if(this.multiNftRow.sell_amount == undefined || this.multiNftRow.sell_amount == ""){
        return parseInt(this.multiNftRow.amount)
      }

      return parseInt(this.multiNftRow.amount) - parseInt(this.multiNftRow.sell_amount)
    },
    submitDisabled(){
      if(this.loading == true){
        return true
      }else if(this.formData.reviceAddress == "" || this.formData.reviceAddress.length != 42){
        return true
      }else if(this.formData.interface == "erc1155" && (this.formData.sendAmount == ""  || this.formData.sendAmount == 0 || this.formData.sendAmount == undefined)){
        return true
      }else if(this.formData.interface == "erc1155" && (this.formData.sendAmount > this.maxSendAmount)){
        return true
      }

      return false
    }
  },
  data(){
    return {
      loading : false,
      formData : {
        interface : null,
        reviceAddress : "",
        sendAmount : "",
      }
    }
  },
  methods:{
    show(){
      this.formData.interface = this.nftData.interface
    },
    onSubmit(event){
      event.preventDefault()
      if(this.submitDisabled == true){
        return
      }

      this.sendNFT(this.nftData.token_id)
    },
    async sendNFT(tokenId){
      let tx_hash

      this.loading = true

      if(this.formData.interface == 'erc721') {
        tx_hash = await this.$contract.singleNFT.transferFrom(this.nftData.net,this.$wallet.getWallet().getAccount(), this.formData.reviceAddress, this.nftData.token_id)
      }else if(this.formData.interface == 'erc1155'){
        tx_hash = await this.$contract.multiNFT.safeTransferFrom(this.nftData.net,this.$wallet.getWallet().getAccount(), this.formData.reviceAddress, this.nftData.token_id,"0x" + parseInt(this.formData.sendAmount).toString(16),"0x")
      }

      this.loading = false

      if(tx_hash == false){
        return
      }

      this.$bvModal.hide("bv-modal-send")
      this.$router.go();
    },
    async before(){
      if(this.$wallet.getWallet().isConnect() == false || this.$wallet.getWallet().getAccount() == undefined){
        this.$wallet.getWallet().connectWallet()
        return false
      }

      return true
    },
  }
}
