export default {
  props:{
    item : {
      type : Object
    }
  },
  data(){
    return {
      loading : {
        like : false
      },
      collectionData : null
    }
  },
  computed:{
    coverStyle(){
      if(!this.collectionData.cover_image){
        return ""
      }

      return `background: url(${this.collectionData.cover_image}) center center / cover no-repeat`
    }
  },
  created() {
    this.collectionData = this.item
  }
}
