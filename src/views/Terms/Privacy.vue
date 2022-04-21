<template>
  <main class="main">
    <div class="container pt-4 pb-4">
      <b-breadcrumb class="d-none d-sm-flex p-0">
        <b-breadcrumb-item to="/">{{ $t('header.home') }}</b-breadcrumb-item>
        <b-breadcrumb-item active class="text-primary">{{ $t('header.privacy_policy') }}</b-breadcrumb-item>
      </b-breadcrumb>

      <div class="row row--grid">

        <!-- title -->
        <div class="col-12">
          <div class="main__title main__title--page">
            <h1>{{ $t('header.privacy_policy') }}</h1>
            <span class="mt-4 d-block w-100" v-html="$env.VUE_APP_PRIVACY"></span>
          </div>
        </div>
        <!-- end title -->
      </div>


    </div>
  </main>
</template>

<script>
export default {
  name: "Privacy",
  created() {
    document.title = "개인 정보 처리 방침 | " + this.$env.VUE_APP_NAME
  }
}
</script>

<style scoped>

</style>
