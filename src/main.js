import VUE_APP_CATEGORY from '@/data/category.json'
import VUE_APP_LAYERS from '@/data/layer.json'

if(process.env.NODE_ENV == "development"){
  window.front_env = process.env
  window.front_env.VUE_APP_CATEGORY = VUE_APP_CATEGORY
  window.front_env.VUE_APP_LAYERS   = VUE_APP_LAYERS
}


import Vue from 'vue'
import App from './App.vue'
import router from './routes/router';
import store from './store'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import api from './api'
import exchange_api from './exchange_api'
import wallet from './wallet'
import contract from './contract'
import AsyncComputed from 'vue-async-computed'
import VueCookies from "vue-cookies"
import globalMixins from './mixins/global/index'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import i18n from './locales'
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

import 'video.js/dist/video-js.css'
import 'viewerjs/dist/viewer.css'

import('./assets/sass/' + process.env.VUE_APP_SKIN_NAME + '.scss')

if(process.env.VUE_APP_SKIN_NAME != 'default'){
}


import 'swiper/swiper-bundle.css'

import './assets/sass/coloring-gradient.css'

import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

import * as VueGoogleMaps from 'vue3-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBDrPx699tytaU3lqcm-0DhuYXFksaQakg',
    libraries: 'places',
  },
})

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$exchange_api = exchange_api
Vue.prototype.$wallet = wallet
Vue.prototype.$contract = contract
Vue.prototype.$env    = window.front_env
Vue.prototype.$klip   = {
  requestKey : "",
  success : function(){},
  failure : function(){},
  close : function(){}
}
window.$i18n          = i18n

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(AsyncComputed);
Vue.use(VueCookies);
Vue.use(globalMixins);

Vue.$cookies.config("7d");

window.app = new Vue({
  render: h => h(App),
  router,
  store,
  i18n
}).$mount('#app')
