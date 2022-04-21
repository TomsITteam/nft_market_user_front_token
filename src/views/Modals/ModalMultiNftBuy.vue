<template>
  <b-modal id="bv-modal-multinft-buy" hide-footer>
    <template #modal-title>
      NFT {{ $t('nft.quantity_buy') }}
    </template>
    <b-form @submit.prevent="submit">
      <label class="sign__label">{{ $t('nft.buy_quantity') }} ({{ $t('nft.max') }} {{ this.sellerData.sell_amount }})</label>
      <b-input type="number" required class="sign__input mb-1 border" v-model="formData.amount"/>

      <p class="text-danger pl-2 pt-0 mt-0 mb-0" v-if="lackBalance">{{ $t('nft.insufficient_balance') }}</p>
      <label class="sign__label mb-4 pl-2">{{ toFixed(price,4) }} {{ nftData.net }} ≈ ￦{{ amountToPrice(nftData.net,price) }}</label>
      <b-button variant="primary" class="height-50 base-font-weight mt-2 mb-4 w-100" block type="submit" v-bind:class="{ disabled : isDisabled }">
        <b-spinner v-if="loading"></b-spinner>
        <span v-else>{{ $t('nft.buy') }}</span>
      </b-button>
    </b-form>
  </b-modal>
</template>

<script>
export default {
  name: "ModalMultiNftBuy",
  props:{
    nftData : Object,
    sellerData : Object,
    updateNftData : Function
  },
  computed:{
    lackBalance(){
      this.setBalance()

      if(this.price > this.balance){
        return true
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
      }

      return false
    }
  },
  data(){
    return {
      loading : false,
      formData : {
        amount : 0
      },
      balance : 0
    }
  },
  methods:{
    async submit(){
      if(this.isDisabled == true){
        return
      }

      let senderValue = this.toFixed(this.formData.amount * this.sellerData.price,8)

      this.loading = true
      let txHash = await this.$contract.multiNFT.buy(this.nftData.net,this.nftData.token_id,this.sellerData.address,this.formData.amount,senderValue)
      this.loading = false

      this.$bvModal.hide("bv-modal-multinft-buy")
    },
    async setBalance(){
      this.balance = (await this.$wallet.getWallet().getBalance(this.$wallet.getWallet().getAccount())) / 1000000000000000000
    },
  }
}
</script>

<style scoped>

</style>
