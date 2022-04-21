<template>
  <header class="header bg-white" style="box-shadow:0 0.5rem 1rem rgb(0 0 0 / 3%) !important;">
    <div class="header__content">
      <button class="header__btn d-lg-none" type="button" @click="activeHeaderMenu(!active.headerMenu)" v-bind:class="{ 'header__btn--active' : active.headerMenu }">
        <i class="fal fa-bars"></i>
      </button>

      <div class="header__logo">
        <router-link to="/">
          <img class="logo" src="/img/logo.png" />
        </router-link>
      </div>

      <b-form class="header__search" @submit="onSerachSubmit" v-bind:class="{ 'header__search--active' : this.active.headerSearch }">
        <button type="button" class="h-100 header__search-close d-xl-none" @click="activeHeaderSearch(false)">
          <i class="fal fa-arrow-left"></i>
        </button>

        <b-input class="border" type="text" :placeholder="$t('header.search_for_works')" required v-model="formData.q"/>

        <button type="submit" class="header__search--button">
          <i class="fal fa-search"></i>
        </button>
      </b-form>

      <div class="header__menu" v-bind:class="{ 'header__menu--active' : active.headerMenu }" >
        <b-row class="header__menu--head justify-content-center d-lg-none">
          <button type="button" class="header__menu--close"  @click="activeHeaderMenu(false)">
            <i class="far fa-arrow-left"></i>
          </button>
          <b-col>
            <img class="logo" src="/img/logo.png"/>
          </b-col>
          <b-button v-if="connectedWallet == false && isMobileWeb() == true" class="button__wallet--connect" variant="primary" target="_blank" :href="deepLink" >
            <i class="far fa-wallet"></i>
          </b-button>
          <b-button v-else-if="connectedWallet == false" class="button__wallet--connect" variant="primary"  v-on:click="connectWallet">
            <i class="far fa-wallet"></i>
          </b-button>

          <b-dropdown v-else variant="link" class="p-0" toggle-class="header__avatar--button p-0 border-0 text-decoration-none" no-caret>
            <template #button-content>
              <div role="button" v-bind:class="{ 'asset__action--verified' : connectedWalletAuth }" style="position: relative;">
                <img class="d-block border-radius-50" :src="connectedWalletAvatar" :alt="connectedWalletName" width="40px" height="40px">
              </div>
            </template>

            <b-dropdown-item @click="changeWallet()">
              <i class="fas fa-wallet mr-2"></i><span>{{ $t('header.change_wallet') }}</span>
            </b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>

            <b-dropdown-item :to="'/profile/' + this.$wallet.getWallet().getAccount()">
              <i class="far fa-id-badge mr-2"></i>{{ $t('header.my_info') }}
            </b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>

            <b-dropdown-item :to="'/profile/' + this.$wallet.getWallet().getAccount() + '/create'">
              <i class="far fa-spade mr-2"></i>{{ $t('header.creating_nft') }}
            </b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>

            <b-dropdown-item :to="'/profile/' + this.$wallet.getWallet().getAccount() + '/setting'">
              <i class="far fa-cogs mr-2"></i>{{ $t('header.setting') }}
            </b-dropdown-item>
            <span  v-if="!connectedWalletAuth">
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item :to="'/profile/' + this.$wallet.getWallet().getAccount() + '/auth'">
                <i class="fal fa-receipt mr-2"></i>{{ $t('header.apply_for') }}
              </b-dropdown-item>
            </span>
          </b-dropdown>
        </b-row>

        <ul class="header__nav">
          <li class="header__nav-item">
            <router-link class="header__nav-link" exact-active-class="active" active-class="" to="/" >{{ $t('header.home') }}</router-link>
          </li>
          <li class="header__nav-item">
            <menu-dropdown-item :text="'NFT ' + $t('header.explorer')" :items="menuCategoryItems"/>
          </li>
          <li class="header__nav-item">
            <menu-dropdown-item :text="$t('header.creator')" :items="menuAuthorItems" />
          </li>
          <li class="header__nav-item">
            <menu-dropdown-item :text="$t('header.contact_us')" :items="menuContactItems" />
          </li>
        </ul>
      </div>


      <div class="header__actions ml-auto">
        <div class="header__action header__action--search d-xl-none">
          <button class="h-100" @click="activeHeaderSearch(true)">
            <i class="far fa-search"></i>
          </button>
        </div>

        <div v-if="this.connectedWallet == false" class="d-none d-lg-flex align-items-center justify-content-center ml-4 header__action header__action--connect">
          <b-button  v-if="$wallet.getWallet().connecting == true" pill variant="primary" class="base-font-weight border-0" disabled style="width:110px;height: 40px">
            {{ $t('header.connecting') }}
          </b-button>
          <b-button  v-else pill  v-on:click="connectWallet" variant="primary" class="base-font-weight border-0" style="width:110px;height: 40px">
            {{ $t('header.connect') }}
          </b-button>
        </div>

        <div v-else  class="xs-hide">
          <b-dropdown variant="link" menu-class="" toggle-class="text-decoration-none p-0" no-caret>
            <template #button-content>
              <b-row class="m-0 header__profile-btn" role="button">
                <span  class="mr-2" v-bind:class="{ 'asset__action--verified' : connectedWalletAuth }" style="position: relative">
                  <img class="border-radius-50" :src="connectedWalletAvatar" :alt="connectedWalletName" width="40px" height="40px">
                </span>
                <div>
                  <span class="header__profile--name">{{ connectedWalletName }}</span>
                  <span class="header__profile--amount">{{ connectedWalletBalance }} {{ walletNet }}</span>
                </div>
              </b-row>
            </template>

            <b-dropdown-item @click="changeWallet()">
              <i class="fas fa-wallet mr-2"></i><span>{{ $t('header.change_wallet') }}</span>
            </b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>

            <b-dropdown-item :to="'/profile/' + this.$wallet.getWallet().getAccount()">
              <i class="far fa-id-badge mr-2"></i>
              <span>{{ $t('header.my_info') }}</span>
            </b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item :to="'/profile/' + this.$wallet.getWallet().getAccount() + '/create'">
              <i class="far fa-spade mr-2"></i>
              <span>{{ $t('header.creating_nft') }}</span>
            </b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item :to="'/profile/' + this.$wallet.getWallet().getAccount() + '/setting'">
              <i class="far fa-cogs mr-2"></i>
              <span>{{ $t('header.setting') }}</span>
            </b-dropdown-item>
            <span v-if="!connectedWalletAuth">
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item :to="'/profile/' + this.$wallet.getWallet().getAccount() + '/auth'">
                <i class="fal fa-receipt mr-2"></i>
                <span>{{ $t('header.apply_for') }}</span>
              </b-dropdown-item>
            </span>
          </b-dropdown>
        </div>
      </div>
    </div>
    <modal-multi-wallet @walletName="walletName" />
    <modal-klip-wallet :code-data="this.qrcode"  />
  </header>

</template>

<script>
import MenuDropdownItem from "../Components/MenuDropdownItem";
import MainHeader from "@/mixins/Layouts/MainHeader";
import ModalMultiWallet from "../Modals/ModalMultiWallet";
import ModalKlipWallet from "../Modals/ModalKlipWallet";

export default {
  name: "main-header",
  mixins: [MainHeader],
  components: {
    MenuDropdownItem,
    ModalMultiWallet,
    ModalKlipWallet,
  },
}
</script>

<style>

</style>
