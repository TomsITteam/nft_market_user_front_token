///////////토큰결제/////////////////////////////
import API from "@/api";

const state = {
  payTokens : null,
}

const mutations = {
  setPayTokens(state,payload){
    state.payTokens = payload
  },
}

const actions = {
  async loadPayTokens(context,payload){
    let result = await API.payTokens()

    context.commit("setPayTokens",result.data)
  },
}


const getters = {
  getPayTokens(state){
    return state.payTokens
  },
}

const payTokens = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default payTokens
