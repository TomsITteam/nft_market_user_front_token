<template>
  <b-modal id="bv-modal-klip-wallet" ref="bv-modal-klip-wallet" hide-footer @show="show()" @hide="hide()">
    <template #modal-title>
      QR 코드로 로그인을 시도하세요.
    </template>

    <b-form >
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
  </b-modal>
</template>
<script>
import QrcodeVue from 'qrcode.vue'

export default {
  id : "bv-modal-klip-wallet",
  name: "ModalKlipWallet",
  computed:{
    codeData(){
      if(this.$klip == undefined){
        return "undefined"
      }
      return "https://klipwallet.com/?target=/a2a?request_key=" + this.requestKey
    }
  },
  data() {
    return {
      size: 300,
      account : {},
      close : false,
      interval : Function,
      cnt : 0,
      callback : null,
      requestKey : null,
      expirationTime : null,
    }
  },
  components: {
    QrcodeVue,
  },
  methods : {
    show() {
      this.requestKey     = window.app.$klip.requestKey.request_key
      this.expirationTime = window.app.$klip.requestKey.expiration_time
      this.success = window.app.$klip.success

      this.interval = setInterval(this.loop.bind(this),1000)
    },
    async loop(){
      let result = await this.$wallet.getResult(this.requestKey)
      if(result == false){
        return
      }
      clearInterval(this.interval)
      this.success(this.requestKey,result)

      this.$bvModal.hide("bv-modal-klip-wallet")
    },

    hide() {
      clearInterval(this.interval)
      this.$klip.close()
    },
    closeModel(){
      this.$bvModal.hide("bv-modal-klip-wallet");
    },


  },
  created() {
    // this.connection();
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>
