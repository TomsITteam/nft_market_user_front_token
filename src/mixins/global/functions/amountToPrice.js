import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters('exchange', [
      'getPrice'
    ]),
  },
  methods:{
    amountToPrice(net,amount){
      if(net == undefined){
        net = ""
      }
      const mainnet = net.toLowerCase()
      if(this.getPrice == null || this.getPrice[mainnet] == undefined){
        return 0
      }

      return parseInt(this.getPrice[mainnet] * amount)
    },
  }
}
