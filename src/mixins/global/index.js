import gotoCreated from "./functions/gotoCreated";
import openWEB from "./functions/openWEB";
import reduceAddress from "./functions/reduceAddress";
import reduceUint from "./functions/reduceUint";
import amountToPrice from "./functions/amountToPrice";
import toFixed from "./functions/toFixed";
import sleep from "./functions/sleep";
import loadWallet from "./functions/loadWallet";
import chamgePaymentToken from "./functions/chamgePaymentToken";
import mulDecimal from "./functions/mulDecimal";
import toUint from "./functions/toUint";
import toWei from "./functions/toWei";
import nftPrice from "./functions/nftPrice";

import lang from "./modules/lang";
import payTokens from "./modules/payTokens";

export default {
  install(Vue) {
    Vue.mixin(gotoCreated)
    Vue.mixin(openWEB)
    Vue.mixin(reduceAddress)
    Vue.mixin(reduceUint)
    Vue.mixin(amountToPrice)
    Vue.mixin(toFixed)
    Vue.mixin(sleep)
    Vue.mixin(loadWallet)
    Vue.mixin(chamgePaymentToken)
    Vue.mixin(mulDecimal)
    Vue.mixin(toUint)
    Vue.mixin(toWei)
    Vue.mixin(nftPrice)

    Vue.mixin(lang)
    Vue.mixin(payTokens)
  }
}
