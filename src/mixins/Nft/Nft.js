import fees from "@/data/fees.json";
import tokenAllow from "../tokenAllow";

export default {
  mixins:[tokenAllow],
  watch:{

  },
  asyncComputed:{
    async lackOfBalance(){
      if(this.nftData.interface != 'erc721') {
        return false
      }else if(this.nftData.token.tokenAddress == '0x0000000000000000000000000000000000000000'){
        return false
      }

      if (this.loadingTokenBalance == true) {
        return true
      }

      if (parseFloat(this.nftData.price) > this.toUint(this.tokenBalance, this.nftData.token.decimals)) {
        return true
      }

      return false
    },
    async isDisabledBuy(){
      if(this.nftData == undefined){
        return true
      }

      let address = this.$wallet.getWallet().getAccount()
      if(address == undefined || address == null){
        return true
      }



      if(this.nftData.interface == 'erc721' && this.nftData.token.tokenAddress != '0x0000000000000000000000000000000000000000'){
        if(this.loadingAllow == true || this.loadingTokenBalance == true){
          return true
        }
        if(this.showAllow){
          return true
        }

        if(parseFloat(this.nftData.price) >  this.toUint(this.tokenBalance,this.nftData.token.decimals)){
          return true
        }
      }else if(this.nftData.interface == 'erc721' && this.nftData.token.tokenAddress == '0x0000000000000000000000000000000000000000'){
        let buyValue = parseFloat(this.nftData.price)
        if(buyValue >  (await this.$wallet.getWallet().getBalance(address) / 10**18)){
          return true
        }
      }

      return false
    }
  },
  computed:{
    SingleNftContractAddress(){
      let key = "VUE_APP_" + this.nftData.net.toUpperCase() + "_SINGLENFT_CONTRACT_ADDRESS"

      return this.$env[key]
    },
    contractAddress(){
      let address

      if(this.nftData.interface == 'erc721'){
        address = this.$env['VUE_APP_' + this.nftData.net + '_SINGLENFT_CONTRACT_ADDRESS']
      }else{
        address = this.$env['VUE_APP_' + this.nftData.net + '_MULTINFT_CONTRACT_ADDRESS']
      }

      return address
    },
    totalCreation(){
      if(!this.nftData){
        return 0
      }

      return this.nftData.total_creation
    },
    nftBuyerButtonType(){
      let time = (new Date()).getTime() / 1000

      if(this.$wallet.getWallet().isWallet() == false){
        return "noWallet"
      }else if(this.unconfirmed == true){
        return "unconfirmed"
      }else if(this.showAllow == true) {
        return "approve"
      }else if(this.nftData.listed == true) {
        return "buy"
      }else if(this.nftData.offer != undefined && this.nftData.offer.isForSale == true && this.nftData.offer.endTime < time && this.nftData.bid.bidder == this.$wallet.getWallet().getAccount() ){
        return "auctionEnd"
      }else if(this.nftData.offer != undefined && this.nftData.offer.isForSale == true && this.nftData.offer.endTime > time && this.nftData.bid.bidder == this.$wallet.getWallet().getAccount()){
        return "cancelBid"
      }else if(this.nftData.offer != undefined && this.nftData.offer.isForSale == true && this.nftData.offer.endTime > time){
        return "bid"
      }

      return ""
    },
    nftOwnerButtonType(){
      let time = (new Date()).getTime() / 1000

      if(this.unconfirmed == true){
        return "unconfirmed"
      }else if(!this.nftTokenID) {
        return "mint"
      }else if(this.nftData.listed == false && (this.nftData.offer == undefined || this.nftData.offer.isForSale == false)){
        return "sale"
      }else if(this.nftData.listed == true){
        return "cancelSale"
      }else if(this.nftData.offer != undefined && this.nftData.offer.isForSale == true && this.nftData.offer.endTime < time && this.nftData.bid != undefined && this.nftData.bid.hasBid == true){
        return "auctionEnd"
      }else if(this.nftData.offer != undefined && this.nftData.offer.isForSale == true && this.nftData.bid != undefined && this.nftData.bid.hasBid == false){
        return "cancelAuction"
      }else if(this.nftData.offer != undefined && this.nftData.offer.isForSale == true && this.nftData.bid != undefined && this.nftData.bid.hasBid == true){
        return "cancelAuctionDisabled"
      }

      return ""
    },
    locationHref(){
      return window.location.href
    },
    nftID(){
      return this.$route.params.nft_id
    },
    nftName(){
      if(this.nftData == null)
        return ""

      return this.nftData.name
    },
    nftDescription(){
      if(this.nftData == null)
        return ""
      let description = this.strip_tags(this.nftData.description)
      let linkSplit = description.split("http://")
      for (var i=1;i<linkSplit.length;i++) {
        let value = linkSplit[i]
        value = value.split(" ")[0]
        value = value.split("\n")[0]
        value = "http://" + value
        description = description.replaceAll( value,`<a  target="_blank"href="${value}">${value}</a>`)
      }
      linkSplit = description.split("https://")
      for (var i=1;i<linkSplit.length;i++) {
        let value = linkSplit[i]
        value = value.split(" ")[0]
        value = value.split("\n")[0]
        value = "https://" + value
        description = description.replaceAll(value,`<a target="_blank" href="${value}">${value}</a>`)
      }
      return description
    },
    nftImageURL(){
      if(this.nftData == null)
        return ""

      return this.nftData.image_url
    },
    nftCreator(){
      if(this.nftData == null) {
        return {
          address : "",
          profile : {
            name : "",
            image_url : "/img/profile.svg"
          }
        }
      }

      return this.nftData.creator
    },
    nftOwner(){
      if(this.nftData == null) {
        return {
          address : "",
          profile : {
            name : "",
            image_url : "/img/profile.svg"
          }
        }
      }

      return this.nftData.owner
    },
    nftTransactionHash(){
      if(this.nftData == null || this.nftData.tx_hash == "")
        return null

      return this.nftData.tx_hash
    },
    nftTokenID(){
      if(this.nftData == null)
        return null

      return this.nftData.token_id
    },
    nftCreationYear(){
      if(this.nftData == null)
        return null

      return this.nftData.year_creation
    },
    nftIsOffer(){
      if(this.nftData == null)
        return false
      else if(this.nftData.offer == undefined)
        return false

      return this.nftData.offer.isForSale
    },
    nftCoinPrice(){
      if(this.nftData == null)
        return false

      return this.nftData.price
    },
    nftMinBidPrice(){
      if(this.nftData == null)
        return 0
      else if(this.nftData.bid.hasBid == true){
        return this.nftData.bid.value
      }

      return this.nftData.offer.minValue
    },
  },

  data(){
    return {
      unconfirmed : false,
      fees : {...fees},
      loading : {
        nftData : true,
        collectionCreatedNFTData : true,
        liked : false,
        button : false,
      },
      auctionRemainingTimer : null,
      auctionRemainingTime : "00:00:00",
      nftData : {},
      collectionCreatedNFTData : [],
      videoOptions: {
        autoplay: true,
        controls: true,
        loop : true,
        muted : true,
        playsinline : true,
      },
      swiperOptions: {
        slidesPerView: 'auto',
        spaceBetween : 20,
        freeMode: true,
      },
      modal:{
        sellerData : {},
        multiNftRow : {},
      },
      tab : false,
      mainnet : ''
    }
  },
  methods: {
    submitApprove(net,tokenAddress,singleNftContractAddress){
      if(this.lackOfBalance == true){
        return
      }
      this.approve(net,tokenAddress,singleNftContractAddress )
    },
    strip_tags (str) {
      return str.replace(/(<([^>]+)>)/ig,"");
    },
    openSend() {
      if (this.$wallet.getWallet().checkChainID(this.nftData.net) == false) {
        return
      }
      this.$bvModal.show('bv-modal-send')
    },
    openUpdatePrice() {
      if (this.$wallet.getWallet().checkChainID(this.nftData.net) == false) {
        return
      }

      this.$bvModal.show('bv-modal-update-price')
    },
    openSale() {
      if (this.$wallet.getWallet().checkChainID(this.nftData.net) == false) {
        return
      }

      this.$bvModal.show('bv-modal-sale')
    },
    openBid() {
      if (this.$wallet.getWallet().checkChainID(this.nftData.net) == false) {
        return
      }

      this.$bvModal.show('bv-modal-bid')
    },
    openMultiNftSend(row) {
      if (this.$wallet.getWallet().checkChainID(this.nftData.net) == false) {
        return
      }

      this.modal.multiNftRow = row
      this.$bvModal.show('bv-modal-send')
    },
    findOwner(ownerAddress) {
      for (var index in this.nftData.owner) {
        let owner = this.nftData.owner[index]
        if (owner.address == ownerAddress) {
          return owner
        }
      }

      return false
    },
    async updateSaleMultiNft(sellerData) {
      if (this.$wallet.getWallet().checkChainID(this.nftData.net) == false) {
        return
      }

      this.modal.sellerData = sellerData
      this.$bvModal.show("bv-modal-update-multinft")
    },
    async buyMultiNft(sellerData) {
      if (this.$wallet.getWallet().checkChainID(this.nftData.net) == false) {
        return
      }

      this.modal.sellerData = sellerData
      this.$bvModal.show("bv-modal-multinft-buy")
    },
    updateNftData(nftData) {
      this.nftData = nftData
    },
    async before() {
      if (this.$wallet.getWallet().isConnect() == false || this.$wallet.getWallet().getAccount() == undefined) {
        this.$wallet.getWallet().connectWallet()
        return false
      }

      return true
    },
    timeToElapsed(time) {
      let parallax = parseInt((new Date()).getTime() / 1000) - time

      if (parallax > 86400) {
        return parseInt(parallax / 86400) + this.$t('nft.day_ago')
      } else if (parallax > 3600) {
        return parseInt(parallax / 3600) + this.$t('nft.hour_ago')
      } else if (parallax > 60) {
        return parseInt(parallax / 60) + this.$t('nft.minute_ago')
      } else {
        return parseInt(parallax) + this.$t('nft.second_ago')
      }
    },
    async cancelBid() {
      if (this.$wallet.getWallet().checkChainID(this.nftData.net) == false) {
        return
      }

      this.loading.button = true
      let tx_hash = await this.$contract.singleNFT.cancelBid(this.nftData.net, this.nftData.token_id)
      this.loading.button = false

      if (tx_hash == false) {
        return
      }

      if (this.$env.VUE_APP_BASE_WALLET == 'METAMASK') {
        this.$cookies.set("tx_" + this.nftID, tx_hash, "7d");
      }

      this.nftData.bid = {
        hasBid: false,
        bidder: "",
        value: 0,
      }
    },
    async buy() {
      if (this.$wallet.getWallet().checkChainID(this.nftData.net) == false) {
        return
      }

      if (await this.before() == false) {
        return
      } else if (this.loading.button == true) {
        return
      } else if (this.isDisabledBuy == true) {
        return
      }

      this.loading.button = true
      if (await this.beforeTransaction() == true) {
        this.loading.button = false
        return
      }

      let price = 0
      if(this.nftData.token.tokenAddress == '0x0000000000000000000000000000000000000000'){
        price = this.nftData.price
      }
      this.loading.button = true
      let tx_hash = await this.$contract.singleNFT.buy(this.nftData.net,this.nftData.token_id,price)
      this.loading.button = false
      if (tx_hash == false) {
        return
      }

      if (this.$env.VUE_APP_BASE_WALLET == 'METAMASK') {
        this.$cookies.set("tx_" + this.nftID, tx_hash, "7d");
      }

      this.$router.go()
    },
    async cancelSale() {
      this.loading.button = true
      await this.updateListingStatus(0)
      this.loading.button = false
    },
    async cancelAuction() {
      if (this.$wallet.getWallet().checkChainID(this.nftData.net) == false) {
        return
      }

      this.loading.button = true
      let tx_hash = await this.$contract.singleNFT.cancelAuction(this.nftData.net, this.nftData.token_id)
      this.loading.button = false

      if (tx_hash == false) {
        return
      }

      if (this.$env.VUE_APP_BASE_WALLET == 'METAMASK') {
        this.$cookies.set("tx_" + this.nftID, tx_hash, "7d");
      }

      this.nftData.offer.isForSale = false
    },
    async auctionEnd() {
      if (this.$wallet.getWallet().checkChainID(this.nftData.net) == false) {
        return
      }
      if (this.loading.button == true) {
        return
      }

      this.loading.button = true
      if (await this.beforeTransaction() == true) {
        this.loading.button = false
        return
      }

      this.loading.button = true
      let tx_hash = await this.$contract.singleNFT.endAuction(this.nftData.net, this.nftData.token_id)
      this.loading.button = false

      if (tx_hash == false) {
        return
      }

      if (this.$env.VUE_APP_BASE_WALLET == 'METAMASK') {
        this.$cookies.set("tx_" + this.nftID, tx_hash, "7d");
      }
      this.$router.go()
    },
    getTransferPrice(method, price) {
      if (method == 'mint') {
        return this.$t('nft.price') + " " + price
      } else if (method == 'auctionMint') {
        return this.$t('nft.minimum_bid') + " " + price
      } else if (method == 'buy') {
        return price
      } else if (method == 'endAuction') {
        return this.$t('nft.successful_bid_price') + " " + price
      }

      return this.$t('nft.price') + price
    },
    getTransferType(method) {
      if (method == 'mint') {
        return this.$t('nft.mint')
      } else if (method == 'auctionMint') {
        return this.$t('nft.auctionMint')
      } else if (method == 'buy') {
        return this.$t('nft.buy')
      } else if (method == 'endAuction') {
        return this.$t('nft.successful_bid')
      } else if (method == 'burn') {
        return this.$t('nft.incinerated')
      } else if (method == 'saleMint') {
        return this.$t('nft.quantity_issuance')
      }

      return this.$t('nft.sendRecived')
    },
    copyToClipboard(val) {
      const t = document.createElement("textarea");
      document.body.appendChild(t);
      t.value = val;
      t.select();
      document.execCommand('copy');
      document.body.removeChild(t);

      alert(this.$t('nft.has_been_copied'))
    },
    async liked() {
      if (this.$wallet.getWallet().beforeWalletCheck() == false) {
        return
      }

      if (this.loading.liked == true) {
        return
      }

      this.loading.liked = true


      let result = await this.$api.liked({
        data: {
          category: 'nft',
          token_id: this.nftTokenID,
        }
      })
      this.loading.liked = false

      if (result.error != undefined) {
        alert(result.error.message)
        return
      } else if (result == false) {
        return
      }

      if (result.liked == true) {
        this.nftData.like++
      } else {
        this.nftData.like--
      }

    },
    async updateListingStatus(listed) {
      if (this.$wallet.getWallet().checkChainID(this.nftData.net) == false) {
        return
      }
      let tx_hash = await this.$contract.singleNFT.updateListingStatus(this.nftData.net, this.nftData.token_id, listed)
      if (tx_hash == false) {
        return
      }
      if (this.$env.VUE_APP_BASE_WALLET == 'METAMASK') {
        this.$cookies.set("tx_" + this.nftID, tx_hash, "7d");
      }

      this.nftData.listed = listed
    },
    async getNft(nft_id) {
      this.loading.nftData = true

      let result = await this.$api.getNFT({
        data: {
          nft_id
        }
      })

      this.loading.nftData = false

      this.nftData = result

      document.title = this.nftData.name + " | " + this.$env.VUE_APP_NAME
      if (this.nftData.video_url != undefined) {
        this.videoOptions.sources = [
          {
            src: this.nftData.video_url,
            type: "video/mp4"
          }
        ]
      }

      if(this.nftData.net == 'KLAY')
        this.mainnet = 'https://s2.coinmarketcap.com/static/img/coins/64x64/4256.png'
      else if (this.nftData.net == 'BNB' || this.nftData.net == 'BSC')
        this.mainnet = 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png'
      else if (this.nftData.net == 'ETH')
        this.mainnet = 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png'
      else if (this.nftData.net == 'MATIC')
        this.mainnet = 'https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png'

      if (this.nftData.total_creation > 1) {
        await this.collectionCreatedNFT(this.nftCreator.address)
      } else {
        this.loading.collectionCreatedNFTData = false
      }

      if(this.nftData.interface == 'erc721' && this.nftData.token.tokenAddress != '0x0000000000000000000000000000000000000000'){
        this.updateAllow(this.nftData.token.tokenAddress,this.$env.VUE_APP_SINGLENFT_CONTRACT_ADDRESS )
        this.updateBalance(this.nftData.token.tokenAddress)
      }

    },
    async collectionCreatedNFT(address) {
      this.loading.collectionCreatedNFTData = true
      let result = await this.$api.collectionCreatedNFT({
        data: {
          address,
          limit : 4
        }
      })

      for (var key in result.data) {
        let data = result.data[key]
        if (data.id == this.nftID) {
          result.data.splice(key, 1)
          break
        }
      }
      this.collectionCreatedNFTData = result.data
      this.loading.collectionCreatedNFTData = false
    },
    async deletedNft() {
      if (this.loading.button == true) {
        return
      }

      this.loading.button = true
      let result = await this.$api.deletedNFT({
        data: {
          nft_id: this.nftID,
        }
      })
      this.loading.button = false
      if (result == false) {
        return
      } else if (result.error != undefined) {
        alert(result.error.message)
        return
      }

      this.$router.push({
        name: "Home",
      })
    },
    dataUpdate(nft_id) {
      this.loading.nftData = true
      this.loading.collectionCreatedNFTData = true

      this.getNft(nft_id)
    },
    auctionCountDown() {
      if (this.nftData == null) {
        return
      } else if (this.nftTokenID == false) {
        return
      } else if (this.nftIsOffer == false) {
        return
      }

      let time = (new Date()).getTime() / 1000
      if (this.nftData.offer.endTime < time) {
        this.auctionRemainingTime = "00:00:00"
      } else {
        this.auctionRemainingTime = ""

        let remainingTime = this.nftData.offer.endTime - time

        if (remainingTime > 86400) {
          let days = parseInt(remainingTime / 86400)
          remainingTime -= days * 86400

          this.auctionRemainingTime = days + this.$t('nft.day') + " "
        }

        if (remainingTime > 3600) {
          let hous = parseInt(remainingTime / 3600)
          remainingTime -= hous * 3600

          if (hous < 10) {
            hous = "0" + hous
          }
          this.auctionRemainingTime += hous + ":"
        } else {
          this.auctionRemainingTime += "00:"
        }

        if (remainingTime > 60) {
          let minute = parseInt(remainingTime / 60)
          remainingTime -= minute * 60

          if (minute < 10) {
            minute = "0" + minute
          }
          this.auctionRemainingTime += minute + ":"
        } else {
          this.auctionRemainingTime += "00:"
        }

        if (remainingTime > 0) {
          let second = parseInt(remainingTime)

          if (second < 10) {
            second = "0" + second
          }
          this.auctionRemainingTime += second
        } else {
          this.auctionRemainingTime += "00"
        }

      }
    },
    async checkConfirm() {
      let tx_hash = this.$cookies.get("tx_" + this.nftID);

      if (tx_hash == undefined || tx_hash == null || tx_hash == false || tx_hash == "undefined") {
        return
      }

      let rawtx = await ethereum.request({
        method: 'eth_getTransactionByHash',
        params: [tx_hash],
      });
      if (rawtx == null) {
        this.unconfirmed = false
        this.$cookies.remove("tx_" + this.nftID);
        return
      }

      if (rawtx.blockNumber == undefined || parseInt(rawtx.blockNumber, 16) <= 0) {
        this.unconfirmed = true
        return
      }

      this.unconfirmed = false
      this.$cookies.remove("tx_" + this.nftID);
    },
    startTimer() {
      if (this.$env.VUE_APP_BASE_WALLET == 'METAMASK') {
        setInterval(() => this.checkConfirm(), 1000)
      }

      this.auctionRemainingTimer = setInterval(() => this.auctionCountDown(), 1000);
    },
    stopTimer() {
      if (this.auctionRemainingTimer == null)
        return

      clearInterval(this.auctionRemainingTimer);
    },
    async beforeTransaction() {
      let result = await this.$api.paused({})
      if (result == false) {
        return true
      } else if (result.data == true) {
        alert(this.$t('nft.stop_transaction'))
        return true
      }

      return false
    },
  },
  beforeRouteUpdate(to,from,next){
    this.stopTimer()
    this.startTimer()

    this.dataUpdate(to.params.nft_id)
    next()
  },
  created() {
    this.stopTimer()
    this.startTimer()

    this.getNft(this.$route.params.nft_id)
  }
}
