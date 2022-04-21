import wallets from "@/wallets"

export default {
  props:{
    nftData : Object,
    updateNftData : Function,
    multiNftRow : Object
  },
  computed:{
    submitDisabled(){
      if(this.loading == true || this.tx_loading == true){
        return true
      }else if(!this.nftData.token_id  && (this.formData.interface == null || this.formData.interface == undefined || this.formData.interface == '' || this.formData.interface == "")){
        return true
      }else if(this.selectedToken == null){
        return true
      }else if(this.$env.VUE_APP_MULTINET == 'on' && this.selectedNet == null){
        return true
      }

      if(this.formData.interface == 'erc721'){
        if(this.formData.type == 'sale' && this.formData.price == 0){
          return true
        }else if(this.formData.type == 'auction' && (this.formData.endAuctionDate == null)){
          return true
        }
      }else if(this.formData.interface == 'erc1155'){
        if(this.formData.quantity == 0 || this.formData.price <= 0){
          return true
        }
      }

      return false
    }
  },
  data(){
    return {
      loading : false,
      tx_loading : false,
      formData : {
        interface : null,
        type : "sale",
        price : 0,
        startBidPrice : 0,
        quantity : 0,
        endAuctionDate : null
      },
      publishNets : [],
      selectedNet : null
    }
  },
  methods:{
    show(){
      this.formData.interface = this.nftData.interface

      if(this.nftData.token_id){
        this.selectedNet = {
          symbol : this.nftData.net
        }
      }
    },
    onSubmit(event){
      event.preventDefault()
      if(this.submitDisabled == true){
        return
      }

      if(this.nftData.token_id){
        this.saleSubmit()
      }else{
        this.publishSubmit()
      }
    },
    saleSubmit(){
      this.saleNFT()
    },
    async saleNFT(){
      let tx_hash

      this.tx_loading = true
      this.loading = true
      if(this.formData.type == 'sale'){
        let price = this.mulDecimal(this.formData.price,this.selectedToken.decimals)
        tx_hash = await this.$contract.singleNFT.updateSale(this.selectedNet.symbol,this.selectedToken.tokenAddress,this.nftData.token_id,price)
      }else if(this.formData.type == 'auction'){
        let startBidPrice = this.mulDecimal(this.formData.startBidPrice,this.selectedToken.decimals)
        let endAuctionTime = parseInt(((new Date(this.formData.endAuctionDate)).getTime() - (new Date()).getTime()) / 1000)
        if(endAuctionTime < 0){
          alert(this.$t('nft.auction_expiration_date'))
          return
        }
        tx_hash = await this.$contract.singleNFT.createAuction(this.selectedNet.symbol,this.selectedToken.tokenAddress,this.nftData.token_id,startBidPrice,endAuctionTime)
      }
      this.loading = false
      this.tx_loading = false

      if(tx_hash == false){
        return
      }

      if(this.$env.VUE_APP_BASE_WALLET == 'METAMASK') {
        this.$cookies.set("tx_" + this.nftData.id, tx_hash, "7d");
      }

      let nftData = this.nftData
      if(this.formData.type == 'sale') {
        nftData.listed = true
        nftData.price = this.formData.price
      }else if(this.formData.type == 'auction'){
        nftData.bid = {
          hasBid : false,
          bidder : "",
          value : 0,
        }

        let endAuctionTime = parseInt(((new Date(this.formData.endAuctionDate)).getTime() - (new Date()).getTime()) / 1000)
        nftData.offer.endTime = endAuctionTime + parseInt((new Date()).getTime() / 1000)
        nftData.offer.minValue = this.formData.startBidPrice
        nftData.offer.isForSale = true
      }
      this.updateNftData(this.nftData)
      this.$bvModal.hide("bv-modal-sale")
    },
    publishSubmit(){
      if(this.formData.interface == 'erc1155'){
        this.multiPublishNFT()
      }else if(this.formData.interface == 'erc721'){
        this.singlePublishNFT()
      }
    },
    async multiPublishNFT(){
      let price = this.mulDecimal(this.formData.price ,this.selectedToken.decimals)

      this.loading = true
      this.tx_loading = true

      let tx_hash = await this.$contract.multiNFT.saleMint(this.selectedNet.symbol,this.selectedToken.tokenAddress,this.nftData.id,this.formData.quantity,price)

      if(tx_hash == false){
        this.tx_loading = false
        this.loading = false
        alert(this.$t('nft.failed_transaction'))
        return
      }

      if((wallets.isMultiWallet() && wallets.getWalletName() == 'METAMASK') || (!wallets.isMultiWallet() && this.$env.VUE_APP_BASE_WALLET == 'METAMASK')) {
        if(wallets.getWalletName() == 'METAMASK'){
          var rawtx

          do{
            await this.sleep(3000)

            try {
              rawtx = await ethereum.request({
                method: 'eth_getTransactionByHash',
                params: [tx_hash],
              });
            }catch (e) {

            }

          }while(rawtx.blockNumber == undefined || parseInt(rawtx.blockNumber,16) <= 0)
        }
      }
      await this.sleep(3000)

      let result = await this.$api.txVerify({
        data : {
          nft_id : this.nftData.id,
          tx_hash,
          net:this.selectedNet.symbol
        }
      })
      this.tx_loading = false
      this.loading = false

      if(result.error != undefined){
        alert(result.message)
        return
      }else if(result.verify != true){
        alert(this.$t('nft.failed_verification'))
        return
      }

      this.updateNftData(this.nftData)

      this.$bvModal.hide("bv-modal-sale")

      this.$router.go();

    },
    async singlePublishNFT(){
      if(this.before() == false){
        return
      }

      this.loading = true
      this.tx_loading = true

      let tx_hash
      if(this.formData.type == 'sale'){
        let price = this.mulDecimal(this.formData.price ,this.selectedToken.decimals)
        tx_hash = await this.$contract.singleNFT.mint(this.selectedNet.symbol,this.selectedToken.tokenAddress,this.nftData.id,price)
      }else if(this.formData.type == 'auction'){
        let startBidPrice = this.mulDecimal(this.formData.startBidPrice ,this.selectedToken.decimals)
        let endAuctionTime = parseInt(((new Date(this.formData.endAuctionDate)).getTime() - (new Date()).getTime()) / 1000)
        if(endAuctionTime < 0){
          alert(this.$t('nft.auction_expiration_date'))
          return
        }
        tx_hash = await this.$contract.singleNFT.auctionMint(this.selectedNet.symbol,this.selectedToken.tokenAddress,this.nftData.id,startBidPrice,endAuctionTime)
      }

      if(tx_hash == false){
        this.tx_loading = false
        this.loading = false
        alert(this.$t('nft.failed_transaction'))
        return
      }

      //메타마스크 월렛인경우 컨펌이 날때까지 기다립니다.
      if((wallets.isMultiWallet() && wallets.getWalletName() == 'METAMASK') || (!wallets.isMultiWallet() && this.$env.VUE_APP_BASE_WALLET == 'METAMASK')) {
        var rawtx
        do{
          await this.sleep(3000)
          try {
            rawtx = await ethereum.request({
              method: 'eth_getTransactionByHash',
              params: [tx_hash],
            });
          }catch (e){

          }
        }while(rawtx.blockNumber == undefined || parseInt(rawtx.blockNumber,16) <= 0)
      }
      await this.sleep(3000)
      let result = await this.$api.txVerify({
        data : {
          nft_id : this.nftData.id,
          tx_hash,
          net : this.selectedNet.symbol
        }
      })

      this.tx_loading = false
      this.loading = false

      if(result.error != undefined){
        alert(result.message)
        return
      }else if(result.verify != true){
        alert(this.$t('nft.failed_verification'))
        return
      }

      this.updateNftData(this.nftData)

      this.$bvModal.hide("bv-modal-sale")

      this.$router.go();
    },
    async before(){
      if(this.$wallet.getWallet().isConnect() == false || (await this.$wallet.getWallet().getAccount()) == undefined){
        this.$wallet.getWallet().connectWallet()
        return false
      }

      return true
    },
    chamgeNet(net){
      this.selectedNet = net
      this.selectedToken = null
    },
  },
  created() {

    if(this.$env.VUE_APP_ETH_SINGLENFT_CONTRACT_ADDRESS  != undefined && this.$env.VUE_APP_ETH_MULTINFT_CONTRACT_ADDRESS  != undefined &&  this.$env.VUE_APP_ETH_SINGLENFT_CONTRACT_ADDRESS != "" && this.$env.VUE_APP_ETH_MULTINFT_CONTRACT_ADDRESS != ""){
      this.publishNets.push({
        symbol : "ETH",
        img_url : "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
      })
    }

    if(this.$env.VUE_APP_KLAY_SINGLENFT_CONTRACT_ADDRESS  != undefined && this.$env.VUE_APP_KLAY_MULTINFT_CONTRACT_ADDRESS  != undefined && this.$env.VUE_APP_KLAY_SINGLENFT_CONTRACT_ADDRESS != "" && this.$env.VUE_APP_KLAY_MULTINFT_CONTRACT_ADDRESS != ""){
      this.publishNets.push({
        symbol : "KLAY",
        img_url : "https://s2.coinmarketcap.com/static/img/coins/64x64/4256.png"
      })
    }

    if(this.$env.VUE_APP_BSC_SINGLENFT_CONTRACT_ADDRESS  != undefined && this.$env.VUE_APP_BSC_MULTINFT_CONTRACT_ADDRESS  != undefined && this.$env.VUE_APP_BSC_SINGLENFT_CONTRACT_ADDRESS != "" && this.$env.VUE_APP_BSC_MULTINFT_CONTRACT_ADDRESS != ""){
      this.publishNets.push({
        symbol : "BSC",
        img_url : "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png"
      })
    }

    if(this.$env.VUE_APP_MATIC_SINGLENFT_CONTRACT_ADDRESS  != undefined && this.$env.VUE_APP_MATIC_MULTINFT_CONTRACT_ADDRESS  != undefined && this.$env.VUE_APP_MATIC_SINGLENFT_CONTRACT_ADDRESS != "" && this.$env.VUE_APP_MATIC_MULTINFT_CONTRACT_ADDRESS != ""){
      this.publishNets.push({
        symbol : "MATIC",
        img_url : "https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png"
      })
    }

    if(this.$env.VUE_APP_HAS_MULTI_NET != "on"){
      this.selectedNet = {
        symbol: this.$env.VUE_APP_BASE_MAINNET,
        img_url : "https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png"
      }
    }
  }
}
