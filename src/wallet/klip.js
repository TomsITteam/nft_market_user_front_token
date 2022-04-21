import { prepare, request, getResult, getCardList } from 'klip-sdk'
import store from "@/store";
import api from "@/api/index"

import wallets from "@/wallets"
import API from "@/api";
import modal from "bootstrap/js/src/modal";

export default {
  walletname : "KLIP",
  connecting : false,
  requestKey : null,
  address : null,
  is_upload : false,

  async createRequestKey(requestType,requestParameters){
    try{
      const res = await prepare[requestType](requestParameters)
      return res;
    }catch(err){
      console.log(err)
    }
  },

  async getResultKey(){
    let result = getResult(this.requestKey)
    return result;
  },

  async postRequest(link){
    request(link, () => alert('모바일 환경에서 실행해주세요'))
  },

  async asyncGetAccount(){
    try{
      let res = await this.getResultKey();

      if(res.hasOwnProperty("result") && res.status == "completed"){
        return res.result.klaytn_address
      }
    }catch (e){
      return false;
    }

    return false
  },


  checkChainID(){
    return true
  },
  async connectWallet(is_upload = null){
    if(this.getAccount() != null && is_upload == null){
      await this.setConnectedAddress(this.getAccount())
      return
    }

    if (is_upload != null){
      var auth_requestKey = await this.getAuthRequestKey(true);
    }else {
      var auth_requestKey = await this.getAuthRequestKey()
    }

    let modalResult = await this.resultModal(auth_requestKey)

    if(modalResult != false){
      const account = modalResult.result.klaytn_address

      await store.dispatch('wallet/connectWallet',account)
      await store.dispatch('collection/loadMyCollection')
      this.setStorageItem("walletConnectRequestKey",modalResult.request_key)
    }else if(modalResult == false){
      return  false;
    }

    this.connecting = false
    return modalResult;
  },
  getAccount() {
    var result = wallets.getStorage();
    let requestKey = this.getStorageItem("walletConnectRequestKey")
    let resultData = this.getStorageItem("klip_result_" + requestKey)

    if (resultData != undefined || resultData != null || resultData != ""){
      let authcheck = this.getStorageItem("klip_auth_requestKey");
      if(authcheck == false || ((new Date()).getTime() / 1000) > authcheck.expiration_time){

        this.resetAuthRequestKey();
      }
    }

    if (resultData.klaytn_address != "" && resultData.klaytn_address != undefined && resultData.klaytn_address != null){
      resultData.klaytn_address = resultData.klaytn_address.toLowerCase()
    }

    return resultData.klaytn_address

  },
  getStorageItem(key){
    var result = wallets.getStorage();

    if (key == "klip_auth_requestKey"){
      if (result.klip.auth_requestKey == undefined || result.klip.auth_requestKey == null){
        return false;
      }
      return result.klip.auth_requestKey;

    }else if(key.substr(0, 12) == "klip_result_"){
      if (!result.klip.history.hasOwnProperty(key)){
        return false;
      }
      return result.klip.history[key];

    }else if(key == "walletConnectRequestKey"){
      return result.klip.walletConnectRequestKey;
    }
    return false;
  },
  setStorageItem(key,data){
    var result = wallets.getStorage();

    if (key == "klip_auth_requestKey"){ // auth request_key
      result.klip.auth_requestKey = data

    }else if(key.substr(0, 12) == "klip_result_"){
      result.klip.history[key] = data

    }else if(key == "walletConnectRequestKey"){
      result.klip.walletConnectRequestKey = data

    }
    wallets.setStorage(result);
  },

  async getResult(requestKey){
    var resultData = this.getStorageItem("klip_result_" + requestKey)

    if(resultData == false){
      resultData = await getResult(requestKey)
      resultData = resultData.result
    }

    if(resultData != false && resultData != undefined) {
      wallets.historyLogic();
      this.setStorageItem("klip_result_" + requestKey, resultData)
    }else{
      resultData = false
    }

    return resultData
  },

  async checkConnect(){
    if(this.isWallet() == false || await this.getAccount() == false){
      return
    }

    this.checkChainID()
    this.connectWallet()

  },

  async contractExec(address,value,data, abi){
    var requestKeyData = this.getStorageItem("klip_auth_requestKey")
    var resultData = this.getStorageItem("klip_result_" + requestKeyData.request_key)

    const from = resultData.klaytn_address

    let json = this.customObject(abi, data, false, address, from, value);

    let result = await API.klipContractExec({
      data : json
    })

    let modalResult = await this.resultModal(result.data)

    if(modalResult != false){
      return modalResult.result.tx_hash

    }else if(modalResult == false){
      return  false;
    }
  },

  customObject(obj, signature, type = false, address, from, value){
    let json = {}
    let requestJson = {}
    json = {
      inputs:[

      ],
      name:obj.method,
      outputs:[
      ],
      stateMutability:"nonpayable",
      type:"function",
      signature : "0x" + signature.substr(0,8)
    }

    let paraData = []
    for (const index in obj.parameter_type) {
      let object = {
        name : Math.random().toString(36).substring(7),
        type : obj.parameter_type[index]
      }

      var paradata = obj.parameter_data[index]

      if (obj.parameter_type[index] == "uint256"){
        if (obj.parameter_data[index].toString().substr(0,2) == "0x"){
          paradata = BigInt(parseInt(obj.parameter_data[index],16)).toString()
        }
      }

      if(paradata == 0)
        paradata = false

      paraData.push(paradata)
      json.inputs.push(object)
    }

    requestJson = {
      bapp: {
        name: window.front_env.VUE_APP_NAME,
      },
      transaction: {
        from: from.toLowerCase(),
        to: address.toLowerCase(),
        value: value,
        abi: JSON.stringify(json),
        params: JSON.stringify(paraData)
      },
      type: "execute_contract"
    }

    return requestJson
  },

  isDownload(){
    return true
  },
  isWallet(){
    return true;
  },

  async getAuthRequestKey(is_upload = null){
    var requestKeyData = this.getStorageItem("klip_auth_requestKey")

    if(requestKeyData == false || ((new Date()).getTime() / 1000) > requestKeyData.expiration_time || is_upload != null){
      requestKeyData = await this.createRequestKey("auth",{
        bappName : window.front_env.VUE_APP_NAME
      })
    }

    if(requestKeyData.request_key == undefined){
      return false
    }

    this.setStorageItem("klip_auth_requestKey",requestKeyData)
    return requestKeyData
  },
  resetAuthRequestKey(){
    this.setStorageItem("klip_auth_requestKey",null)
    this.setStorageItem("walletConnectRequestKey",null)
  },
  async setConnectedAddress(address){
    await store.dispatch('wallet/connectWallet',address)
    await store.dispatch('collection/loadMyCollection')
  },
  resultModal(requestKey){
    return new Promise(function(resolved,rejected) {
      window.app.$klip = {
        requestKey : requestKey,
        success : async function(request_key,result){
          resolved({
            request_key,
            result
          })
        },
        close : async function(){
          resolved(false)
        }
      }

      var iOSSafari = /iP(ad|od|hone)/i.test(window.navigator.userAgent) && /WebKit/i.test(window.navigator.userAgent) && !(/(CriOS|FxiOS|OPiOS|mercury|whale)/i.test(window.navigator.userAgent));

      if (iOSSafari == true) {
        alert("사파리 브라우저에서는 사용하실 수 없습니다. 크롬, 웨일 등 기타 브라우저를 이용해주세요.");
        this.closeModel()
        return false
      }
      window.app.$bvModal.show("bv-modal-klip-wallet")
    }.bind(this))
  },
  async getBalance(address){

    if(address == null || address == undefined){
      return 0
    }

    let result = await api.klipBalance({
      address : address
    });
    if (result.hasOwnProperty("error")){
      return false;
    }

    return result.data.balance;
  },
  isConnect(){
    if(this.getAccount() == false){
      return false
    }

    return true
  },
  async sign(message){
    let result = await this.connectWallet(true);

    if(result == false){
      return false;
    }

    return window.app.$klip.requestKey;
  },
  getNftInfoLink(net,nftInterface,nft_id){
    if(nftInterface == 'erc721')
      return `https://scope.klaytn.com/nft/${window.front_env.VUE_APP_KLAY_SINGLENFT_CONTRACT_ADDRESS}/${nft_id}`

    return `https://scope.klaytn.com/account/${window.front_env.VUE_APP_KLAY_MULTINFT_CONTRACT_ADDRESS}/${nft_id}`
  },
  getTxLink(net,tx_hash){
    return `https://scope.klaytn.com/tx/${tx_hash}`
  },
  getContractLink(net,nftInterface,nft_id){
    if(nftInterface == 'erc721')
      return `https://scope.klaytn.com/nft/${window.front_env.VUE_APP_KLAY_SINGLENFT_CONTRACT_ADDRESS}`

    return `https://scope.klaytn.com/account/${window.front_env.VUE_APP_KLAY_MULTINFT_CONTRACT_ADDRESS}`
  },
  beforeWalletCheck(){
    if(this.isDownload() == false){
      return false
    }

    return true
  },

}


