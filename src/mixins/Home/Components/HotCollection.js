export default {
  data(){
    return {
      loading:{
        hotCollectionData : true,
      },
      hotCollectionData : [],
      swiperOptions: {
        navigation : true,
        slidesPerView: 'auto',
        spaceBetween : 0,
        freeMode: true,
      },
      maxWidth: 1,
      max: true,
      limitHotCollection : 4
    }
  },
  methods:{

    async hotCollection(){
      this.loading.hotCollectionData = true
      let result = await this.$api.hotCollection({
        data : {
          minNFT : 4
        }
      })

      for (var index in result) {
        let images = await this.collectionCreatedNFT({
          address : result[index].address,
          data:{
            offset  : 0,
            limit : 4
          }
        })

        result[index].images = images.data
      }
      this.hotCollectionData = result
      this.loading.hotCollectionData = false
    },
    totalWidth() {
      if(document.documentElement.scrollWidth <= 700){
        this.maxWidth = 1
      } else {
        this.maxWidth = 3
        this.max = false
      }
    }
  },
  created() {
    this.hotCollection()
    this.totalWidth()
  },
  mounted() {
    window.addEventListener('resize', this.totalWidth)
  },
  unmounted() {
    window.removeEventListener('resize', this.totalWidth)
  },
}
