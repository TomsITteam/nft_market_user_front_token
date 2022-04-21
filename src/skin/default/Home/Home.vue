<template>
  <main class="main">

    <hero/>

    <!-- end home -->
    <end-auction/>

    <hot-collection/>

    <new-tokens/>

    <div class="bottom_menu">
      <div class="container">
        <ul class="row bottom_menu_box">
          <li style="background-color: #2122fa;" class="">
            <h4>{{ $t('home.wallet_settings') }}</h4>
            <p>{{ $t('home.wallet_settings_ext') }}</p>
            <a><img src="img/wallet_img.png" alt=""></a>
          </li>
          <li style="background-color: #fff;" class="">
            <h4>{{ $t('home.create_collection') }}</h4>
            <p>{{ $t('home.create_collection_ext') }}</p>
            <a><img src="img/block_img.png" alt=""></a>
          </li>
          <li style="background-color: #d6e0eb;" class="">
            <h4>{{ $t('home.add_nft') }}</h4>
            <p>{{ $t('home.add_nft_ext') }}</p>
            <a><img src="img/photo_img.png" alt=""></a>
          </li>
          <li style="background-color: #e9347a;" class="">
            <h4>{{ $t('home.sales_registration') }}</h4>
            <p>{{ $t('home.sales_registration_ext') }}</p>
            <a><img src="img/cart_img.png" alt=""></a>
          </li>
        </ul>
      </div>
    </div>
  </main>
  <!-- end main content -->
</template>

<script>
import NftItem from "../Components/NftItem";
import Hero from "./Components/Hero";
import EndAuction from "./Components/EndAuction";
import NewTokens from "./Components/NewTokens";
import HotCollection from "./Components/HotCollection";
import Home from "@/mixins/Home/Home";

export default {
  name: "Home",
  mixins: [Home],
  components: {
    HotCollection,
    NewTokens,
    EndAuction,
    Hero,
    NftItem
  },
  created() {
    console.log((new Date()).getTime() - window.startTime)
  }
}
</script>

<style scoped>

</style>
