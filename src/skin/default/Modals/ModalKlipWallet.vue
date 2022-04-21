<template>
  <b-modal id="bv-modal-klip-wallet"  @show="show" @close="hide" @hide="hide" size="lg" title="Large Modal" hide-footer>
    <!--    centered-->
    <template #modal-title>
      카카오톡에서 QR코드를 스캔하세요
    </template>
    <div class="underline mt-1 mb-5"></div>
    <div v-if="isMobile() == true">
      <div class="text-center mt-2 mb-5" style="justify-content: center !important;">
        <b-spinner label="Loading..."></b-spinner>
      </div>
      <b-row>
        <b-col>
          <p class="text-center">제한 시간 : {{ cnt }}</p>
        </b-col>
      </b-row>
    </div>
    <div v-else>
      <b-form>
        <b-row>
          <b-col>
            <qrcode-vue class="text-center" :value="codeData" :size="size" level="H" />
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <p class="text-center">제한 시간 : {{ cnt }}</p>
          </b-col>
        </b-row>
      </b-form>
      <div class="underline mt-3 mb-3"></div>
      <div class="text-center" style="justify-content: center !important;">
        <img src="https://klayswap.com/img/icon/ic-kakaotalk-logo.svg" alt="" class="mr-3">
        <img src="https://klayswap.com/img/icon/ic-pointer-right-bk.svg" alt="" class="mr-3">
        <img src="https://klayswap.com/img/icon/ic-kakaotalk-search.svg" alt="" class="mr-3">
        <img src="https://klayswap.com/img/icon/ic-pointer-right-bk.svg" alt="" class="mr-3">
        <img src="https://klayswap.com/img/icon/ic-kakaotalk-scan.svg" alt="" class="">
      </div>

      <div class="text-center mt-2" style="justify-content: center !important;">
        <span class="mr-3 ml-3">카카오톡 실행</span>
        <span class="mr-3">상단 검색창 클릭</span>
        <span>코드 스캔 후 로그인</span>
      </div>
      <div class="text-center mt-2" style="justify-content: center !important;">
        <span>* Klip > 코드스캔 (사이드메뉴)에서도 스캔이 가능합니다.</span>
      </div>
    </div>

  </b-modal>
</template>
<script>

import ModalKlipWallet from '@/mixins/Modals/ModalKlipWallet'
import QrcodeVue from "qrcode.vue";

export default {
  name: "ModalKlipWallet",
  mixins : [
    ModalKlipWallet
  ],
  components: {
    QrcodeVue,
  },
}
</script>

<style scoped>
.underline {
  border-bottom: rgb(104 104 104 / 50%) 1px solid;
}
span {
  font-size: 10px;
}
</style>
