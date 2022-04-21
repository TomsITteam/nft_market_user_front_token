import wallets from "@/wallets";

export default {
  methods:{
    deepLink(){
      return "https://metamask.app.link/dapp/" + window.location.hostname
    },
    isMobile() {
      let ios = /iPhone|iPad/i.test(navigator.userAgent)
      let android = /Android/i.test(navigator.userAgent)
      if (ios == true || android == true) {
        return true
      }
    },
    async loadWallet(walletName){
      let json = wallets.getStorage()
      json.serviceInfo.wallet = walletName;
      json.connection.conn = true;
      wallets.setStorage(json);

      if (this.isMobile() != true && !this.$wallet.getWallet().isDownload()){
        return false
      }else if(this.isMobile() == true) {
        if (wallets.getWalletName() == "METAMASK" && window.ethereum == undefined) {
          window.location.href = this.deepLink();
          return false;
        } else if (wallets.getWalletName() == "KAIKAS" && window.ethereum != undefined) {
          alert("모바일 앱에서는 KAIKAS를 지원하지 않습니다. ");
          return false;
        } else if (wallets.getWalletName() == "KLIP" && window.ethereum != undefined) {
          alert("메타마스크 앱에서는 KLIP 지갑을 이용하실 수 없습니다. 일반 브라우저를 이용해주세요");
          return false;
        }
      }

      await this.$wallet.getWallet().checkConnect()
      var iOSSafari = /iP(ad|od|hone)/i.test(window.navigator.userAgent) && /WebKit/i.test(window.navigator.userAgent) && !(/(CriOS|FxiOS|OPiOS|mercury|whale)/i.test(window.navigator.userAgent));

      if (wallets.getWalletName() == "KLIP") {
        if (iOSSafari == true){
          alert("사파리 브라우저에서는 사용하실 수 없습니다. 크롬, 웨일 등 기타 브라우저를 이용해주세요.");
          return false
        }

        if (this.$wallet.getWallet().getAccount() == false) {
          this.$bvModal.show("bv-modal-klip-wallet")
        }
      }

      this.changeWalletName();
    },
  }
}
