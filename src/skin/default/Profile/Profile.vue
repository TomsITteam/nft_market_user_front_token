<template>
  <main class="main">
    <div id="mypage">
      <div class="my_imgbox d-flex justify-content-center align-items-end" v-bind:style="coverObject">
        <span v-if="$wallet.getWallet().getAccount() == $route.params.address">
          <input ref="coverFile" class="d-none" type="file" v-on:change="onChangeCoverFile" accept=".png,.jpg,.jpeg"/>
          <b-button v-bind:class="{ disabled : loading.cover }" class="but-cover-update" @click="$refs.coverFile.click()" v-b-tooltip.hover :title="$t('collection.cover_upload')">
            <b-spinner small v-if="loading.cover"></b-spinner>
            <i v-else class="fas fa-camera"></i>
          </b-button>
        </span>

        <b-button v-if="!loading.collectionData" @click="liked(collectionData.address)" class="d-inline-block d-lg-none" variant="white-outline" style="height: 44px;position: absolute;top: 25px;right:15px;" v-bind:class="{  disabled : loading.liked , active : collectionData.like }">
          <i class="fas fa-heart mr-1" style="color:#ff34c3;"></i>
          Like
          <b-spinner small v-if="loading.liked"></b-spinner>
          <template v-else>{{ collectionData.like_count }}</template>
        </b-button>

        <div class="my_profile">
          <div class="user_my">
            <div v-if="loading.collectionData || loading.avatar">
              <b-skeleton class="d-none d-sm-block" type="avatar"  width="165px" height="165px"></b-skeleton>
              <b-skeleton class="d-block d-sm-none" type="avatar"  width="100px" height="100px"></b-skeleton>
            </div>
            <div class="border-radius-50 position-relative" v-else  v-bind:class="{ 'asset__action--verified' : collectionData.auth }">
              <span v-if="$wallet.getWallet().getAccount() == $route.params.address">
                  <input ref="avatarFile" class="d-none" type="file" v-on:change="onChangeAvatarFile" accept=".png,.jpg,.jpeg"/>
                  <b-button class="border-radius-50" variant="avatar__upload" @click="$refs.avatarFile.click()">
                    <i class="fas fa-camera text-white"></i>
                  </b-button>
              </span>
              <img class="border-radius-50" width="165px" height="165px" :src="collectionData.avatar_image" :alt="collectionData.name">
            </div>

          </div>
          <div class="user_myname">
            <b-skeleton v-if="loading.collectionData" width="100px" height="20px"></b-skeleton>
            <h3 v-else>{{ collectionData.name }}</h3>
            <b-skeleton v-if="loading.collectionData" width="80px" height="17px"></b-skeleton>
            <a v-else>@{{ collectionData.nick }}</a>
          </div>

          <div v-if="loading.collectionData" class="ml-auto d-flex">
            <b-skeleton class="d-none d-sm-block mr-2" type="avatar"  width="45px" height="45px"></b-skeleton>
            <b-skeleton class="d-none d-sm-block mr-2" type="avatar"  width="45px" height="45px"></b-skeleton>
            <b-skeleton class="mr-2" type="avatar"  width="45px" height="45px"></b-skeleton>
          </div>
          <div v-else class="ml-auto d-flex">
            <b-button  @click="copyToClipboard" class="d-none d-lg-inline-block mr-4" variant="white-outline" style="height: 44px">
              {{ reduceAddress(collectionData.address) }}
              <i class="ml-2 far fa-clone text-white"></i>
            </b-button>
            <b-button  @click="liked(collectionData.address)" class="d-none d-lg-inline-block mr-4" variant="white-outline" style="height: 44px" v-bind:class="{  disabled : loading.liked , active : collectionData.like }">
              <i class="fas fa-heart mr-1" style="color:#ff34c3;"></i>
              Like
              <b-spinner small v-if="loading.liked"></b-spinner>
              <template v-else>{{ collectionData.like_count }}</template>
            </b-button>
            <b-dropdown variant="white-outline" toggle-class="btn-link-dropdown" no-caret v-if="!!collectionData.website || !!collectionData.twitter_url || !!collectionData.instagram_url || !!collectionData.blog_url">
              <template #button-content >
                <i class="fas fa-link text-white"></i>
              </template>
              <b-dropdown-item v-if="!!collectionData.website" :href="collectionData.website" target="_blank"><i class="fas fa-external-link-square-alt mr-2"></i>{{ $t('collection.website') }}</b-dropdown-item>
              <b-dropdown-item v-if="!!collectionData.twitter_url" :href="collectionData.twitter_url" target="_blank"><i class="fab fa-twitter mr-2"></i> {{ $t('collection.twitter') }}</b-dropdown-item>
              <b-dropdown-item v-if="!!collectionData.instagram_url" :href="collectionData.instagram_url" target="_blank"><i class="fab fa-instagram mr-2"></i> {{ $t('collection.instagram') }}</b-dropdown-item>
              <b-dropdown-item v-if="!!collectionData.blog_url" :href="collectionData.blog_url" target="_blank"><i class="fab fa-blogger-b mr-2"></i> {{ $t('collection.blog') }}</b-dropdown-item>
            </b-dropdown>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="my_intro">
          <div class="mb-4" v-if="loading.collectionData || loading.avatar">
            <b-skeleton class="d-block" width="50%" height="15px"></b-skeleton>
            <b-skeleton class="d-block" width="30%" height="15px"></b-skeleton>
            <b-skeleton class="d-block" width="20%" height="15px"></b-skeleton>
          </div>
          <p v-else>{{ collectionData.description }}</p>
        </div>
      </div>


      <router-view :collectionData="collectionData"></router-view>


    </div>
  </main>
</template>

<script>
import mixCollection from "../../../mixins/collection";
import Profile from "@/mixins/Profile/Profile";

export default {
  name: "Profile",
  mixins:[mixCollection, Profile],
}
</script>

<style scoped>

</style>
