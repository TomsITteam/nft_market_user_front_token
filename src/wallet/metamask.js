import store from "@/store";
import i18n from '@/locales'

export default {
  connecting : false,
  checkChainID(net){
    if(net == 'ETH' && ethereum.chainId != '0x1'){
      window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            "chainId": "0x1"
          }
        ]
      })
      return false
    }else if((net == 'BNB' || net == 'BSC') && ethereum.chainId != '0x38'){
      window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: "0x38",
            chainName: "Smart Chain",
            rpcUrls: ["https://bsc-dataseed.binance.org"],
            nativeCurrency:{
              symbol: "BNB",
              decimals : 18
            }
          }
        ]
      })
      return false
    }else if(net == 'KLAY' && ethereum.chainId != '0x2019'){
      window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: "0x2019",
            chainName: "Klaytn",
            rpcUrls: ["https://public-node-api.klaytnapi.com/v1/cypress"],
            blockExplorerUrls:["https://scope.klaytn.com"],
            nativeCurrency:{
              symbol: "KLAY",
              decimals : 18
            }
          }
        ]
      })
      return false
    }else if(net == 'MATIC' && ethereum.chainId != '0x89'){
      window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: "0x89",
            chainName: "Polygon",
            rpcUrls: ["https://rpc-mainnet.maticvigil.com"],
            blockExplorerUrls:["https://polygonscan.com"],
            nativeCurrency:{
              symbol: "MATIC",
              decimals : 18
            }
          }
        ]
      })
      return false
    }

    return true
  },
  async checkConnect(){
    if(this.isWallet() == false  ||  await this.asyncGetAccount() == false){
      return
    }

    this.connectWallet()
  },
  isWallet(){
    if(typeof window.ethereum !== 'undefined'){
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

    alert(i18n.t('alert.alert4'))
    window.open("https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ko")
    return false
  },
  getAccount(){
    try{
      return ethereum.selectedAddress
    }catch (e){

    }

    return false
  },
  async asyncGetAccount(){
    try{
      let address = this.getAccount()
      if(address == false || address == null || address == undefined){
        let accounts = await ethereum.request({ method: 'eth_requestAccounts' })
        return accounts[0]
      }

      return address
    }catch (e){

    }

    return false
  },
  async getBalance(address){
    if(address == null || address == undefined){
      return 0
    }

    var balance
    try{
      balance = await ethereum.request({
        method: 'eth_getBalance',
        params : [address,'latest']
      });
    }catch (e) {
      return 0
    }
    if(balance == 0){
      return 0
    }

    return parseInt(balance,16)
  },
  isConnect(){
    if(this.getAccount() == null || this.getAccount() == false){
      return false
    }

    return true
  },
  async connectWallet(){
    this.connecting = true
    let accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0]

    await store.dispatch('wallet/connectWallet',account)
    await store.dispatch('collection/loadMyCollection')

    this.connecting = false
    return account
  },
  async createContract(binary){
    const transactionParameters = {
      from: ethereum.selectedAddress,
      value: '0x00',
      data: binary,
    };

    let txHash = await ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    });

    return txHash
  },
  async contractExec(address,value,data){
    value = value==0 ? 0 : value * 1000000000000000000
    value = Math.round(value)

    try {
      let transactionParameters = {
        from: ethereum.selectedAddress,
        to: address,
        value: '0x' + value.toString(16),
        data: '0x' + data,
      }
      if(ethereum.chainId == '0x2019') {
        transactionParameters['gasPrice'] = "0xAE9F7BCC00"
      }
      let txHash = await ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      })

      return txHash
    }catch (e){
      console.log(e)
    }

    return false
  },
  getNftInfoLink(net,nftInterface,nft_id){
    let address
    if(nftInterface == 'erc721'){
      address = window.front_env['VUE_APP_' + net + '_SINGLENFT_CONTRACT_ADDRESS']
    }else{
      address = window.front_env['VUE_APP_' + net + '_MULTINFT_CONTRACT_ADDRESS']
    }

    if(net == 'BSC'){
      return `https://bscscan.com/token/${address}?a=${nft_id}#inventory`
    }else if(net == 'KLAY') {
      return `https://v2.scope.klaytn.com/nft/${address}/${nft_id}`
    }else if(net == 'MATIC') {
      return `https://polygonscan.com/token/${address}?a=${nft_id}#inventory`
    }

    return `https://etherscan.io/token/${address}?a=${nft_id}#inventory`
  },
  getTxLink(net,tx_hash){
    if(net == 'BSC') {
      return `https://bscscan.com/tx/${tx_hash}`
    }else if(net == 'KLAY') {
      return `https://v2.scope.klaytn.com/tx/${tx_hash}`
    }else if(net == 'MATIC') {
      return `https://polygonscan.com/tx/${tx_hash}`
    }

    return `https://etherscan.io/tx/${tx_hash}`
  },
  getContractLink(net,nftInterface){
    let address
    if(nftInterface == 'erc721'){
      address = window.front_env['VUE_APP_' + net + '_SINGLENFT_CONTRACT_ADDRESS']
    }else{
      address = window.front_env['VUE_APP_' + net + '_MULTINFT_CONTRACT_ADDRESS']
    }

    if(net == 'BSC') {
      return `https://bscscan.com/token/${address}`
    }else if(net == 'KLAY') {
      return `https://v2.scope.klaytn.com/account/${address}`
    }else if(net == 'MATIC') {
      return `https://polygonscan.com/token/${address}`
    }

    return `https://etherscan.io/token/${address}`
  },
  async sign(message){

    const address = this.getAccount()
    try {
      return await ethereum.request({
        method: 'personal_sign',
        params : [message,address],
        from : address
      });
    }catch (e) {

    }
    return false
  }
}
