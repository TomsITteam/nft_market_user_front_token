<template>
  <div class="collec_sec pb-4">
    <div class="collec_sec_content m-auto">
      <h3 class="sub_title">{{ $t('home.hot_collection') }}</h3>
      <div class="mySwiper swiper2">
        <b-skeleton-wrapper :loading="loading.hotCollectionData">
          <template #loading>
            <b-row>
              <b-col class="d-none col-12 col-sm-6 col-lg-4" v-for="n in 3"
                     v-bind:class="{
                      'd-lg-block' : n==3,
                      'd-sm-block' : n==2,
                      'd-block' : n==1
                    }"
              >
                <div class="card">
                  <div class="mb-4">
                    <b-skeleton height="130px"></b-skeleton>
                    <div class="mb-3">
                      <div style="width:50px;margin:-30px auto 0;">
                        <b-skeleton type="avatar" width="50px" height="50px"></b-skeleton>
                      </div>
                    </div>
                    <div class="mb-4">
                      <div class="" style="width:25%;margin:auto;">
                        <b-skeleton height="20px"></b-skeleton>
                      </div>
                    </div>
                    <div class="mb-2"><div style="width:70%;margin:auto;"><b-skeleton height="14px"></b-skeleton></div></div>
                    <div class="mb-2"><div style="width:50%;margin:auto;"><b-skeleton height="14px"></b-skeleton></div></div>
                    <div class="mb-2"><div style="width:30%;margin:auto;"><b-skeleton height="14px"></b-skeleton></div></div>
                  </div>
                </div>
              </b-col>
            </b-row>
          </template>
          <swiper ref="hotCollecSwiper" class="d-none d-lg-block" :options="swiperOptions">
            <swiper-slide v-for="item in hotCollectionData" style="width: 420px">
              <Collection :item="item"/>
            </swiper-slide>
          </swiper>
          <swiper class="d-none d-md-block d-lg-none" :options="swiperOptions">
            <swiper-slide v-for="item in hotCollectionData" style="width: 350px">
              <Collection :item="item"/>
            </swiper-slide>
          </swiper>
          <swiper class="d-block d-md-none" :options="swiperOptions">
            <swiper-slide v-for="item in hotCollectionData" style="width: 300px">
              <Collection :item="item"/>
            </swiper-slide>
          </swiper>
        </b-skeleton-wrapper>
      </div>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import Collection from '../../Components/Collection';
import mixCollection from "@/mixins/collection";

export default {
  name: "HotCollection",
  mixins : [
    mixCollection
  ],
  components: {
    Carousel,
    Slide,
    Collection,
  },
  data(){
    return {
      loading:{
        hotCollectionData : true,
      },
      hotCollectionData : [],
      swiperOptions: {
        slidesPerView: 'auto',
        spaceBetween : 20,
        freeMode: true,
      }
    }
  },
  methods:{

    async hotCollection(){
      this.loading.hotCollectionData = true
      let result = await this.$api.hotCollection({
        data : {
          minNFT : 4
        }
      })

      for (var index in result) {
        let images = await this.collectionCreatedNFT({
          address : result[index].address,
          data:{
            offset  : 0,
            limit : 4
          }
        })

        result[index].images = images.data
      }
      this.hotCollectionData = result
      this.loading.hotCollectionData = false
    },

  },
  created() {
    this.hotCollection()
  }
}
</script>

<style scoped>

</style>
