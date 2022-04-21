<template>
  <b-modal id="bv-modal-multi-wallet" hide-footer>
    <template #modal-title>
      사용하실 지갑을 선택해주세요.
    </template>

    <b-form >
      <b-row class="mb-4 d-flex" v-for="(item, i) in wallets" @click="onSelect(item)">
        <b-col>
          <b-button squared class="d-block" :style="item.style">
            <img class="mr-2 text-center" :src="item.img_url" width="30px" style="border-radius: 10px;vertical-align:middle"/>
            <p class="d-inline-block" style="vertical-align:middle;margin: 0" >{{ item.name }}</p>
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-modal>
</template>

<script>
import ModalMultiWallet from '@/mixins/Modals/ModalMultiWallet'

export default {
  name: "ModalMultiWallet",
  mixins : [
    ModalMultiWallet
  ],
  data(){
    return {
      wallets : []
    }

  },
  methods : {
    getWallets(){

      this.wallets.push({
        img_url : "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/512px-MetaMask_Fox.svg.png",
        symbol : "METAMASK",
        name : "Metamask 지갑 연결",
        style : "border: none;width: 100%;background-color: rgb(250, 251, 252);box-shadow: rgb(222 227 235) 0px 1px 1px 0px; min-height:50px"
      })
      this.wallets.push({
        img_url : "https://dappimg.com/media/image/dapp/f2c37dc5e72747b187d14793d70c1376.blob",
        symbol : "KAIKAS",
        name : "Kaikas 지갑 연결",
        style : "border: none;width: 100%;background-color: rgb(250, 251, 252);box-shadow: rgb(222 227 235) 0px 1px 1px 0px; min-height:50px"
      })
      this.wallets.push({
        img_url : "https://klayswap.com/img/icon/ic-service-klip-bk.svg",
        symbol : "KLIP",
        name : "카카오톡 Klip으로 지갑연결",
        style : "border: none;width: 100%;background-color: rgb(250, 251, 252);box-shadow: rgb(222 227 235) 0px 1px 1px 0px; min-height:50px"
      })
    }
  },
  created() {
    this.getWallets();
  }
}
</script>

<style scoped>

</style>
