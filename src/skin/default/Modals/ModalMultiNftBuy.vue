<template>
  <b-modal id="bv-modal-multinft-buy" hide-footer @show="show">
    <template #modal-title>
      NFT {{ $t('nft.quantity_buy') }}
    </template>
    <b-form @submit.prevent="submit">
      <label class="sign__label">{{ $t('nft.buy_quantity') }} ({{ $t('nft.max') }} {{ this.sellerData.sell_amount }})</label>
      <b-input type="number" required class="sign__input mb-1 border" v-model="formData.amount"/>

      <p class="text-danger pl-2 pt-0 mt-0 mb-0" v-if="lackBalance">{{ $t('nft.insufficient_balance') }}</p>
      <label class="sign__label mb-4 pl-2">{{ toFixed(price,4) }} {{ (!sellerData.token?$env.VUE_APP_BASE_MAINNET:sellerData.token.symbol) }}
        <span v-if="sellerData != undefined && sellerData.token != undefined && sellerData.token.tokenAddress == '0x0000000000000000000000000000000000000000'"> ≈ ￦{{ amountToPrice(nftData.net,price) }}</span></label>

      <b-button v-if="showAllow" variant="primary" class="height-50 base-font-weight mt-2 mb-4 w-100" block type="submit" v-bind:class="{ disabled: lackBalance }" @click="submitApprove(nftData.net,sellerData.token.tokenAddress,MultiNftContractAddress )">
        <b-spinner v-if="loadingApprove"></b-spinner>
        <span v-else>{{ $t('nft.approve') }}</span>
        <span v-if="lackBalance"> - {{ $t('nft.lack_of_balance') }}</span>
      </b-button>
      <b-button v-else variant="primary" class="height-50 base-font-weight mt-2 mb-4 w-100" block type="submit" v-bind:class="{ disabled : isDisabled }">
        <b-spinner v-if="loading"></b-spinner>
        <span v-else>{{ $t('nft.buy') }}</span>
      </b-button>
    </b-form>
  </b-modal>
</template>

<script>
import ModalMultiNftBuy from "@/mixins/Modals/ModalMultiNftBuy";

export default {
  name: "ModalMultiNftBuy",
  mixins: [ModalMultiNftBuy],


}
</script>

<style scoped>

</style>
