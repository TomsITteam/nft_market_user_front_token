import {mapGetters} from "vuex";
import kilp from "@/wallet/klip";
import wallets from "@/wallets";

export default {
  watch: {
    '$route' (to, from) {
      this.activeHeaderMenu(false)
    }
  },
  asyncComputed:{
    ...mapGetters('collection',[
      'getMyCollection',
    ]),
    ...mapGetters('wallet',[
      'connectedWallet'
    ])
  },
  computed:{
    deepLink(){
      return "https://metamask.app.link/dapp/" + window.location.hostname
    },
    connectedWalletAvatar(){
      if(this.connectedWallet == null || this.connectedWallet == false || this.getMyCollection == null){
        return "/img/profile.svg"
      }

      return this.getMyCollection.avatar_image
    },
    connectedWalletName(){
      if (wallets.isMultiWallet()){
        let net = wallets.getWalletName()
        this.walletNet = wallets.multiWalletNet()
      }
      if(this.connectedWallet == null || this.connectedWallet == false){
        let name = wallets.getStorage().serviceInfo.address;
        if (name != "" || name != undefined || name != null){
          return name;
        }
        return ""
      }else if(this.getMyCollection != null){
        return this.getMyCollection.name
      }

      return this.connectedWallet.name
    },
    connectedWalletBalance(){
      if(this.connectedWallet == null || this.connectedWallet == false){
        return ""
      }
      return this.connectedWallet.balance
    },
    connectedWalletAuth(){
      if(this.connectedWallet == null || this.connectedWallet == false){
        return false
      }else if(this.getMyCollection == null){
        return false
      }

      return this.getMyCollection.auth
    },
    menuCategoryItems(){
      let arr = []
      arr.push({
        link : "/explorer/all",
        name : "🎨 " + this.$t('header.all')
      })

      for(var item of this.$env.VUE_APP_CATEGORY){
        arr.push({
          link : "/explorer/" + item.name,
          name : item.value
        })

      }

      return arr
    }
  },
  data(){
    return {
      active : {
        headerSearch : false,
        headerMenu : false,
        headerSubmenu: '',
      },
      formData : {
        q : ""
      },
      menuAuthorItems:[
        {
          link : "/authors/all",
          name : this.$t('header.all'),
          icon : "fas fa-regular fa-palette"
        },
        {
          link : "/authors/auth",
          name : this.$t('header.certified_creator'),
          icon : "fas fa-solid fa-clipboard-check"
        },
        {
          link : "/authors/unauth",
          name : this.$t('header.uncertified_creator'),
          icon : "fas fa-solid fa-clipboard"
        }
      ],
      menuContactItems:[
        {
          link : "/contacts",
          name : this.$t('header.contact_us'),
          icon : "fas fa-solid fa-question"
        },
        {
          link : "/help",
          name : this.$t('header.faq'),
          icon : "fas fa-solid fa-comments"
        },
        {
          link : "/service",
          name : this.$t('header.terms_of_service'),
          icon : "fas fa-solid fa-file-contract"
        },
        {
          link : "/privacy",
          name : this.$t('header.privacy_policy'),
          icon : "fas fa-solid fa-lock"
        }
      ],
      qrcode : "https://klipwallet.com/?target=/a2a?request_key=",
      interval1 : Function,
      walletNet : "",
      scroll: false,
      widthScroll: true,
    }
  },
  methods: {
    isMobileWeb() {
      let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

      if (this.$env.VUE_APP_BASE_WALLET == 'METAMASK' && isMobile == true && window.ethereum == undefined) {
        return true
      }

      return false
    },
    isMobile() {
      let ios = /iPhone|iPad/i.test(navigator.userAgent)
      let android = /Android/i.test(navigator.userAgent)
      if (ios == true || android == true) {
        return true
      }

      return false
    },
    activeHeaderSearch(active) {
      this.active.headerSearch = active
    },
    activeHeaderMenu(active) {
      this.active.headerMenu = active
    },
    onSerachSubmit(event) {
      event.preventDefault()

      this.$router.push({
        name: "ExplorerNfts",
        params: {
          tab: 'search'
        },
        query: {
          q: this.formData.q
        }
      })
    },

    async connectWallet() {
      if (wallets.isMultiWallet()) {

        this.changeWallet();

      }else{

        if (this.$wallet.getWallet().isDownload() == false) {
          return
        }

        let address = await this.$wallet.getWallet().connectWallet()

      }

    },

    changeWallet() {
      this.$bvModal.show("bv-modal-multi-wallet");
    },

    walletName(net) {
      this.walletNet = net;
      let json = wallets.getStorage();
      json.serviceInfo.netName = net;
      wallets.setStorage(json);
    },

    openWalletModal() {
      let conn = wallets.getStorage();

      if (conn.connection.conn == true && this.isMobile() == false ) {
        return false;
      }else if(this.isMobile() == true && window.ethereum != undefined){
        this.loadWallet("METAMASK")
        return false;
      }

      this.changeWallet();
    },

    openKlipModal() {
      // 로그인 창 request_key 발급 -> this.qrcode로 prop전달
      if (wallets.getWalletName() == "KLIP") {
        this.$bvModal.show("bv-modal-klip-wallet");
      }

    },
    async kilpConnect() {

      let res = await kilp.createRequestKey();
      this.qrcode = "https://klipwallet.com/?target=/a2a?request_key=" + res // pc
      // kakaotalk://klipwallet/open?url=https://klipwallet.com/?target=/a2a?request_key=... // ios
      // intent://klipwallet/open?url=https://klipwallet.com/?target=/a2a?request_key=...#Intent;scheme=kakaotalk;package=com.kakao.talk;end // android
      return this.qrcode;
    },
    headerScroll(){
      if(document.documentElement.scrollWidth >= 750){
        this.widthScroll = true
        this.active.headerSubmenu = ''
        this.active.headerMenu = false
      } else if (document.documentElement.scrollWidth >= 750 && document.documentElement.scrollTop == 0) {
        this.widthScroll = true
        this.scroll = true
        this.active.headerSubmenu = ''
        this.active.headerMenu = false
      } else {
        this.widthScroll = false
        this.scroll = false
      }

      if (document.documentElement.scrollWidth > 750)
        this.scroll = document.documentElement.scrollTop != 0;

    },
    activeHeaderSubmenu(active){
      if(this.active.headerSubmenu == active)
        this.active.headerSubmenu = ''
      else
        this.active.headerSubmenu = active
    },

  },
  mounted() {
    this.openWalletModal()
    document.addEventListener('scroll', this.headerScroll)
    window.addEventListener('resize', this.headerScroll)
  },
  unmounted() {
    document.removeEventListener('scroll', this.headerScroll)
    window.removeEventListener('resize', this.headerScroll)
  },
  created() {
    this.headerScroll()
  }
}
