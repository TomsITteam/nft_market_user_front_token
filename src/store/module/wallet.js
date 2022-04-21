import Wallet from '@/wallet'
import wallets from '@/wallets'

const state = {
  wallet : null,
}

const mutations = {
  async setWallet(state,payload){
    state.wallet = {
      "address" : payload,
      "name" : payload,
    }
  }
}

const actions = {
  connectWallet(context,payload){
    context.commit("setWallet",payload)
  }
}


const getters = {
  isWallet(state) {
    return !!state.wallet;
  },
  getWallet(state) {
    return state.wallet;
  },
  async connectedWallet(state){

    let conn = wallets.getStorage();
    if(state.wallet == null){
      return false
    }

    var balance = await Wallet.getWallet().getBalance(state.wallet.address)
    let wal = wallets.getWalletName();

    if(balance > 0 && wal != "KLIP"){
      balance = (balance * 0.0000000001 * 0.00000001).toFixed(3)
    }

    return {
      address : state.wallet.address,
      name : state.wallet.name,
      balance : balance
    }
  }
}

const wallet = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default wallet
