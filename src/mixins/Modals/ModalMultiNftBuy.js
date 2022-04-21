import tokenAllow from "../tokenAllow";

export default {
  mixins:[tokenAllow],
  props:{
    nftData : Object,
    sellerData : Object,
    updateNftData : Function
  },
  asyncComputed: {
    async lackOfBalance() {
      if (this.nftData.interface != 'erc721') {
        return false
      } else if (this.nftData.token.tokenAddress == '0x0000000000000000000000000000000000000000') {
        return false
      }

      if (this.lackBalance == true) {
        return true
      }

      return false
    },
  },
  computed:{
    MultiNftContractAddress(){
      let key = "VUE_APP_" + this.nftData.net.toUpperCase() + "_MULTINFT_CONTRACT_ADDRESS"
      return this.$env[key]
    },
    lackBalance(){
      this.setBalance()

      if(!this.sellerData.token || (!!this.sellerData.token && this.sellerData.token.tokenAddress == "0x0000000000000000000000000000000000000000")){
        if(this.price > this.balance) {
          return true
        }
      }else if(!!this.sellerData.token ){
        if(this.price > this.toUint(this.tokenBalance,this.sellerData.token.decimals)){
          return true
        }
      }
      return false
    },
    price(){
      if(this.sellerData.price == undefined){
        return 0
      }

      return this.sellerData.price * this.formData.amount
    },
    isDisabled(){
      if(this.loading == true){
        return true
      }else if(this.formData.amount <= 0){
        return true
      }else if(this.showAllow == true){
        return true
      }else if(this.lackBalance == true){
        return true
      }
      return false
    }
  },
  watch:{
    sellerData(val){
      if(!val.token){
        this.showAllow = false
        return
      }
      //토큰 결제의 경우 승인,잔액 체크
      this.updateAllow(val.token.tokenAddress,this.$env.VUE_APP_MULTINFT_CONTRACT_ADDRESS)
      this.updateBalance(val.token.tokenAddress)
    }
  },
  data(){
    return {
      loading : false,
      formData : {
        amount : 0
      },
      balance : 0,
      showAllow : false,
    }
  },
  methods:{
    submitApprove(net,tokenAddress,multiNftContractAddress){
      if(this.lackBalance == true){
        return
      }
      this.approve(net,tokenAddress,multiNftContractAddress )
    },
    async submit(){
      if(this.isDisabled == true){
        return
      }

      let senderValue = this.toFixed(this.formData.amount * this.sellerData.price,8)

      this.loading = true
      let txHash
      if(this.sellerData.token.tokenAddress != "0x0000000000000000000000000000000000000000"){
        //ERC20,BEP20,KIP7 토큰 결제
        txHash = await this.$contract.multiNFT.buy(this.nftData.net,this.nftData.token_id,this.sellerData.address,this.formData.amount,0)
      }else{
        txHash = await this.$contract.multiNFT.buy(this.nftData.net,this.nftData.token_id,this.sellerData.address,this.formData.amount,senderValue)
      }
      this.loading = false

      this.$bvModal.hide("bv-modal-multinft-buy")
    },
    async setBalance(){
      this.balance = (await this.$wallet.getWallet().getBalance(this.$wallet.getWallet().getAccount())) / 1000000000000000000
    },
    show(){
      let a = this.lackBalance
    }
  }
}
