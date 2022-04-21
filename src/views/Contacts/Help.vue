<template>
  <main class="main">
    <div id="sup_box">
      <div class="sup_img">
        <div class="d-flex align-items-center sup_imgbox">

          <div class="container pt-0 pt-lg-5">
            <div class="route sup_route">
              <b-breadcrumb class="d-none d-sm-flex p-0">
                <b-breadcrumb-item active-class="text-white" to="/">{{ $t('header.home') }}</b-breadcrumb-item>
                <b-breadcrumb-item active class="text-primary">{{ $t('header.faq') }}</b-breadcrumb-item>
              </b-breadcrumb>
              <b-row class="m-0">
                <b-col class="col-12 p-0 pl-lg-2 pr-lg-2 col-lg-10">
                  <h2>{{ $t('header.faq') }}</h2>
                  <p>{{ $t('faq.text') }}</p>
                </b-col>
                <div class="d-flex align-items-end">
                  <button class="d-none d-sm-block pl-3 pr-3" @click="openWEB" style="height:44px;"><strong>BLOCKSDK</strong><span>{{ $t('contactus.site') }}</span><i class="ml-2 fas fa-arrow-right"></i></button>
                </div>
              </b-row>
            </div>
          </div>

        </div>
        <div class="container">
          <ul class="sup_faq">
            <li>
              <span>{{ $t('faq.a0_subject') }}</span>
              <p>{{ $t('faq.a0_text') }}</p>
            </li>
            <li>
              <span>{{ $t('faq.a1_subject') }}</span>
              <p>{{ $t('faq.a1_text') }}</p>
            </li>
            <li>
              <span>{{ $t('faq.a2_subject') }}</span>
              <p>{{ $t('faq.a2_text') }}</p>
            </li>
            <li>
              <span>{{ $t('faq.a3_subject') }}</span>
              <p>{{ $t('faq.a3_text') }}</p>
            </li>
            <li>
              <span>{{ $t('faq.a4_subject') }}</span>
              <p>{{ $t('faq.a4_text') }}</p>
            </li>
            <li>
              <span>{{ $t('faq.a5_subject') }}</span>
              <p>{{ $t('faq.a5_text') }}</p>
            </li>
            <li>
              <span>{{ $t('faq.a6_subject') }}</span>
              <p>{{ $t('faq.a6_text') }}</p>
            </li>
            <li>
              <span>{{ $t('faq.a7_subject') }}</span>
              <p>{{ $t('faq.a7_text') }}</p>
            </li>
            <li>
              <span>{{ $t('faq.a8_subject') }}</span>
              <p>{{ $t('faq.a8_text') }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "Help",
  created() {
    document.title = "수수료 및 FAQ | " + this.$env.VUE_APP_NAME
  }
}
</script>

<style scoped>

</style>
