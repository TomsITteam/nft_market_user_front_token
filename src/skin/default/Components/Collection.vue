<template>
  <div style="position: relative;width: 100%;">
    <div class="collec_mini">
      <router-link class="d-block media__big__link" :to="'/nft/' + collectionData.images[0].id" :alt="collectionData.images[0].name">
        <img v-if="collectionData.images[0].image_url" :src="collectionData.images[0].image_url" class="media" :alt="collectionData.images[0].name" >
        <video v-else :src="collectionData.images[0].video_url" class="media" webkit-playsinline playsinline autoplay loop muted="muted"/>
        <div class="collection_gradation"></div>
      </router-link>
      <div class="collec_mini_2 d-flex">
        <router-link class="image-item col-4 p-0" v-for="n in 3" :to="'/nft/' + collectionData.images[n].id" :alt="collectionData.images[n].name">
          <img v-if="collectionData.images[n].image_url" :src="collectionData.images[n].image_url" :alt="collectionData.images[n].name">
          <video v-else :src="collectionData.images[n].video_url" class="media" webkit-playsinline playsinline autoplay loop muted="muted"/>
        </router-link>
      </div>
    </div>
    <div class="coll_user_box">
      <router-link class="d-flex align-items-center" :to="'/profile/' + collectionData.address">
        <span class="position-relative d-block" v-bind:class="{ 'asset__action--verified' : collectionData.auth }">
          <img class="border-radius-50 mr-2" :src="collectionData.avatar_image" width="45px" height="45px">
        </span>
        <span class="nick">{{ collectionData.name }}</span>
      </router-link>
      <button class="heart_k card__likes text-white" @click="liked(collectionData.address)" type="button" style="height: 20px;">
        <i class="fal fa-heart mr-1"></i>
        <b-spinner small v-if="loading.liked"></b-spinner>
        <span class="text-white" v-else>
            {{ (collectionData.like_count) }}
          </span>
      </button>
    </div>
  </div>
</template>

<script>
import mixCollection from "../../../mixins/collection";
import Collection from '@/mixins/Components/Collection'

export default {
  name: "Collection",
  mixins:[mixCollection, Collection],

}
</script>

<style scoped>

</style>
