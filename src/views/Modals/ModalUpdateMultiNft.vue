<template>
  <b-modal id="bv-modal-update-multinft" hide-footer>
    <template #modal-title>
      {{ $t('nft.sales_information_update') }}
    </template>
    <b-form @submit.prevent="submit">
      <label class="sign__label">{{ $t('nft.sales_status') }}</label>
      <ul class="sign__radio sign__radio--single mb-4">
        <li>
          <b-form-radio type="radio" name="isForSale" v-model="formData.isForSale" value="true">{{ $t('nft.to_sell') }}</b-form-radio>
        </li>
        <li>
          <b-form-radio type="radio" name="isForSale" v-model="formData.isForSale" value="false">{{ $t('nft.stop_sale') }}</b-form-radio>
        </li>
      </ul>
      <div v-if="formData.isForSale == 'true'">
        <label class="sign__label">
          {{
            $t('nft.sales_quantity_amount',{
              amount : sellerData.amount
            })
          }}
        </label>
        <b-input type="number" required class="sign__input mb-1 border" v-model="formData.amount"/>
        <p class="text-danger pl-2 pt-0 mt-0 mb-3" v-if="formData.amount > parseInt(sellerData.amount)">{{ $t('nft.not_enough') }}</p>

        <label class="sign__label">{{ $t('nft.price_per_piece') }}</label>
        <b-input type="text" required class="sign__input mb-1 border" v-model="formData.price"/>
        <label class="sign__label mb-4 pl-2">{{  toFixed(price,4) }} {{ nftData.net }} ≈ ￦{{ amountToPrice(nftData.net,price) }}</label>
      </div>

      <b-button variant="primary" class="height-50 base-font-weight mt-2 mb-4 w-100" block type="submit" v-bind:class="{ disabled : isDisabled }">
        <b-spinner v-if="loading"></b-spinner>
        <span v-else>{{ $t('nft.update') }}</span>
      </b-button>
    </b-form>
  </b-modal>
</template>

<script>
export default {
  name: "ModalUpdateMultiNft",
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
      }else if(this.formData.isForSale == false){
        return true
      }else if(this.formData.isForSale == true && (this.formData.amount <= 0 || this.formData.price <= 0)){
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
      let txHash = await this.$contract.multiNFT.updateSale(this.nftData.net,this.nftData.token_id,isForSale,this.formData.amount,price)
      this.loading = false

      this.$bvModal.hide("bv-modal-update-multinft")
    }
  }
}
</script>

<style scoped>

</style>
