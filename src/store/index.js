import Vue from 'vue';
import Vuex from 'vuex';

import collection from "./module/collection";
import exchange from "./module/exchange";
import wallet from "./module/wallet";
import lang from "./module/lang";
import payTokens from "./module/payTokens";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    collection,
    exchange,
    wallet,
    lang,
    payTokens,
  }
});
