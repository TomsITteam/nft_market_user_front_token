<template>
  <b-modal id="bv-modal-sale" hide-footer @show="show">
    <template #modal-title>
      NFT {{ $t('nft.sales_registration') }}
    </template>

    <b-form @submit="onSubmit">
      <b-row class="mb-4 d-flex" v-if="!this.nftData.token_id">
        <b-col class="col-6">
          <input id="interface_721" v-model="formData.interface" class="radio__mint__interface" type="radio" value="erc721"/>
          <label for="interface_721" class="d-block pt-3">
            <img class="d-block m-auto" src="/img/single_nft.jpg" width="120px" style="border-radius: 10px;"/>
            <p class="mt-2 text-center">{{ $t('nft.single') }}</p>
          </label>
        </b-col>
        <b-col class="col-6">
          <input id="interface_1155" v-model="formData.interface" class="radio__mint__interface" type="radio" value="erc1155" />
          <label for="interface_1155" class="d-block pt-3">
            <img class="d-block m-auto" src="/img/multi_nft.jpg" width="120px" style="border-radius: 10px;"/>
            <p class="mt-2 text-center">{{ $t('nft.multi') }}</p>
          </label>
        </b-col>
      </b-row>

      <div class="mb-3" v-if="!this.nftData.token_id && $env.VUE_APP_HAS_MULTI_NET == 'on' && (formData.interface == 'erc721' || formData.interface == 'erc1155')">
        <label class="sign__label">발행할 네트워크</label>
        <b-dropdown menu-class="not-top" variant="net-select">
          <template #button-content>
            <span v-if="selectedNet == null">네트워크를 선택해주세요</span>
            <span v-else>
              <img class="mr-2" width="30px" height="30px" :src="selectedNet.img_url"/>{{ selectedNet.symbol }}
            </span>
          </template>
          <b-dropdown-item v-for="item in publishNets" @click="chamgeNet(item)"><img class="mr-2" width="30px" height="30px" :src="item.img_url"/>{{ item.symbol }}</b-dropdown-item>
        </b-dropdown>
      </div>

      <div v-if="formData.interface == 'erc721'">
        <label class="sign__label">{{ $t('nft.sales_type') }}</label>
        <ul class="sign__radio sign__radio--single mb-4">
          <li>
            <b-form-radio type="radio" name="type" v-model="formData.type" value="sale">{{ $t('nft.price_sales_registration') }}</b-form-radio>
          </li>
          <li>
            <b-form-radio type="radio" name="type" v-model="formData.type" value="auction">{{ $t('nft.auction_sales_registration') }}</b-form-radio>
          </li>
        </ul>

        <div v-if="formData.type == 'auction'">
          <label class="sign__label">{{ $t('nft.starting_bid_price') }}</label>
          <b-input type="text" required="required" class="sign__input mb-4 border" v-model="formData.startBidPrice"/>

          <label class="sign__label">{{ $t('nft.auction_end') }}</label>
          <b-calendar class="w-100 mt-2 mb-4" hide-header width="100%" locale="ko" v-model="formData.endAuctionDate" required="required"></b-calendar>
        </div>
        <div v-else>
          <label class="sign__label">{{ $t('nft.immediate_sale_price') }}</label>
          <b-input type="text" required="required" class="sign__input mb-4 border" v-model="formData.price"/>
        </div>
      </div>
      <div v-else-if="formData.interface == 'erc1155'">
        <div>
          <label class="sign__label">{{ $t('nft.sales_quantity') }}</label>
          <b-input type="text" required="required" class="sign__input mb-4 border" v-model="formData.quantity"/>
        </div>
        <div>
          <label class="sign__label">{{ $t('nft.price_per_piece') }}</label>
          <b-input type="text" required="required" class="sign__input mb-4 border" v-model="formData.price"/>
        </div>
      </div>

      <div class="transaction-wait" v-bind:class="{ 'd-block' : tx_loading }">
        <div class="center text-center">
            <span class="spinner-box">
              <b-spinner class="mb-4" variant="primary"></b-spinner>
            </span>
          <p class="p-0 m-0">{{ $t('nft.transaction_waiting') }}</p>
          <span>{{ $t('nft.transaction_waiting_text') }}</span>
        </div>
      </div>
      <b-button variant="primary" class="height-50 base-font-weight mt-2 mb-4 w-100" block type="submit" v-bind:class="{ disabled : submitDisabled }">
        <b-spinner v-if="loading"></b-spinner>
        <span v-else>{{ $t('nft.to_sell') }}</span>
      </b-button>
    </b-form>

  </b-modal>
</template>

<script>
export default {
  name: "ModalSale",
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
      }else if(this.$env.VUE_APP_HAS_MULTI_NET == 'on' && this.selectedNet == null){
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
        let price = this.formData.price * 1000000000000000000
        tx_hash = await this.$contract.singleNFT.updateSale(this.nftData.net,this.nftData.token_id,price)
      }else if(this.formData.type == 'auction'){
        let startBidPrice = this.formData.startBidPrice * 1000000000000000000
        let endAuctionTime = parseInt(((new Date(this.formData.endAuctionDate)).getTime() - (new Date()).getTime()) / 1000)
        if(endAuctionTime < 0){
          alert(this.$t('nft.auction_expiration_date'))
          return
        }
        tx_hash = await this.$contract.singleNFT.createAuction(this.nftData.net,this.nftData.token_id,startBidPrice,endAuctionTime)
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
      let price = this.formData.price * 1000000000000000000

      this.loading = true
      this.tx_loading = true

      let tx_hash = await this.$contract.multiNFT.saleMint(this.selectedNet.symbol,this.nftData.id,this.formData.quantity,price)

      if(tx_hash == false){
        this.tx_loading = false
        this.loading = false
        alert(this.$t('nft.failed_transaction'))
        return
      }

      if(this.$env.VUE_APP_BASE_WALLET == 'METAMASK'){
        var rawtx


        do{
          rawtx = await ethereum.request({
            method: 'eth_getTransactionByHash',
            params: [tx_hash],
          });

        }while(rawtx.blockNumber == undefined || parseInt(rawtx.blockNumber,16) <= 0)
      }

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
        let price = this.formData.price * 1000000000000000000
        tx_hash = await this.$contract.singleNFT.mint(this.selectedNet.symbol,this.nftData.id,price)
      }else if(this.formData.type == 'auction'){
        let startBidPrice = this.formData.startBidPrice * 1000000000000000000
        let endAuctionTime = parseInt(((new Date(this.formData.endAuctionDate)).getTime() - (new Date()).getTime()) / 1000)
        if(endAuctionTime < 0){
          alert(this.$t('nft.auction_expiration_date'))
          return
        }
        tx_hash = await this.$contract.singleNFT.auctionMint(this.selectedNet.symbol,this.nftData.id,startBidPrice,endAuctionTime)
      }

      if(tx_hash == false){
        this.tx_loading = false
        this.loading = false
        alert(this.$t('nft.failed_transaction'))
        return
      }

      if(this.$env.VUE_APP_BASE_WALLET == 'METAMASK'){
        var rawtx


        do{
          rawtx = await ethereum.request({
            method: 'eth_getTransactionByHash',
            params: [tx_hash],
          });

        }while(rawtx.blockNumber == undefined || parseInt(rawtx.blockNumber,16) <= 0)
      }


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
      if(this.$wallet.isConnect() == false || this.$wallet.getWallet().getAccount() == undefined){
        this.$wallet.connectWallet()
        return false
      }

      return true
    },
    chamgeNet(net){
      this.selectedNet = net
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


  }
}
</script>

<style scoped>

</style>
