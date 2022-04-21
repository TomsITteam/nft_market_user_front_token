import Vue from 'vue';
import VueRouter from 'vue-router';

const routesData = require.context(
  './',
  false,
  /\.js$/
)

let routes = {}

routesData.keys().forEach(fileName => {
  if(fileName === './' + process.env.VUE_APP_SKIN_NAME + '.js') {
    const data = routesData(fileName)
    routes = data.default || data
  }
})

import store from "../store";
import wallet from "../wallet";
import wallets from "@/wallets";

Vue.use(VueRouter);

const router = new VueRouter({
    mode : 'history',
    routes,
    linkActiveClass: 'active',
    scrollBehavior: (to, from ,savedPosition) => {
        if (savedPosition) {
            return savedPosition;
        }
        if (to.hash) {
            return { selector: to.hash };
        }
        return { x: 0, y: 0 };
    },

});

router.beforeResolve((to,from,next) => {
  let storage = wallets.getStorage();

  if(storage.connection.conn == true && window.ethereum !== undefined){
    wallet.getWallet().checkConnect() // 로그인 시키기
  }

  next()
})

router.gotoCreated = () => {
  if(wallet.getWallet().isDownload() == false){
    return
  }

  if(wallet.getWallet().isConnect() == false || wallet.getWallet().getAccount() == undefined){
    wallet.getWallet().connectWallet()
    return
  }
  router.push({
    name : "Create",
    params : {
      address : wallet.getWallet().getAccount()
    }
  })
}

export default router;
