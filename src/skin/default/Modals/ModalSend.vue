<template>
  <b-modal id="bv-modal-send" hide-footer @show="show">
    <template #modal-title>
      NFT {{ $t('nft.send') }}
    </template>

    <b-form @submit="onSubmit">
      <div >
        <label class="sign__label">{{ $t('nft.reciveAddress') }}</label>
        <b-input type="text" required="required" class="sign__input mb-4 border" v-model="formData.reviceAddress" placeholder="0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85"/>
      </div>

      <div v-if="this.formData.interface == 'erc1155'">
        <label class="sign__label">{{ $t('nft.amount') }} ({{ maxSendAmount }}{{ $t('nft.can_be_sent') }})</label>
        <b-input type="number" required="required" class="sign__input mb-4 border" v-model="formData.sendAmount" placeholder="1"/>
      </div>

      <b-button variant="primary" class="height-50 base-font-weight mt-2 mb-4 w-100" block type="submit" v-bind:class="{ disabled : submitDisabled }">
        <b-spinner v-if="loading"></b-spinner>
        <span v-else>{{ $t('nft.send') }}</span>
      </b-button>
    </b-form>

  </b-modal>
</template>

<script>
import ModalSend from "@/mixins/Modals/ModalSend";

export default {
  name: "ModalSend",
  mixins: [ModalSend]

}
</script>

<style scoped>

</style>
