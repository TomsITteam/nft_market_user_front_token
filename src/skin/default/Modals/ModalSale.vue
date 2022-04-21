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
        <label class="sign__label">{{ $t('nft.publish_net') }}</label>
        <b-dropdown menu-class="not-top" variant="net-select">
          <template #button-content>
            <span v-if="selectedNet == null">{{ $t('nft.select_net') }}</span>
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
      </div>
      <div class="mb-3" v-if="formData.interface == 'erc721' || formData.interface == 'erc1155'">
        <label class="sign__label">{{ $t('nft.payType') }}</label>
        <b-dropdown menu-class="not-top" variant="token-select">
          <template #button-content>
            <span v-if="selectedToken == null">{{ $t('nft.select') }}</span>
            <span v-else>
              <img class="mr-2" width="30px" height="30px" :src="selectedToken.img_url"/>{{ selectedToken.symbol }}
            </span>
          </template>
          <b-dropdown-item v-for="item in payTokens" @click="chamgePaymentToken(item)"><img class="mr-2" width="30px" height="30px" :src="item.img_url"/>{{ item.symbol }}</b-dropdown-item>
        </b-dropdown>
      </div>

      <div v-if="formData.interface == 'erc721'">
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
import ModalSale from "@/mixins/Modals/ModalSale";

export default {
  name: "ModalSale",
  mixins: [ModalSale],

}
</script>

<style scoped>

</style>
