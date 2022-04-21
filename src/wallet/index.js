import kaika from "./kaika";
import metamask from "./metamask";
import klip from "./klip";
import wallets from "@/wallets"

if(process.env.NODE_ENV == "development"){
  window.front_env = process.env
}

export default {
  getWallet() {
    let wallet
    if (wallets.isMultiWallet()){
      if(wallets.getDefaultWallet() == 'KAIKAS'){
        wallet = kaika
      }else if(wallets.getDefaultWallet() == 'METAMASK'){
        wallet = metamask
      }else if(wallets.getDefaultWallet() == 'KLIP'){
        wallet = klip
      }
    }
    else {

      if(window.front_env.VUE_APP_BASE_WALLET == 'KAIKAS'){
        wallet = kaika
      }else if(window.front_env.VUE_APP_BASE_WALLET == 'METAMASK'){
        wallet = metamask
      }else if(window.front_env.VUE_APP_BASE_WALLET == 'KLIP'){
        wallet = klip
      }
    }


    return wallet
  }
}
