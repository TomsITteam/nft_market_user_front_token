import {mapGetters} from "vuex";

export default {
  computed : {
    ...mapGetters([
      'getMyCollection'
    ]),
  },
  props:{
    collectionData : {
      type : Object
    }
  },
  watch:{
    collectionData(val){
      this.changeCollectionData(val)
    }
  },
  data(){
    return {
      loading : {
        profileSubmit : false,
      },
      formData:{
        name : "",
        nick : "",
        description : "",
        website : "",
        blog : "",
        twitter : "",
        Instagram : ""
      },
    }
  },
  methods:{
    changeCollectionData(val){
      this.formData.name = val.name
      this.formData.nick = val.nick
      this.formData.description = val.description

      this.formData.website = val.website!=undefined?val.website:""
      this.formData.blog = val.blog_url!=undefined?val.blog_url:""
      this.formData.Instagram = val.instagram_url!=undefined?val.instagram_url:""
      this.formData.twitter = val.twitter_url!=undefined?val.twitter_url:""
    },
    profileSaveSubmit(event){
      event.preventDefault()
      this.profileSave()
    },

    async profileSave(){
      if(this.loading.profileSubmit == true){
        return
      }

      this.loading.profileSubmit = true

      let result = await this.$api.updateProfile({
        data : {

          website_url : this.formData.website,
          blog_url : this.formData.blog,
          twitter_url : this.formData.twitter,
          instagram_url : this.formData.Instagram,

          name : this.formData.name,
          nick : this.formData.nick,
          description : this.formData.description
        }
      })

      this.loading.profileSubmit = false
      if(result == false) {
        return
      }else if(result.error != undefined){
        alert(result.error.message)
        return
      }

      alert(this.$t('collection.has_been_saved'))
      this.loading.profileSubmit = false
    }
  },
  created() {
    document.title = this.$t('collection.setting') + " | " + this.$env.VUE_APP_NAME

    if(this.collectionData == undefined)
      return

    this.changeCollectionData(this.collectionData)
  }
}
