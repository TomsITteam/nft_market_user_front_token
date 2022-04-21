export default {
  data(){
    return {
      selectedToken : null,
    }
  },
  methods:{
    chamgePaymentToken(token){
      this.selectedToken = token
    },
  }
}
