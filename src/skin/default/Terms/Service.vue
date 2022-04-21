<template>
  <main class="main">
    <div class="container pt-4 pb-4">
      <b-breadcrumb class="d-none d-sm-flex p-0">
        <b-breadcrumb-item to="/">{{ $t('header.home') }}</b-breadcrumb-item>
        <b-breadcrumb-item active class="text-primary">{{ $t('header.terms_of_service') }}</b-breadcrumb-item>
      </b-breadcrumb>

      <div class="row row--grid">
        <!-- title -->
        <div class="col-12">
          <div class="main__title main__title--page">
            <h1>{{ $t('header.terms_of_service') }}</h1>
            <span class="mt-4 d-block w-100" v-html="$env.VUE_APP_SERVICE"></span>
          </div>
        </div>
        <!-- end title -->
      </div>


    </div>
  </main>
</template>

<script>
import Service from "@/mixins/Terms/Service";

export default {
  name: "Service",
  mixins: [Service],

}
</script>

<style scoped>

</style>
