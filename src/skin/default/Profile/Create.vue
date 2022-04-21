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
              <b-row>
                <b-col v-bind:class="{ 'col-6':previewVideo != null }">
                  <div class="input__file__upload mb-4">
                    <div class="no__file_select" v-if="previewImage == null && previewVideo == null">
                      <img src="/img/file_photo.png" alt="file_photo">
                    </div>
                    <img  class="select__file__image"  v-if="previewImage != null" :src="previewImage" style="max-width: 100%"/>
                    <video  class="select__file__video" v-if="previewVideo != null" :src="previewVideo" autoplay loop muted="muted" style="max-width: 100%;border-radius: 16px"/>
                    <input id="nft-file" type="file" accept="video/mp4,video/x-m4v,video/*,.png,.jpg,.jpeg" v-on:change="onChangeFile">
                  </div>

                </b-col>
                <b-col class="d-none col-6" v-bind:class="{ 'd-block':previewVideo != null }">
                  <div class="input__file__upload mb-4">
                    <div class="no__file_select" v-if="previewThumbnail == null">
                      <img class="mb-3" src="/img/file_photo.png" alt="file_photo" style="max-width:100px;">
                      <span class="d-block" style="font-size: 14px;color:#333;">썸네일을 선택해주세요</span>
                    </div>
                    <img  class="select__file__image"  v-if="previewThumbnail != null" :src="previewThumbnail" style="max-width: 100%"/>
                    <input id="nft-file-thumbnail" type="file" accept=".png,.jpg,.jpeg" v-on:change="onChangeThumbnail">
                  </div>

                </b-col>
              </b-row>
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
import Create from "@/mixins/Profile/Create";

export default {
  name: "Create",
  mixins: [Create],
}
</script>

<style scoped>
.filebox .upload-name {
  display: inline-block;
  height: 40px;
  padding: 0 10px;
  vertical-align: middle;
  border: 1px solid #dddddd;
  width: 78%;
  color: #999999;
}
.filebox label {
  display: inline-block;
  padding: 10px 20px;
  color: #fff;
  vertical-align: middle;
  background-color: #999999;
  cursor: pointer;
  height: 40px;
  margin-left: 10px;
}
.filebox input[type="file"] {
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
}
</style>
