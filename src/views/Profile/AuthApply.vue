<template>
  <div>
    <div class="tabs">
      <b-container class="pb-4 not-scroll">
        <b-row class="m-0" style="width:max-content">
          <b-button class="mr-2" variant="transparency" :to="'/profile/' + this.$route.params.address + '/nfts/sale'" style="width:120px">{{ $t('collection.sale') }}</b-button>
          <b-button class="mr-2" variant="transparency" :to="'/profile/' + this.$route.params.address  + '/nfts/owner'" style="width:120px">{{ $t('collection.holding') }}</b-button>
          <b-button class="mr-2" variant="transparency" :to="'/profile/' + this.$route.params.address  + '/nfts/creator'" style="width:120px">{{ $t('collection.created') }}</b-button>
          <b-button class="mr-2" variant="transparency" v-if="this.$route.params.address == this.$wallet.getWallet().getAccount()" :to="'/profile/' + this.$route.params.address  + '/setting'" style="width:120px">{{ $t('collection.setting') }}</b-button>
          <b-button class="mr-2 btn-primary" variant="transparency" v-if="this.$route.params.address == this.$wallet.getWallet().getAccount() && !collectionData.auth"  :to="'/profile/' + this.$route.params.address  + '/auth'" style="width:120px">{{ $t('collection.apply') }}</b-button>
        </b-row>
      </b-container>

      <div id="profile1_content" class="pt-4 pb-4">
        <b-container>
          <b-form  @submit="profileSaveSubmit">
            <b-row>
              <b-col class="col-12 mb-4">
                <label for="exampleFormControlInput1" class="form-label d-block">{{ $t('collection.name') }}</label>
                <input v-model="formData.name" type="text" class="form-control w-100 border-0 border-radius-10 p-2" id="exampleFormControlInput1" :placeholder="$t('collection.enter_name')">
              </b-col>
              <b-col class="col-12 mb-4">
                <label for="exampleFormControlInput1_2" class="form-label d-block">{{ $t('collection.phone') }}</label>
                <input v-model="formData.phone" type="text" class="form-control w-100 border-0 border-radius-10 p-2" id="exampleFormControlInput1_2" :placeholder="$t('collection.enter_phone')">
              </b-col>
              <b-col class="col-12 mb-4">
                <label for="exampleFormControlInput1_3" class="form-label d-block">{{ $t('collection.email') }}</label>
                <input v-model="formData.email" type="email" class="form-control w-100 border-0 border-radius-10 p-2" id="exampleFormControlInput1_3" :placeholder="$t('collection.enter_email')">
              </b-col>
              <b-col class="col-12 mb-4">
                <textarea v-model="formData.description" class="form-control w-100 border-0 border-radius-10 p-2" id="exampleFormControlTextarea1" rows="3" :placeholder="$t('collection.enter_introduction')" style="height: 200px"></textarea>
              </b-col>
              <b-col class="col-12">
                <b-button class="d-block m-auto"  variant="primary" type="submit" v-bind:class="{ disabled : loading.profileSubmit }" style="height: 44px;width: 120px">
                  <b-spinner v-if="loading.profileSubmit"></b-spinner>
                  <span v-else>{{ $t('collection.apply') }}</span>
                </b-button>
              </b-col>
            </b-row>
          </b-form>
        </b-container>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "AuthApply",
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
</script>

<style scoped>

</style>
