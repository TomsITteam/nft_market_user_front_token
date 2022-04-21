let locale = localStorage.getItem('locale')

if(locale == undefined || locale == null){
  let language = navigator.language || navigator.userLanguage
  if(language != null && language != undefined && language.substr(0,2) == 'ko'){
    locale = 'ko'
  }else{
    locale = 'en'
  }
  localStorage.setItem('locale',locale)
}

const state = {
  locale
}

const mutations = {
  setLocale(state,payload){
    state.locale = payload
    localStorage.setItem('locale',payload)
  },
}

const actions = {
  changeLocale(context,payload){
    if(context.state.locale == payload){
      return
    }

    context.commit("setLocale",payload)
    location.reload()
  }
}

const getters = {

}


const lang = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default lang
