export default {
  props:{
    author : {
      type : Object
    }
  },
  computed:{
    coverStyle(){
      if(!this.author.cover_image){
        return ""
      }

      return `background: url(${this.author.cover_image}) center center / cover no-repeat`
    }
  },
  data(){
    return {
      swiperOptions: {
        slidesPerView: 'auto',
        spaceBetween : 20,
        freeMode: true,
      }
    }
  },
}
