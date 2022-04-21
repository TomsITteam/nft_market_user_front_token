export default {
  computed:{
    allowedLayerUploadWallet(){
      let addresses = this.$env.VUE_APP_UPLOAD_FILTER_LAYER.toLowerCase().split(",")
      for (var address of addresses){
        if(address == this.$wallet.getWallet().getAccount()){
          return true
        }
      }

      return false
    },
    selectCategory(){
      if(this.formData.category == ""){
        return this.$t('collection.select_category')
      }

      for(var key in this.$env.VUE_APP_CATEGORY){
        if(this.$env.VUE_APP_CATEGORY[key].name == this.formData.category){
          return this.$env.VUE_APP_CATEGORY[key].value
        }
      }

      return ""
    }
  },
  props:{
    collectionData : Object
  },
  data(){
    return {
      loading : false,

      previewImage : null,
      previewVideo : null,
      previewThumbnail : null,
      formData : {
        file : null,
        thumbnail : null,
        category : "",
        name : "",
        description : ""
      },
      tab : false
    }
  },
  methods:{
    changeCategory(category){
      this.formData.category = category
    },
    onChangeFile(event){
      if(event.target.files.length == 0){
        return
      }

      let file = event.target.files[0]
      if(file.type == 'video/mp4') {
        this.previewVideo = URL.createObjectURL(file);
      }else {
        this.previewImage = URL.createObjectURL(file);
      }

      this.formData.file = file
    },
    onChangeThumbnail(event){
      if(event.target.files.length == 0){
        return
      }

      let file = event.target.files[0]
      this.previewThumbnail = URL.createObjectURL(file);

      this.formData.thumbnail = file
    },
    onSubmit(event){
      event.preventDefault()

      this.createdNft()
    },
    async createdNft(){
      if(this.formData.file == null){
        alert(this.$t('collection.upload_file'))
        return
      }
      if(this.loading == true) {
        return
      }

      this.loading = true
      let result = await this.$api.createdNFT({
        data : {
          nft_file        : this.formData.file,
          nft_thumbnail        : this.formData.thumbnail,
          nft_category        : this.formData.category,
          nft_name       : this.formData.name,
          nft_description : this.formData.description,
        }
      })
      this.loading = false
      if(result == false){
        return
      }else if(result.error != undefined){
        alert(result.error.message)
        return
      }

      this.$router.push({
        name : "Nft",
        params: { nft_id: result.id }
      })
    }
  },
  created() {
    document.title = this.$t('collection.create_nft') + " | " + this.$env.VUE_APP_NAME
  }
}
