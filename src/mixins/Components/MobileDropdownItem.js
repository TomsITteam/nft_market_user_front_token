export default {
  props:{
    text : {
      type : String
    },
    items : {
      type : Array,
      default : null
    },
    subMenu : {
      type : String,
      default : ''
    }
  },
  data(){
    return {
      isOpen : false
    }
  },
  methods:{
    isExternalLink(link){
      if(link.substr(0,7) == "http://" || link.substr(0,8) == "https://"){
        return true
      }

      return false
    },
    open(is){
      this.isOpen = is;
    }
  }
}
