<template>
  <div class="slide_line container">
    <b-row>
      <div class="col-12 mb-4 mb-xl-0 col-xl-4 all_slide">
        <div class="user_slide_p mr-4"  v-bind:class="{ 'asset__action--verified' : author.auth }">
          <img class="border-radius-50" :src="author.avatar_image" :alt="author.name" width="85px" height="85px"  alt="user_big">
        </div>

        <div class="user_text_p">
          <strong>{{ author.name }}</strong>
          <router-link :to="'/profile/' + author.address" >@{{ author.nick }}</router-link>
          <p>{{ author.description }}</p>
        </div>
      </div>

      <div class="col-12 col-xl-8">
          <swiper  class="d-none d-sm-block" :options="swiperOptions">
            <swiper-slide v-for="item in author.images"   class="swiper-slide"  style="width: 230px">
              <router-link class="author__image__link" :to="'/nft/' + item.id" :alt="item.name">
                <video v-if="item.video_url" :src="item.video_url" class="border-radius-10 media" webkit-playsinline playsinline autoplay loop muted="muted"/>
                <img v-else class="border-radius-10" :src="item.image_url" :alt="item.name" style="width: 100%">
              </router-link>
            </swiper-slide>
          </swiper>
          <swiper  class="d-block d-sm-none" :options="swiperOptions">
            <swiper-slide v-for="item in author.images" class="swiper-slide"  style="width: 170px">
              <router-link class="author__image__link" :to="'/nft/' + item.id" :alt="item.name">
                <video v-if="item.video_url" :src="item.video_url" class="border-radius-10 media" webkit-playsinline playsinline autoplay loop muted="muted"/>
                <img v-else class="border-radius-10" :src="item.image_url" :alt="item.name" style="width: 100%">
              </router-link>
            </swiper-slide>
          </swiper>
      </div>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "Author",
  props:{
    author : {
      type : Object
    }
  },
  computed:{
    coverStyle(){
      if(!this.author.cover_image){
        return ""
      }

      return `background: url(${this.author.cover_image}) center center / cover no-repeat`
    }
  },
  data(){
    return {
      swiperOptions: {
        slidesPerView: 'auto',
        spaceBetween : 20,
        freeMode: true,
      }
    }
  },
}
</script>

<style scoped>

</style>
