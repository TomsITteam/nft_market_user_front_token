export default {
  data(){
    return {
      loadingAllow : false,
      loadingApprove : false,
      loadingTokenBalance : false,
      showAllow : false,
      tokenBalance : 0,
    }
  },
  methods:{
    async updateAllow(tokenAddress,senderAddress){
      this.loadingAllow = true
      let allow = await this.$api.allow({
        tokenAddress,
        data:{
          ownerAddress : this.$wallet.getWallet().getAccount(),
          senderAddress
        }
      })
      this.loadingAllow = false

      if(allow.data == undefined){
        //alert(allow.error.message)
        return
      }

      if(allow.data == 0){
        this.showAllow = true
      }

    },
    async updateBalance(tokenAddress){
      this.loadingTokenBalance = true
      let balance = await this.$api.tokenBalance({
        tokenAddress,
        data:{
          ownerAddress : this.$wallet.getWallet().getAccount()
        }
      })
      this.loadingTokenBalance = false
      if(balance.data == undefined){
        //alert(balance.error.message)
        return
      }

      this.tokenBalance = balance.data
      this.$set
    },
    async approve(net,tokenAddress,senderAddress){
      this.loadingApprove = true
      let txHash = await this.$contract.erc20.approve(net,tokenAddress,senderAddress)
      if(this.$env.VUE_APP_BASE_WALLET == 'METAMASK') {
        if(this.nftID != undefined) {
          this.$cookies.set("tx_" + this.nftID, txHash, "7d");
        }
      }
      this.loadingApprove = false
    }
  }
}
