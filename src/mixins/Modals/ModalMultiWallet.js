import Web3 from "web3";
import wallets from "@/wallets";

export default {
  name: "ModalMultiWallet",
  computed:{

  },
  data(){
    return {
      loading : false,
      tx_loading : false,
      formData : {
        interface : null,
        type : "sale",
        price : 0,
        startBidPrice : 0,
        quantity : 0,
        endAuctionDate : null
      },
      publishNets : [],
      selectedNet : null
    }
  },
  methods:{
    async onSelect(item){
      this.loadWallet(item.symbol)
      this.$bvModal.hide("bv-modal-multi-wallet")
    },
    changeWalletName() {
      if (wallets.isMultiWallet()){
        this.$emit('walletName', wallets.multiWalletNet())
      }else {
        this.$emit('walletName', wallets.singleWalletNet())
      }

    }

  },
  mounted() {

  },
  created() {

  }
}
