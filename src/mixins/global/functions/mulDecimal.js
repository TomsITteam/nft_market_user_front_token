export default {
  methods:{
    mulDecimal(value,decimal) {
      let valueSplit = value.toString(10).split(".")
      if(valueSplit.length > 1){
        decimal = decimal - valueSplit[1].length
        value = valueSplit[0] + "" + valueSplit[1]
      }

      let toDecimal = '1'
      for(var i=0;i<decimal;i++){
        toDecimal += '0'
      }

      return BigInt(value) * BigInt(toDecimal)
    },
  }
}
