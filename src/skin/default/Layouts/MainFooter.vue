<template>
  <!-- footer -->
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-8 col-md-6 col-lg-6 col-xl-4 order-4 order-md-1 order-lg-4 order-xl-1">
          <div class="footer__logo">
            <img src="/img/footer-logo.png"/>
          </div>
          <p class="footer__tagline" v-if="$env.VUE_APP_COMPANY_NAME">{{ $t('footer.company') }} : {{ $env.VUE_APP_COMPANY_NAME }}</p>
          <p class="footer__tagline mt-0" v-if="$env.VUE_APP_COMPANY_NUMBER">{{ $t('footer.business_number') }}  : {{ $env.VUE_APP_COMPANY_NUMBER }}</p>
          <p class="footer__tagline mt-0" v-if="$env.VUE_APP_COMPANY_PHONE">{{ $t('footer.tel') }} : {{ $env.VUE_APP_COMPANY_PHONE }}</p>
          <p class="footer__tagline mt-0" v-if="$env.VUE_APP_COMPANY_ADDRESS">{{ $t('footer.address') }} : {{ $env.VUE_APP_COMPANY_ADDRESS }}</p>
          <p class="footer__tagline">{{ $env.VUE_APP_COMPANY_TEXT }}</p>
        </div>

        <div class="col-6 col-md-4 col-lg-3 col-xl-2 order-1 order-md-2 order-lg-1 order-xl-2 offset-md-2 offset-lg-0">
          <h6 class="footer__title">{{ $t('header.creator') }} {{ $t('header.explorer') }}</h6>
          <div class="footer__nav">
            <router-link to="/authors/all">{{ $t('header.all') }}</router-link>
            <router-link to="/authors/auth">{{ $t('header.certified_creator') }}</router-link>
            <router-link to="/authors/unauth">{{ $t('header.uncertified_creator') }}</router-link>
          </div>
        </div>

        <div class="col-12 col-md-8 col-lg-6 col-xl-4 order-3 order-lg-2 order-md-3 order-xl-3">
          <div class="row">
            <div class="col-12">
              <h6 class="footer__title">NFT {{ $t('header.explorer') }}</h6>
            </div>

            <div class="col-4" v-for="n in categoryRow">
              <div class="footer__nav">
                <router-link v-if="n == 1" to="/explorer/all">전체 NFT</router-link>
                <router-link v-for="n2 in categoryLine(n)" :to="'/explorer/' + categoryNmae(n,n2)">{{ categoryText(n,n2) }}</router-link>
              </div>
            </div>

          </div>
        </div>

        <div class="col-6 col-md-4 col-lg-3 col-xl-2 order-2 order-lg-3 order-md-4 order-xl-4">
          <h6 class="footer__title">{{ $t('header.contact_us') }}</h6>
          <div class="footer__nav">
            <router-link to="/contacts">{{ $t('header.contact_us') }}</router-link>
            <router-link to="/help">{{ $t('header.faq') }}</router-link>
            <router-link to="/privacy">{{ $t('header.privacy_policy') }}</router-link>
            <router-link to="/service">{{ $t('header.terms_of_service') }}</router-link>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="footer__content">
            <div class="d-flex w-100">
              <small class="ml-0 footer__copyright">{{ $env.VUE_APP_FOOTER_TEXT }}</small>
              <div class="d-flex align-items-center ml-auto">
                <div class="d-none d-sm-flex footer__social mr-3">
                  <a v-if="$env.VUE_APP_COMPANY_FACEBOOK" :href="$env.VUE_APP_COMPANY_FACEBOOK" target="_blank"><i class="fab fa-facebook-square"></i></a>
                  <a v-if="$env.VUE_APP_COMPANY_INSTAGRAM" :href="$env.VUE_APP_COMPANY_INSTAGRAM" target="_blank"><i class="fab fa-instagram"></i></a>
                  <a v-if="$env.VUE_APP_COMPANY_TWITTER" :href="$env.VUE_APP_COMPANY_TWITTER" target="_blank"><i class="fab fa-twitter"></i></a>
                  <a v-if="$env.VUE_APP_COMPANY_BLOG" :href="$env.VUE_APP_COMPANY_BLOG" target="_blank"><i class="fab fa-blogger"></i></a>
                  <a v-if="$env.VUE_APP_COMPANY_TELEGRAM" :href="$env.VUE_APP_COMPANY_TELEGRAM" target="_blank"><i class="fab fa-telegram"></i></a>
                </div>

                <b-dropdown class="d-block ml-auto" :text="langText" variant="locale">
                  <b-dropdown-item @click="changeLocale('ko')">한국어</b-dropdown-item>
                  <b-dropdown-item @click="changeLocale('en')">English</b-dropdown-item>
                  <b-dropdown-item @click="changeLocale('cn')">中文</b-dropdown-item>
                </b-dropdown>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </footer>
  <!-- end footer -->
</template>

<script>
import MainFooter from "@/mixins/Layouts/MainFooter";

export default {
  name: "main-footer",
  mixins: [MainFooter],
}
</script>

<style scoped>
</style>
