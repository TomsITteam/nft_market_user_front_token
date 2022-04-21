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
        phone : "",
        description : "",
      }
    }
  },
  methods:{
    changeCollectionData(val){


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

      let result = await this.$api.applyAuth({
        data : {
          name : this.formData.name,
          phone : this.formData.phone,
          email : this.formData.email,
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

      alert(this.$t('collection.apply_alert'))
      this.loading.profileSubmit = false
    }
  },
  created() {
    document.title = this.$t('collection.apply_title') + " | " + this.$env.VUE_APP_NAME

    if(this.collectionData == undefined)
      return

    this.changeCollectionData(this.collectionData)
  }
}
