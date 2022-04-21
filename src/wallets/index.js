import wallet from "@/wallet";


export default {
  /*
    스토리지 초기화
     */
  storageInit(){
    let obj = {
      serviceInfo : {
        address : "",
        netName : "",
        wallet : "",
      },
      connection : {
        conn : false,
      },
      klip : {
        auth_requestKey : null,
        walletConnectRequestKey : null,
        history : {
          // klip_result_...key : null
        }
      },

    }
    localStorage.setItem("nft_service", JSON.stringify(obj));
  },

  /*
  스토리지 저장
   */
  setStorage(obj){
    localStorage.setItem("nft_service", JSON.stringify(obj));
  },

  /*
  스토리지 로드
   */
  getStorage(){
    if (localStorage.getItem("nft_service") == null){
      this.storageInit()
    }

    let json = JSON.parse(localStorage.getItem("nft_service"));

    if (!json.hasOwnProperty("connection") || !json.hasOwnProperty("serviceInfo")){
      // 없는 경우 강제 초기화
      this.storageInit()
    }

    if (json.serviceInfo.wallet == "" || json.serviceInfo.wallet == null){
      json.connection.conn == false
      this.setStorage(json);
    }

    return json;
  },

  getHistoryLength(){
    let json = this.getStorage();
    return Object.keys(json.klip.history).length;
  },

  getWalletName(){
    let json = this.getStorage();
    return json.serviceInfo.wallet;
  },

  getDefaultWallet(){
    let json = this.getStorage();
    if(json.serviceInfo.wallet == "" || json.serviceInfo.wallet == null){
      return window.front_env.VUE_APP_BASE_WALLET;
    }

    return json.serviceInfo.wallet
  },

  historyInit(json){
    json.klip.history = {}
    this.setStorage(json)
  },

  /*
  신규 추가 History 수집 개수 제한
   */
  historyLogic(){
    if (this.getHistoryLength() > 5){
      this.historyInit(this.getStorage())
    }
  },

  singleWalletNet(){
    if(this.$env.VUE_APP_BASE_WALLET == "METAMASK"){
      if(ethereum.chainId == '0x1'){
        return "ETH"
      }else if(ethereum.chainId == '0x38'){
        return "BNB"
      }else if(ethereum.chainId == '0x2019'){
        return "KLAY"
      }else if(ethereum.chainId == '0x89'){
        return "MATIC"
      }

    }else if(this.$env.VUE_APP_BASE_WALLET == "KAIKAS"){
      return "KLAY"
    }else if(this.$env.VUE_APP_BASE_WALLET == "KLIP"){
      return "KLAY"
    }

    return ""
  },

  multiWalletNet(){
    var wallet = JSON.parse(localStorage.getItem("nft_service"));

    if(wallet.serviceInfo.wallet == "METAMASK"){
      if(ethereum.chainId == '0x1'){
        return "ETH"
      }else if(ethereum.chainId == '0x38'){
        return "BSC"
      }else if(ethereum.chainId == '0x2019'){
        return "KLAY"
      }else if(ethereum.chainId == '0x89'){
        return "MATIC"
      }
    }else if(wallet.serviceInfo.wallet == "KAIKAS"){
      return "KLAY"
    }else if(wallet.serviceInfo.wallet == "KLIP"){
      return "KLAY"
    }
    return ""
  },

  /*
  다중 지갑 사용 여부 체크 함수
   */
  isMultiWallet(){
    if (window.front_env.VUE_APP_BASE_MULTI_WALLET == "y"){
      return true;
    }
    return false;
  }
}
