import {mapGetters,mapState,mapActions} from "vuex";


export default {
  data(){
    return {
      selectedNet : null
    }
  },
  computed: {
    Tokens(){
      if(this.selectedNet == null){
        return this.storePayTokens
      }

      let netPayTokens = []
      for (const storePayTokensKey in this.storePayTokens) {
        let payToken = this.storePayTokens[storePayTokensKey]
        if(payToken.net != this.selectedNet.symbol){
          continue
        }

        netPayTokens.push(payToken)
      }
      return netPayTokens
    },
    ...mapState('payTokens', {
      storePayTokens : 'payTokens'
    }),
  },
  methods:{

  }
}
