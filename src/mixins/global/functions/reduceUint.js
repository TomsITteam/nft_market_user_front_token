export default {
  methods:{
    reduceUint(number){
      if(number >= 100000000){
        return (number / 100000000) + "B"
      }else if(number >= 1000000){
        return (number / 1000000) + "M"
      }else if(number >= 1000){
        return (number /1000) + "K"
      }

      return number
    },
  }
}
