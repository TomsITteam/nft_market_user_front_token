<template>
  <b-modal id="bv-modal-update-multinft" hide-footer @show="show">
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
        <label class="sign__label">{{ $t('nft.payType') }}</label>
        <b-dropdown class="mb-3" menu-class="not-top" variant="token-select">
          <template #button-content>
            <span v-if="selectedToken == null">{{ $t('nft.select') }}</span>
            <span v-else>
            <img class="mr-2" width="30px" height="30px" :src="selectedToken.img_url"/>{{ selectedToken.symbol }}
          </span>
          </template>
          <b-dropdown-item v-for="item in payTokens" @click="chamgePaymentToken(item)"><img class="mr-2" width="30px" height="30px" :src="item.img_url"/>{{ item.symbol }}</b-dropdown-item>
        </b-dropdown>

        <label class="sign__label">
          {{
            $t('nft.sales_quantity_amount',{
              amount : sellerData.amount
            })
          }}
        </label>
        <b-input type="text" required class="sign__input mb-1 border" v-model="formData.amount"/>
        <p class="text-danger pl-2 pt-0 mt-0 mb-3" v-if="formData.amount > sellerData.amount">{{ $t('nft.not_enough') }}</p>

        <label class="sign__label">{{ $t('nft.price_per_piece') }}</label>
        <b-input type="text" required class="sign__input mb-1 border" v-model="formData.price"/>
        <label v-if="selectedToken != null" class="sign__label mb-4 pl-2">{{  toFixed(price,4) }} {{ selectedToken.symbol }}<span v-if="selectedToken.tokenAddress == '0x0000000000000000000000000000000000000000'"> ≈ ￦{{ amountToPrice(nftData.net,price) }}</span></label>
      </div>

      <b-button variant="primary" class="height-50 base-font-weight mt-2 mb-4 w-100" block type="submit" v-bind:class="{ disabled : isDisabled }">
        <b-spinner v-if="loading"></b-spinner>
        <span v-else>{{ $t('nft.update') }}</span>
      </b-button>
    </b-form>
  </b-modal>
</template>

<script>
import ModalUpdateMultiNft from "@/mixins/Modals/ModalUpdateMultiNft";

export default {
  name: "ModalUpdateMultiNft",
  mixins: [ModalUpdateMultiNft],


}
</script>

<style scoped>

</style>
