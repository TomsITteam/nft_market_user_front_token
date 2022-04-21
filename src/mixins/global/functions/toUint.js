export default {
  methods:{
    toUint(number,decimals=18){
      let result = number

      for(var i=0;i<decimals;i++){
        result = result / 10
      }

      return result
    }
  }
}
