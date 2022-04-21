export default {
  methods:{
    reduceAddress(address){
      if(address.length > 16) {
        let last = address.substr(address.length - 10, 6)
        return address.substr(0, 6) + "...." + last
      } else
        return address
    },
  }
}
