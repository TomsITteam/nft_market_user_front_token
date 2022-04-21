<template>
  <div>
    <section id=sec_02>


      <div class="last_sec pb-4">
        <div class="last_sec_content m-auto overflow-hidden">
            <h3 class="title_01 mb-4">{{ $t('home.ending_soon') }}</h3>

            <div class="w-100">
              <b-skeleton-wrapper :loading="loading.activeEndingData">
                <template #loading>
                  <b-row class="pl-0 pr-0">
                    <div class="d-none col-12 col-sm-6 col-lg-4 col-xl-3" v-for="n in 4"
                         v-bind:class="{
                      'd-xl-block' : n==4,
                      'd-lg-block' : n==3,
                      'd-sm-block' : n==2,
                      'd-block' : n==1
                    }"
                    >
                      <div class="card">
                        <div class="mb-4">
                          <b-skeleton-img height="200px"></b-skeleton-img>
                        </div>
                        <div class="mb-1">
                          <b-skeleton width="70%" height="20px"></b-skeleton>
                        </div>
                        <div class="mb-1">
                          <b-skeleton width="60%" height="20px"></b-skeleton>
                        </div>
                        <div class="mb-1">
                          <b-skeleton width="50%" height="20px"></b-skeleton>
                        </div>
                      </div>
                    </div>
                  </b-row>
                </template>
                <div  v-if="activeEndingData.length > 0">
                  <swiper class="d-none d-lg-block" :options="swiperOptions">
                    <swiper-slide  v-for="item in activeEndingData" style="width: 310px">
                        <NftItem :nft="item"></NftItem>
                    </swiper-slide>
                  </swiper>

                  <swiper class="d-none d-md-block d-lg-none" :options="swiperOptions">
                    <swiper-slide  v-for="item in activeEndingData" style="width: 280px">
                        <NftItem :nft="item"></NftItem>
                    </swiper-slide>
                  </swiper>

                  <swiper class="d-block d-md-none" :options="swiperOptions">
                    <swiper-slide  v-for="item in activeEndingData" style="width: 250px">
                        <NftItem :nft="item"></NftItem>
                    </swiper-slide>
                  </swiper>
                </div>
                <div v-else class="pt-5 pb-5">
                  <img class="d-block m-auto" src="/img/01Sub_empty-1.png"/>
                  <p class="text-center big-size-2 mb-4">{{ $t('home.there_auction') }}</p>
                  <b-button class="but-created d-block base-font-weight" variant="primary" v-on:click="gotoCreated">{{ $t('home.create_an_auction') }}</b-button>
                </div>
              </b-skeleton-wrapper>
            </div>

        </div>
      </div>
    </section>
  </div>
</template>

<script>
import NftItem from "../../Components/NftItem";
import basicEndAuction from '@/mixins/Home/Components/EndAuction'
export default {
  name: "EndAuction",
  mixins:[
    basicEndAuction
  ],
  components: {
    NftItem
  },
}
</script>

<style scoped>

</style>
