export default {
  methods:{
    toFixed(number){
      number = '' + number
      number = number.split(".")
      if(number.length > 1 && number[1] == 0){
        return number[0]
      }else if(number.length > 1){
        return `${number[0]}.${number[1].substr(0,5)}`
      }

      return number[0]
    },
  }
}
