import store from "@/store";
import Caver from 'caver-js'
import i18n from '@/locales'

export default {
  connecting : false,
  checkChainID(net){
    return true
  },
  async checkConnect(){
    if(this.isWallet() == false  ||  this.getAccount() == false){
      return
    }

    this.connectWallet()
  },
  isWallet(){
    if(typeof window.klaytn !== 'undefined'){
      return true
    }

    return false
  },
  beforeWalletCheck(){
    if(this.isDownload() == false){
      return false
    }

    return true
  },
  isDownload(){
    if(this.isWallet() == true)
      return true

    alert(i18n.t('alert.alert7'))
    window.open("https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi")
    return false
  },
  getAccount(){
    try{
      return klaytn.selectedAddress
    }catch (e){

    }

    return false
  },
  async getBalance(address){
    const caver = new Caver(klaytn)
    let balance = await caver.klay.getBalance(address)
    return balance
  },
  isConnect(){
    if(this.getAccount() == false){
      return false
    }

    return true
  },
  async connectWallet(){
    this.connecting = true

    const accounts = await klaytn.enable()
    const account = accounts[0]

    await store.dispatch('wallet/connectWallet',account)
    await store.dispatch('collection/loadMyCollection')

    this.connecting = false
    return account
  },
  async contractExec(address,value,data){
    if(value != 0){
      let decimal = 18
      let valueSplit = value.toString(10).split(".")
      if(valueSplit.length > 1){
        decimal = decimal - valueSplit[1].length
        value = valueSplit[0] + "" + valueSplit[1]
      }

      let toDecimal = '1'
      for(var i=0;i<decimal;i++){
        toDecimal += '0'
      }

      value = BigInt(value) * BigInt(toDecimal)
    }

    const caver = new Caver(klaytn)

    try {
      const accounts = await klaytn.enable()
      const account = accounts[0]

      let txData = {
        type: 'SMART_CONTRACT_EXECUTION',
        from: account,
        to: address,
        value: "0x" + value.toString(16),
        data: '0x' + data,
        gas: 1000000,
      }

      let transaction = await caver.klay.sendTransaction(txData)

      return transaction.transactionHash
    }catch (e){
      console.log(e)
    }

    return false
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
  async sign(message){
    const caver = new Caver(klaytn)
    const account = this.getAccount()
    try {
      return await caver.klay.sign(message, account)
    }catch (e) {

    }

    return false
  }
}
