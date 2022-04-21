import Vue from 'vue'
import axios from "axios";
import store from "@/store";
import wallet from "@/wallet";

Vue.prototype.$http = axios;

export default {
  jsonToQuery : function(param, keyString) {
    if (typeof param != "object") {
      return false
    }

    var str = ""
    for (var key in param) {
      str += `${key}=${param[key]}&`
    }

    return str
  },
  showProgress : function (val){
    store.state.loading  = true
    store.state.progress = val
  },
  hiddenProgress : function (){
    setTimeout(function(){
      store.state.loading = false
    },800)
  },
  fileRequest : async function (method,uri,data){
    if(data == undefined){
      data = {}
    }

    data = {
      ...data,
      lang :  window.$i18n.locale
    }

    var fd = new FormData();

    for (var index in data) {
      if (typeof data[index] == 'object') {
        for (var index2 in data[index]) {
          console.log(index)
          if(index != 'layers'){
            fd.append(index, data[index])
            break
          }

          fd.append(index + `[${index2}]`, data[index][index2])
        }
      } else {
        fd.append(index, data[index])
      }
    }

    var response = {}
    try {
      response = await axios.post(`${window.front_env.VUE_APP_BASE_API_URI}${uri}`, fd,{
        withCredentials: true,
        headers : {
          'Content-Type': 'multipart/form-data'
        }
      })
    }catch (e) {
      return false
    }


    var data = response.data

    return data
  },
  request : async function (method,uri,data=undefined){
    let app = new Vue()
    if(data == undefined){
      data = {}
    }

    data = {
      ...data,
      lang :  window.$i18n.locale
    }

    if(method == "GET" && data != undefined){
      uri += "?" + this.jsonToQuery(data)
    }

    var response = {}
    try {
      this.showProgress(10)

      if(method == "GET") {
        response = await axios.get(`${window.front_env.VUE_APP_BASE_API_URI}${uri}`, {
          withCredentials: true,
        })
      }else if(method == "POST"){
        var fd = new FormData();

        for (var index in data) {
          if (typeof data[index] == 'object'){
            for (var index2 in data[index]) {
              fd.append(index + `[${index2}]`, data[index][index2])
            }
          }else {
            fd.append(index, data[index])
          }
        }
        response = await axios.post(`${window.front_env.VUE_APP_BASE_API_URI}${uri}`, fd,{
          withCredentials: true,
          headers : {
            'Content-Type': 'multipart/form-data'
          }
        })
      }
    }catch (e) {
      return false
    }

    var data = response.data
    return data
  },

  auctionEnding : async function(req){
    var res = await this.request("GET","/nft/auctionending")
    return res
  },
  newTokens : async function(req){
    var res = await this.request("GET","/nft/newtokens")
    return res
  },
  collectionHoldingNFT : async function(req){
    var res = await this.request("GET",`/collection/${req.data.address}/holding`,req.data)
    return res
  },
  topSeller : async function(req){
    var res = await this.request("GET",`/collection/top-seller`,req.data)
    return res
  },
  collectionCreatedNFT : async function(req){
    var res = await this.request("GET",`/collection/${req.data.address}/created`,req.data)
    return res
  },
  collectionSaleNFT : async function(req){
    var res = await this.request("GET",`/collection/${req.data.address}/sale`,req.data)
    return res
  },
  hotCollection : async function(req){
    var res = await this.request("GET","/collection/hot",req.data)
    return res
  },
  getCollection : async function(req){
    var res = await this.request("GET",`/collection/${req.data.address}`,req.data)
    return res
  },
  getNFT : async function(req){
    var res = await this.request("GET","/nft/" + req.data.nft_id)
    return res
  },
  getMultiNftOwners : async function(req){
    var res = await this.request("GET","/nft/" + req.nft_id + "/owners",req)
    return res
  },
  explorerNFT : async function(req){
    var res = await this.request("GET","/nft/explorer/" + req.data.tab,req.data)
    return res
  },
  explorerCollection : async function(req){
    var res = await this.request("GET","/collection/explorer/" + req.data.tab,req.data)
    return res
  },

  createdNFT : async function(req){
    let signData = await this.getSignData(req.data)
    if(signData == false){
      return false
    }


    var res = await this.fileRequest("POST","/nft/created",signData)
    return res
  },

  deletedNFT : async function(req){
    let signData = await this.getSignData(req.data)
    if(signData == false){
      return false
    }


    var res = await this.request("POST","/nft/deleted",signData)
    return res
  },

  encodeFunction : async function(req){
    var res = await this.request("POST","/solc/encodefunction",req.data)
    return res
  },

  paused : async function(req){
    var res = await this.request("GET","/solc/paused",req.data)
    return res
  },
  allow : async function(req){
    var res = await this.request("GET",`/erc-20/${req.tokenAddress}/allow`,req.data)
    return res
  },

  payTokens : async function(){
    var res = await this.request("GET",`/pay-tokens`)
    return res
  },


  tokenBalance : async function(req){
    var res = await this.request("GET",`/erc-20/${req.tokenAddress}/balance`,req.data)
    return res
  },

  txVerify : async function(req){
    var res = await this.request("POST","/nft/" + req.data.nft_id +"/txverify",req.data)
    return res
  },

  liked : async function(req){
    let signData = await this.getSignData(req.data)
    if(signData == false){
      return false
    }

    var res = await this.request("POST","/like/" + req.data.category,signData)
    return res
  },
  updateProfile : async function(req){
    let signData = await this.getSignData(req.data)
    if(signData == false){
      return false
    }

    var res = await this.request("POST","/collection/update-profile",signData)
    return res
  },
  updateAvatar : async function(req){
    let signData = await this.getSignData(req.data)
    if(signData == false){
      return false
    }

    var res = await this.fileRequest("POST","/collection/update-avatar",signData)
    return res
  },
  updateCover : async function(req){
    let signData = await this.getSignData(req.data)
    if(signData == false){
      return false
    }

    var res = await this.fileRequest("POST","/collection/update-cover",signData)
    return res
  },
  async getSignData(reqData){
    let time = (new Date()).getTime() / 1000
    let message = "timestamp:" + time
    let signature = await wallet.getWallet().sign(message)

    if(signature == false){
      alert(this.$t('alert.alert1'))
      return false
    }

    if (wallet.getWallet().walletname == "KLIP"){

      return {
        auth_address : wallet.getWallet().getAccount(),
        auth_walletName : wallet.getWallet().walletname,
        auth_klip_request_key : signature,
        ...reqData,
      }
    }

    return {
      auth_address : wallet.getWallet().getAccount(),
      auth_walletName : wallet.getWallet().walletname,
      auth_signature : signature,
      auth_timestamp : time,

      ...reqData,
    }
  },
  contacts : async function(req){
    var res = await this.request("POST","/contact",req.data)
    return res
  },
  applyAuth : async function(req){
    let signData = await this.getSignData(req.data)
    if(signData == false){
      return false
    }

    var res = await this.request("POST","/collection/apply-auth",signData)
    return res
  },

  klipBalance : async function(req){
    var res = await this.request("GET","/klip/" + req.address + "/balance");
    return res
  },


  klipContractExec : async function(req){
    var res = await this.request("POST","/klip/contract-exec", req.data);
    return res
  },

  genLayerImage : async function(req){
    var res = await this.request("POST","/layer/gen-image", req.data);
    return res
  },
};
