import {mapGetters} from "vuex";

export default {
  computed:{
    ...mapGetters('collection',[
      'getMyCollection'
    ]),
    coverObject(){
      if(!this.collectionData || !this.collectionData.cover_image){
        return
      }

      let image = `url('${this.collectionData.cover_image}') center center / cover no-repeat`
      return {
        'background' : image
      }
    }
  },
  data(){
    return {
      loading : {
        liked : false,
        avatar : false,
        cover : false,
        collectionData : true,
      },
      collectionData : {
        avatar_image : '',
      },
    }
  },
  methods:{
    copyToClipboard(val) {
      const t = document.createElement("textarea");
      document.body.appendChild(t);
      t.value = this.collectionData.address;
      t.select();
      document.execCommand('copy');
      document.body.removeChild(t);

      alert(this.$t('collection.copy'))
    },
    onChangeAvatarFile(event){
      if(event.target.files.length == 0){
        return
      }

      this.updateAvatar(event.target.files[0])
    },
    async updateAvatar(file){
      if(this.loading.avatar == true){
        return
      }

      this.loading.avatar = true
      let result = await this.$api.updateAvatar({
        data : {
          avatar : file
        }
      })
      this.loading.avatar = false

      if(result == false) {
        return
      }else if(result.error != undefined){
        alert(result.error.message)
        return
      }

      this.collectionData.avatar_image = result.avatar_image
    },
    onChangeCoverFile(event){
      if(event.target.files.length == 0){
        return
      }

      this.updateCover(event.target.files[0])
    },
    async updateCover(file){
      if(this.loading.cover == true){
        return
      }

      this.loading.cover = true
      let result = await this.$api.updateCover({
        data : {
          cover : file
        }
      })
      this.loading.cover = false

      if(result == false) {
        return
      }else if(result.error != undefined){
        alert(result.error.message)
        return
      }

      this.collectionData.cover_image = result.cover_image
    },
    async getCollection(address){
      if(this.getMyCollection != null && this.getMyCollection.address == address){
        this.loading.collectionData = false
        this.collectionData = this.getMyCollection
        return
      }

      this.loading.collectionData = true
      let result = await this.$api.getCollection({
        data : {
          address,
          my_address : this.$wallet.getWallet().getAccount()
        }
      })
      this.collectionData = result
      this.loading.collectionData = false
    }
  },
  beforeRouteUpdate(to,from,next){
    if(this.$route.params.address != to.params.address) {
      this.getCollection(to.params.address)
    }
    next()
  },
  created() {
    this.getCollection(this.$route.params.address)
  }
}
