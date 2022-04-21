import {mapGetters} from "vuex";

export default {
  name: "ModalMultiWallet",
  data() {
    return {
      size: 150,
      account : {},
      interval : Function,
      cnt : 60,
      callback : null,
      requestKey : null,
      expirationTime : null,
    }
  },
  computed:{
    codeData(){
      if(this.$klip == undefined){
        return "undefined"
      }
      return "https://klipwallet.com/?target=/a2a?request_key=" + this.requestKey
    }
  },
  methods: {
    isMobile(){
      let ios = /iPhone|iPad/i.test(navigator.userAgent)
      let android = /Android/i.test(navigator.userAgent)
      if (ios == true || android == true){
        return true
      }

      return false
    },
    createMobileRequestKey(){
      if (this.isMobile()){
        var iOSSafari = /iP(ad|od|hone)/i.test(window.navigator.userAgent) && /WebKit/i.test(window.navigator.userAgent) && !(/(CriOS|FxiOS|OPiOS|mercury|whale)/i.test(window.navigator.userAgent));

        if (iOSSafari == true) {
          alert("사파리 브라우저에서는 사용하실 수 없습니다. 크롬, 웨일 등 기타 브라우저를 이용해주세요.");
          return false
        }

        this.$wallet.getWallet().postRequest(this.requestKey);

      }
    },
    show() {
      this.requestKey     = window.app.$klip.requestKey.request_key
      this.expirationTime = window.app.$klip.requestKey.expiration_time
      this.success = window.app.$klip.success
      this.close = window.app.$klip.close
      this.cnt = 60;

      this.interval = setInterval(this.loop.bind(this),1000)

      this.createMobileRequestKey()

    },
    hide() {
      if(this.interval == null){
        return
      }

      clearInterval(this.interval)
      this.close()
    },
    async loop(){
      --this.cnt;
      if(this.cnt == 0){
        window.app.$bvModal.hide("bv-modal-klip-wallet")
        alert("제한시간이 초과되었습니다. 다시 시도해주세요.");
      }
      let result = await this.$wallet.getWallet().getResult(this.requestKey)

      if(result == false){
        return
      }
      clearInterval(this.interval)
      this.interval = null

      this.success(this.requestKey,result)


      this.$bvModal.hide("bv-modal-klip-wallet")
    },
    closeModel() {
      this.$bvModal.hide("bv-modal-klip-wallet");
    },
  },
  created() {
    this.isMobile()


  },
  mounted() {

  }

}
