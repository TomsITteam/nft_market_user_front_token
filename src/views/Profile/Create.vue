<template>
  <div>
    <div class="tabs mb-0">
      <b-container class="pb-4 not-scroll">
        <b-row class="m-0" style="width:max-content">
          <b-button class="mr-2" variant="transparency" :to="'/profile/' + this.$route.params.address + '/nfts/sale'" style="width:120px">{{ $t('collection.sale') }}</b-button>
          <b-button class="mr-2" variant="transparency" :to="'/profile/' + this.$route.params.address  + '/nfts/owner'" style="width:120px">{{ $t('collection.holding') }}</b-button>
          <b-button class="mr-2" variant="transparency" :to="'/profile/' + this.$route.params.address  + '/nfts/creator'" style="width:120px">{{ $t('collection.created') }}</b-button>
          <b-button class="mr-2" variant="transparency" v-if="this.$route.params.address == this.$wallet.getWallet().getAccount()" :to="'/profile/' + this.$route.params.address  + '/setting'" style="width:120px">{{ $t('collection.setting') }}</b-button>
        </b-row>
      </b-container>
      <div id="upload" class="pt-4">
        <div class="container pb-4">
          <div class="up_box">
            <h2>NFT {{ $t('collection.upload') }}</h2>
            <b-form @submit="onSubmit">
              <div class="input__file__upload mb-4">
                <div class="no__file_select" v-if="previewImage == null && previewVideo == null">
                  <img src="/img/file_photo.png" alt="file_photo">
                </div>


                <img  class="select__file__image"  v-if="previewImage != null" :src="previewImage" style="max-width: 100%"/>
                <video  class="select__file__video" v-if="previewVideo != null" :src="previewVideo" autoplay loop muted="muted" style="max-width: 100%;border-radius: 16px"/>


                <input id="nft-file" type="file" accept="video/mp4,video/x-m4v,video/*,.png,.jpg,.jpeg" v-on:change="onChangeFile">

              </div>
              <div class="tabs">
                <b-dropdown :text="selectCategory" class="text-left w-100 mb-4" toggle-class="sign__input text-left w-100 bg-white" menu-class="top-0" >
                <span v-for="n in $env.VUE_APP_CATEGORY.length" >
                  <b-dropdown-item @click="changeCategory($env.VUE_APP_CATEGORY[n-1].name)">{{ $env.VUE_APP_CATEGORY[n-1].value }}</b-dropdown-item>
                  <b-dropdown-divider v-if="n != $env.VUE_APP_CATEGORY.length"></b-dropdown-divider>
                </span>
                </b-dropdown>


                <div class="tab_content d-block" >
                  <div class="mb-3">
                    <input  v-model="formData.name" :placeholder="$t('collection.nft_subject')" required type="text" class="form-control w-100 border-0 border-radius-10 p-3" id="exampleFormControlInput1">
                  </div>
                  <div class="mb-3">
                    <textarea v-model="formData.description" :placeholder="$t('collection.nft_description')"  required class="form-control w-100 border-0 border-radius-10 p-3" id="exampleFormControlTextarea1"></textarea>
                  </div>
                </div>
              </div>

              <b-button class="d-block m-auto" type="submit" variant="upload" v-bind:class="{ disabled : loading }">
                <b-spinner v-if="loading"></b-spinner>
                <span v-else class="base-font-weight">{{ $t('collection.upload') }}</span>
              </b-button>
            </b-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Create",
  computed:{
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
  data(){
    return {
      loading : false,

      previewImage : null,
      previewVideo : null,
      formData : {
        file : null,
        category : "",
        name : "",
        description : ""
      }
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
</script>

<style scoped>

</style>
