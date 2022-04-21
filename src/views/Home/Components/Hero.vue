<template>
  <div class="pt-4 mb-4">
    <div id="main_b">
        <div class="slider-wrap con">
        <VueSlickCarousel class="slider main-slider con" v-bind="settings">
          <div class="slide-item slide-item-1">
            <div class="slide-con">
              <div class="slide-dummy"></div>
              <div class="slide-txt">
                <h2 class="txt-tt">{{ $t('home.banner_title') }}</h2>
                <p class="txt-desc">{{ $t('home.banner_text1') }}<br class="d-none d-sm-block"/>{{ $t('home.banner_text2') }}</p>
                <div class="d-flex justify-content-center txt-btn">
                  <b-button class="txt-btn-2 mr-2" variant="primary" to="/explorer"><i class="far fa-compass"></i> {{ $t('header.explorer') }}</b-button>
                  <b-button class="txt-btn-2" variant="dark" v-on:click="gotoCreated"><i class="fas fa-th-large"></i> {{ $t('header.creating_nft') }}</b-button>
                </div>
              </div>
              <picture class="img-box d-block">
                <img class="d-none d-lg-block" src="img/main_b_01.png" alt="main_b_01">
                <img class="d-block d-lg-none" src="img/main_mo01.png" alt="main_b_01">
              </picture>
            </div>
          </div>
          <div class="slide-item slide-item-2">
            <div class="slide-con">
              <div class="slide-dummy"></div>
              <div class="slide-txt">
                <h2 class="txt-tt">{{ $t('home.banner_title') }}</h2>
                <p class="txt-desc">{{ $t('home.banner_text1') }}<br class="d-none d-sm-block"/>{{ $t('home.banner_text2') }}</p>
                <div class="d-flex justify-content-center txt-btn">
                  <b-button class="txt-btn-2 mr-2" variant="primary" to="/explorer"><i class="far fa-compass"></i> {{ $t('header.explorer') }}</b-button>
                  <b-button class="txt-btn-2" variant="dark" v-on:click="gotoCreated"><i class="fas fa-th-large"></i> {{ $t('header.creating_nft') }}</b-button>
                </div>
              </div>
              <picture class="img-box d-block">
                <img class="d-none d-lg-block" src="img/main_b_01.png" alt="main_b_01">
                <img class="d-block d-lg-none" src="img/main_mo01.png" alt="main_b_01">
              </picture>
            </div>
          </div>
          <div class="slide-item slide-item-3">
            <div class="slide-con">
              <div class="slide-dummy"></div>
              <div class="slide-txt">
                <h2 class="txt-tt">{{ $t('home.banner_title') }}</h2>
                <p class="txt-desc">{{ $t('home.banner_text1') }}<br class="d-none d-sm-block"/>{{ $t('home.banner_text2') }}</p>
                <div class="d-flex justify-content-center txt-btn">
                  <b-button class="txt-btn-2 mr-2" variant="primary" to="/explorer"><i class="far fa-compass"></i> {{ $t('header.explorer') }}</b-button>
                  <b-button class="txt-btn-2" variant="dark" v-on:click="gotoCreated"><i class="fas fa-th-large"></i> {{ $t('header.creating_nft') }}</b-button>
                </div>
              </div>
              <picture class="img-box d-block">
                <img class="d-none d-lg-block" src="img/main_b_01.png" alt="main_b_01">
                <img class="d-block d-lg-none" src="img/main_mo01.png" alt="main_b_01">
              </picture>
            </div>
          </div>
          <div class="slide-item slide-item-4">
            <div class="slide-con">
              <div class="slide-dummy"></div>
              <div class="slide-txt">
                <h2 class="txt-tt">{{ $t('home.banner_title') }}</h2>
                <p class="txt-desc">{{ $t('home.banner_text1') }}<br class="d-none d-sm-block"/>{{ $t('home.banner_text2') }}</p>
                <div class="d-flex justify-content-center txt-btn">
                  <b-button class="txt-btn-2 mr-2" variant="primary" to="/explorer"><i class="far fa-compass"></i> {{ $t('header.explorer') }}</b-button>
                  <b-button class="txt-btn-2" variant="dark" v-on:click="gotoCreated"><i class="fas fa-th-large"></i> {{ $t('header.creating_nft') }}</b-button>
                </div>
              </div>
              <picture class="img-box d-block">
                <img class="d-none d-lg-block" src="img/main_b_01.png" alt="main_b_01">
                <img class="d-block d-lg-none" src="img/main_mo01.png" alt="main_b_01">
              </picture>
            </div>
          </div>
        </VueSlickCarousel>
          <button class="s-autoplay-btn"></button>
        </div>
      </div>

  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
export default {
  name: "Hero",
  components: {
    VueSlickCarousel
  },
  data(){
    return {
      settings : {
        "dots": true,
        "dotsClass": "slick-dots custom-dot-class",
        "edgeFriction": 0.35,
        "infinite": true,
        "centerMargin": "10px",
        "speed": 500,
        "slidesToShow": 1,
        "slidesToScroll": 1,
        "autoplay":true,
        autoplaySpeed: 3000,
      }
    }
  }
}
</script>

<style scoped>

</style>
