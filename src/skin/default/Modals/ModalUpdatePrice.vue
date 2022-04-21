<template>
  <b-modal id="bv-modal-update-price" hide-footer>
    <template #modal-title>
      NFT {{ $t('nft.price_change') }}
    </template>
    <b-form @submit="onUpdatePriceSubmit" v-if="nftData.token != undefined">
      <label class="sign__label">{{ $t('nft.price') }}</label>
      <b-input type="text" required class="sign__input mb-1 border" v-model="formData.price"/>
      <label class="sign__label mb-4 pl-2">{{ formData.price }} {{ nftData.token.symbol }}<span v-if="nftData.token.tokenAddress == '0x0000000000000000000000000000000000000000'"> ≈ ￦{{ amountToPrice(nftData.net,formData.price) }}</span></label>

      <b-button variant="primary" class="height-50 base-font-weight mt-2 mb-4 w-100" block type="submit" v-bind:class="{ disabled : loading }">
        <b-spinner v-if="loading"></b-spinner>
        <span v-else>{{ $t('nft.update') }}</span>
      </b-button>
    </b-form>
  </b-modal>
</template>

<script>
import ModalUpdatePrice from "@/mixins/Modals/ModalUpdatePrice";

export default {
  name: "ModalUpdatePrice",
  mixins: [ModalUpdatePrice],

}
</script>

<style scoped>

</style>
