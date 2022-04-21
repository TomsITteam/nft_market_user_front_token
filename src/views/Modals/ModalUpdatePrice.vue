<template>
  <b-modal id="bv-modal-update-price" hide-footer>
    <template #modal-title>
      NFT {{ $t('nft.price_change') }}
    </template>
    <b-form @submit="onUpdatePriceSubmit">
      <label class="sign__label">{{ $t('nft.price') }}</label>
      <b-input type="text" required class="sign__input mb-1 border" v-model="formData.price"/>
      <label class="sign__label mb-4 pl-2">{{ formData.price }} {{ nftData.net }} ≈ ￦{{ amountToPrice(nftData.net,formData.price) }}</label>

      <b-button variant="primary" class="height-50 base-font-weight mt-2 mb-4 w-100" block type="submit" v-bind:class="{ disabled : loading }">
        <b-spinner v-if="loading"></b-spinner>
        <span v-else>{{ $t('nft.update') }}</span>
      </b-button>
    </b-form>
  </b-modal>
</template>

<script>
export default {
  name: "ModalUpdatePrice",
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
      let tx_hash = await this.$contract.singleNFT.updatePrice(this.nftData.net,this.nftData.token_id,'0x' + (price*1000000000000000000).toString(16))
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
</script>

<style scoped>

</style>
