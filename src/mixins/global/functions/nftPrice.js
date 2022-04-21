export default {
  methods:{
    nftPrice(net,amount){
      let price = parseInt(this.amountToPrice(net,amount))

      return price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    },
  }
}
