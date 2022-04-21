import ExchangeAPI from '@/exchange_api'

const state = {
  price : {}
}

const mutations = {
  setPrice(state,payload){
    state.price = payload
  },
}

const actions = {
  async loadPrice(context,payload){
    let result = await ExchangeAPI.getPrice({
    })

    context.commit("setPrice",result)
  },
}

const getters = {
  getPrice(state){
    return state.price
  },
}


const exchange = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default exchange
