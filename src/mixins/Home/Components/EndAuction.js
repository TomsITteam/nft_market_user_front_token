export default {
  data(){
    return {
      loading:{
        activeEndingData : true,
      },
      activeEndingData : [],
      swiperOptions: {
        slidesPerView: 'auto',
        spaceBetween : 0,
        freeMode: true,
      }
    }
  },
  methods:{
    async auctionEnding(){
      this.loading.activeEndingData = true
      let result = await this.$api.auctionEnding({
        data : {}
      })

      this.activeEndingData = result
      this.loading.activeEndingData = false
    },
  },
  created() {
    this.auctionEnding()
  }
}
