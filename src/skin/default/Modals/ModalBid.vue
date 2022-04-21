<template>
  <b-modal id="bv-modal-bid" hide-footer>
    <template #modal-title>
      NFT {{ $t('nft.bid') }}
    </template>
    <b-form @submit.prevent="onBidSubmit" v-if="!!nftData.token">
      <label class="sign__label">{{ $t('nft.bid_price') }}</label>
      <b-input type="text" required class="sign__input mb-1 border" v-model="formData.price"/>
      <p class="text-danger pl-2 pt-0 mt-0 mb-0" v-if="lackBalance">{{ $t('nft.insufficient_balance') }}</p>
      <label class="sign__label mb-4 pl-2">{{ formData.price }} {{ nftData.token.symbol }}<span v-if="nftData.token.tokenAddress == '0x0000000000000000000000000000000000000000'"> ≈ ￦{{ amountToPrice(nftData.net,formData.price) }}</span></label>
      <b-button variant="primary" class="height-50 base-font-weight mt-2 mb-4 w-100" block type="submit" v-bind:class="{ disabled : isDisabledBid }">
        <b-spinner v-if="loading"></b-spinner>
        <span v-else>{{ $t('nft.bid') }}</span>
      </b-button>
    </b-form>
  </b-modal>
</template>

<script>
import ModalBid from "@/mixins/Modals/ModalBid";

export default {
  name: "ModalBid",
  mixins: [ModalBid],


}
</script>

<style scoped>

</style>
