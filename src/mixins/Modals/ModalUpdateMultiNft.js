export default {
  props:{
    nftData : Object,
    sellerData : Object,
    updateNftData : Function
  },
  computed:{
    price(){
      return this.formData.price * this.formData.amount
    },
    isDisabled(){
      if(this.loading == true){
        return true
      }else if(this.formData.isForSale == "false"){
        return false
      }else if(this.formData.isForSale == true && (this.formData.amount <= 0 || this.formData.price <= 0)){
        return true
      }else if(this.selectedToken == null){
        return true
      }

      return false
    }
  },
  watch:{
    sellerData(val){
      this.updateFormData()
    }
  },
  data(){
    return {
      loading : false,
      formData : {
        isForSale : true,
        amount : 0,
        price  : 0,
      }
    }
  },
  methods:{
    updateFormData(){
      if(this.sellerData.sell_amount == undefined ||  this.formData.isForSale == 'false'){
        this.formData.isForSale = 'false'
        this.formData.amount = 0
        this.formData.price = 0
        return
      }
      this.formData.isForSale ='true'
      this.formData.amount = this.sellerData.sell_amount
      this.formData.price = parseFloat(this.sellerData.price)
    },
    async submit(){
      if(this.isDisabled == true){
        return
      }
      let isForSale = this.formData.isForSale=='true'?1:0
      let price = "0x" + (this.formData.price * 1000000000000000000).toString(16)

      this.loading = true

      if(isForSale){
        let price = "0x" + this.mulDecimal(this.formData.price,this.selectedToken.decimals).toString(16)
        await this.$contract.multiNFT.updateSale(this.nftData.net,this.selectedToken.tokenAddress,this.nftData.token_id,isForSale,this.formData.amount,price)
      }else{
        await this.$contract.multiNFT.updateSale(this.nftData.net,"0x0000000000000000000000000000000000000000",this.nftData.token_id,isForSale,0,0)
      }

      this.loading = false

      this.$bvModal.hide("bv-modal-update-multinft")
    },
    show(){
      if(this.nftData.token_id){
        console.log(this.nftData.token_id)
        this.selectedNet = {
          symbol : this.nftData.net
        }
      }
    }
  }
}
