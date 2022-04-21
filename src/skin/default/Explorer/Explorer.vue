<template>
  <main class="main">
    <div id="digi_all">
      <b-container>
        <b-breadcrumb class="d-none d-sm-flex p-0">
          <b-breadcrumb-item to="/">{{ $t('header.home') }}</b-breadcrumb-item>
          <b-breadcrumb-item active class="text-primary">NFT {{ $t('header.explorer') }}</b-breadcrumb-item>
        </b-breadcrumb>

        <h2>{{ $t('explorer.explorer') }}<img src="/img/thunder.png" alt="thunder"></h2>

        <b-row>
          <div class="col-12 overflow-auto scroll-hidden">
            <ul class="nav nav-tabs main__tabs mb-30" style="width: max-content">
              <li class="nav-item">
                <router-link class="nav-link" to="/explorer/all">🎨 {{ $t('header.all') }}</router-link>
              </li>
              <li class="nav-item" v-for="category in $env.VUE_APP_CATEGORY" :key="category.name">
                <router-link class="nav-link" :to="'/explorer/' + category.name">{{ category.value }}</router-link>
              </li>

            </ul>
          </div>
        </b-row>
      </b-container>

      <router-view></router-view>
    </div>
  </main>
</template>

<script>
import Explorer from "@/mixins/Explorer/Explorer";

export default {
  name: "Explorer",
  mixins :[Explorer],
}
</script>

<style scoped>

</style>
