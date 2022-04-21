export default {
  methods:{
    sleep(time){
      return new Promise((resolve, reject) => {
        setTimeout(function(){
          resolve()
        },time)
      })
    },
  }
}
