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
import Web3 from "web3";

export default {
  name: "Home",
  components: {
    HotCollection,
    NewTokens,
    EndAuction,
    Hero,
    NftItem
  },
  data(){
    return {

    }
  },
  methods:{
    async getWeb3(){
      // Modern dapp browsers...
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          // Acccounts now exposed
          return web3
        } catch (error) {
          return error
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        console.log("Injected web3 detected.");
        return web3
      }
      // Fallback to localhost; use dev console port by default...
      else {
        const provider = new Web3.providers.HttpProvider(
          "https://bsc-dataseed.binance.org"
        );
        const web3 = new Web3(provider);
        console.log("No web3 instance injected, using Infura/Local web3.");
        return web3;
      }

    },
    async test(){
      const web3 = await this.getWeb3();

      web3.eth.net.getNetworkType().then(async (netId) => {
        console.log(netId)
      });
    }
  },
  created() {

    document.title = this.$env.VUE_APP_NAME

  }
}
</script>

<style scoped>

</style>
