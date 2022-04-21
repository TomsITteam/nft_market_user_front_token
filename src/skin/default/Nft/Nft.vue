<template>
  <main class="main">
    <div class="container pt-4">
      <div class="row row--grid">

        <div class="col-12">
          <b-breadcrumb v-if="loading.nftData" class="d-none d-sm-flex p-0 mb-4">
            <b-breadcrumb-item><b-skeleton width="50px" height="15px"></b-skeleton></b-breadcrumb-item>
            <b-breadcrumb-item ><b-skeleton width="50px" height="15px"></b-skeleton></b-breadcrumb-item>
            <b-breadcrumb-item ><b-skeleton width="50px" height="15px"></b-skeleton></b-breadcrumb-item>
          </b-breadcrumb>

          <b-breadcrumb v-else class="d-none d-sm-flex p-0 mb-4">
            <b-breadcrumb-item to="/">{{ $t('header.home') }}</b-breadcrumb-item>
            <b-breadcrumb-item to="/explorer">NFT {{ $t('header.explorer') }}</b-breadcrumb-item>
            <b-breadcrumb-item active class="text-primary">{{ nftData.name }}</b-breadcrumb-item>
          </b-breadcrumb>

        </div>

        <div class="col-12">
          <div>
            <b-skeleton v-if="loading.nftData" width="20%" height="30px"></b-skeleton>
            <h1 class="d-flex w-100 justify-content-center align-items-center" v-else>
              {{ nftName }}

              <!-- likes -->
              <button class="d-flex justify-content-center align-items-center asset__likes ml-auto" type="button" v-bind:class="{ active : nftData.like }" @click="liked">
                <i class="fas fa-heart mr-2"></i>
                <b-spinner class="ml-2" small v-if="loading.liked"></b-spinner>
                <span v-else>{{ nftData.like }}</span>
              </button>
              <!-- end likes -->
            </h1>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12 col-xl-8">

          <b-skeleton-wrapper :loading="loading.nftData">
            <template #loading>

              <div class="asset__item mb-4">
                <div class="w-100">
                  <b-skeleton-img width="100%"></b-skeleton-img>
                </div>

                <div class="share share--asset mt-4">
                  <span class="mr-2">
                    <b-skeleton type="avatar" width="40px" height="40px"></b-skeleton>
                  </span>
                  <span class="mr-2">
                    <b-skeleton type="avatar" width="40px" height="40px"></b-skeleton>
                  </span>
                  <span class="mr-2">
                    <b-skeleton type="avatar" width="40px" height="40px"></b-skeleton>
                  </span>
                </div>
              </div>
            </template>
            <div class="asset__item">
              <span v-if="nftData.image_url" class="asset__img" v-viewer>
                <img :src="nftImageURL" :alt="nftName"/>
              </span>
              <span v-else class="asset__img">
                <video-player :options="videoOptions"/>
              </span>
              <div class="d-flex mt-4 mb-4">
                <!-- share -->
                <div class="share share--asset">
                  <a target="_blank" :href="'https://www.facebook.com/sharer/sharer.php?u=' + locationHref" class="share__link" v-b-tooltip.hover :title="$t('nft.share_facebook')">
                    <svg width="12" height="20" viewBox="0 0 9 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.56341 16.8197V8.65888H7.81615L8.11468 5.84663H5.56341L5.56724 4.43907C5.56724 3.70559 5.63693 3.31257 6.69042 3.31257H8.09873V0.5H5.84568C3.1394 0.5 2.18686 1.86425 2.18686 4.15848V5.84695H0.499939V8.6592H2.18686V16.8197H5.56341Z"></path></svg>
                  </a>
                  <a target="_blank" :href="'https://twitter.com/intent/tweet?url=' + locationHref" class="share__link" v-b-tooltip.hover :title="$t('nft.share_twitter')">
                    <svg width="20" height="20" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.55075 3.19219L7.58223 3.71122L7.05762 3.64767C5.14804 3.40404 3.47978 2.57782 2.06334 1.1902L1.37085 0.501686L1.19248 1.01013C0.814766 2.14353 1.05609 3.34048 1.843 4.14552C2.26269 4.5904 2.16826 4.65396 1.4443 4.38914C1.19248 4.3044 0.972149 4.24085 0.951164 4.27263C0.877719 4.34677 1.12953 5.31069 1.32888 5.69202C1.60168 6.22165 2.15777 6.74068 2.76631 7.04787L3.28043 7.2915L2.67188 7.30209C2.08432 7.30209 2.06334 7.31268 2.12629 7.53512C2.33613 8.22364 3.16502 8.95452 4.08833 9.2723L4.73884 9.49474L4.17227 9.8337C3.33289 10.321 2.34663 10.5964 1.36036 10.6175C0.888211 10.6281 0.5 10.6705 0.5 10.7023C0.5 10.8082 1.78005 11.4014 2.52499 11.6344C4.75983 12.3229 7.41435 12.0264 9.40787 10.8506C10.8243 10.0138 12.2408 8.35075 12.9018 6.74068C13.2585 5.88269 13.6152 4.315 13.6152 3.56293C13.6152 3.07567 13.6467 3.01212 14.2343 2.42953C14.5805 2.09056 14.9058 1.71983 14.9687 1.6139C15.0737 1.41264 15.0632 1.41264 14.5281 1.59272C13.6362 1.91049 13.5103 1.86812 13.951 1.39146C14.2762 1.0525 14.6645 0.438131 14.6645 0.258058C14.6645 0.22628 14.5071 0.279243 14.3287 0.374576C14.1398 0.480501 13.7202 0.639389 13.4054 0.734722L12.8388 0.914795L12.3247 0.565241C12.0414 0.374576 11.6427 0.162725 11.4329 0.0991699C10.8978 -0.0491255 10.0794 -0.0279404 9.59673 0.14154C8.2852 0.618204 7.45632 1.84694 7.55075 3.19219Z"></path></svg>
                  </a>
                  <button @click="copyToClipboard(locationHref)" class="share__link share__link--link" v-b-tooltip.hover :title="$t('nft.copy_link')">
                    <svg width="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8,12a1,1,0,0,0,1,1h6a1,1,0,0,0,0-2H9A1,1,0,0,0,8,12Zm2,3H7A3,3,0,0,1,7,9h3a1,1,0,0,0,0-2H7A5,5,0,0,0,7,17h3a1,1,0,0,0,0-2Zm7-8H14a1,1,0,0,0,0,2h3a3,3,0,0,1,0,6H14a1,1,0,0,0,0,2h3A5,5,0,0,0,17,7Z"></path></svg>
                  </button>
                </div>
                <!-- end share -->
              </div>
            </div>
          </b-skeleton-wrapper>
        </div>
        <!-- end content -->

        <!-- sidebar -->
        <div class="col-12 col-xl-4">
          <div class="asset__info mb-4 mb-sm-0">
            <ul class="d-flex w-100 pb-4 mb-4 border-bottom" style="flex-direction: row;justify-content: flex-start;align-items: flex-start;">
              <li class="col-6 p-0">
                <div class="asset__author w-100">
                  <b-skeleton v-if="loading.nftData" type="avatar" width="44px" height="44px" style="margin-right:8px;"></b-skeleton>
                  <div v-else v-bind:class="{ 'asset__action--verified' : nftCreator.auth }" style="position: relative">
                    <img class="border-radius-50" :src="nftCreator.avatar" alt="">
                  </div>


                  <b-skeleton v-if="loading.nftData" width="44px" height="15px"></b-skeleton>
                  <div v-else style="width:calc(100% - 48px)">
                    <router-link class="d-block" :to="'/profile/' + nftCreator.address">{{ nftCreator.nick }}</router-link>
                    <div class="profile__type">{{ $t('nft.creator') }}</div>
                  </div>
                </div>
              </li>
              <li class="col-6 p-0">
                <div class="asset__author ">
                  <b-skeleton v-if="loading.nftData" type="avatar" width="44px" height="44px" style="margin-right:8px;"></b-skeleton>
                  <div v-else-if="nftData.interface == 'erc721'" v-bind:class="{ 'asset__action--verified' : nftOwner.auth }" style="position: relative">
                    <img class="border-radius-50" :src="nftOwner.avatar" alt="">
                  </div>
                  <div v-else-if="nftData.interface == 'erc1155'" v-bind:class="{ 'asset__action--verified' : nftOwner.auth }" style="position: relative">
                    <img class="border-radius-50" src="/img/users.png" alt="">
                  </div>

                  <b-skeleton v-if="loading.nftData" width="44px" height="15px"></b-skeleton>
                  <div v-else-if="nftData.interface == 'erc721'"style="width:calc(100% - 48px)">
                    <router-link class="d-block" :to="'/profile/' + nftOwner.address">{{ nftOwner.nick }}</router-link>
                    <div class="profile__type">{{ $t('nft.owner') }}</div>
                  </div>
                  <div v-else-if="nftData.interface == 'erc1155'"style="width:calc(100% - 48px)">
                    <a class="d-block">{{ $t('nft.multiple_owner') }}</a>
                    <div class="profile__type">{{ nftData.token_amount }}{{ $t('nft.issued') }}</div>
                  </div>
                </div>
              </li>
            </ul>

            <div class="asset__desc">
              <b-skeleton v-if="loading.nftData" width="20%" height="20px"></b-skeleton>
              <h2 v-else>{{ $t('nft.nft_description') }}</h2>
              <b-skeleton v-if="loading.nftData" width="70%" height="20px"></b-skeleton>
              <p v-else v-html="nftDescription"></p>
            </div>

            <b-skeleton-wrapper class="w-100" :loading="loading.nftData">
              <template #loading>
                <div class="mt-3 pt-3 border-top w-100">

                  <b-skeleton width="80%" height="25px" ></b-skeleton>
                  <b-skeleton width="70%" height="25px" ></b-skeleton>
                  <b-skeleton width="60%" height="25px" ></b-skeleton>
                  <b-skeleton width="50%" height="25px" ></b-skeleton>
                  <b-skeleton width="40%" height="25px" ></b-skeleton>
                  <b-skeleton width="30%" height="25px" ></b-skeleton>
                  <b-skeleton width="20%" height="25px" ></b-skeleton>
                </div>
              </template>
              <b-tabs class="w-100" nav-class="asset__tabs" content-class="mt-3">
                <b-tab class="nav-item" :title="$t('nft.info')" active>
                  <ul class="asset__authors--tab">
                    <li>
                      <span>NFT ID</span>
                      <p v-if="nftTransactionHash != null">
                        <a v-if="nftData.interface == 'erc1155'" :href="$wallet.getWallet().getNftInfoLink(nftData.net,nftData.interface,nftTokenID)" target="_blank">{{ nftTokenID }}</a>
                        <span v-else >{{ nftTokenID }}</span>
                      </p>
                      <p v-else>{{ $t('nft.unpublished') }}</p>
                    </li>
                    <li>
                      <span>{{ $t('nft.tx_hash') }}</span>
                      <p v-if="nftTransactionHash != null"><a :href="$wallet.getWallet().getTxLink(nftData.net,nftTransactionHash)" target="_blank">{{ reduceAddress(nftTransactionHash) }}</a></p>
                      <p v-else>{{ $t('nft.unpublished') }}</p>
                    </li>
                    <li>
                      <span>{{ $t('nft.contract_address') }}</span>
                      <p v-if="nftTransactionHash != null">
                        <a :href="$wallet.getWallet().getContractLink(this.nftData.net,this.nftData.interface)" target="_blank">{{  reduceAddress(contractAddress) }}</a>
                      </p>
                      <p v-else>{{ $t('nft.unpublished') }}</p>
                    </li>
                    <li>
                      <span>{{ $t('nft.mint_year') }}</span>
                      <p v-if="nftTransactionHash != null">{{ nftCreationYear }}</p>
                      <p v-else>{{ $t('nft.unpublished') }}</p>
                    </li>
                    <li  v-if="nftTransactionHash != null && nftData.interface == 'erc721'">
                      <span v-if="nftData.offer != undefined && nftData.offer.isForSale == true" >{{ $t('nft.starting_bid_price') }}</span>
                      <span v-else>{{ $t('nft.sales_price') }}</span>
                      <p v-if="nftData.token == unconfirmed || nftData.token.symbol == unconfirmed">{{ $t('nft.unregistered') }}</p>
                      <p v-else>{{ (nftData.price) }} {{ nftData.token.symbol }}<span v-if="!!nftData.token && nftData.token.tokenAddress == '0x0000000000000000000000000000000000000000'">  ≈ ￦{{ toFixed(amountToPrice(nftData.net,nftData.price)) }}</span></p>
                    </li>
                  </ul>
                </b-tab>

                <b-tab v-if="!!nftTokenID && nftData.interface == 'erc1155'" class="nav-item" :title="$t('nft.owners')">
                  <div class="asset__actions" data-scrollbar="true" tabindex="-1" style="overflow: auto; outline: none;">
                    <div class="scroll-content">
                      <div class="asset__action mb-2" v-for="item in nftData.owner">
                        <img class="border-radius-50" :src="item.avatar" alt="">
                        <p>
                          <router-link :to="'/profile/' + item.address">@{{ item.nick }}</router-link>
                          <span v-if="item.sell_amount == undefined || item.sell_amount == 0">
                            {{
                              $t('nft.not_selling', {
                                amount: item.amount
                              })
                            }}
                          </span>
                          <span v-else>
                            {{
                              $t('nft.sale_price', {
                                price: item.token==undefined||item.token.symbol==undefined?0:toFixed(parseFloat(item.price),8) + (!item.token?$env.VUE_APP_BASE_MAINNET:item.token.symbol),
                                amount: item.sell_amount + "/" + item.amount
                              })
                            }}
                          </span>
                        </p>
                        <span class="ml-auto">
                          <b-button v-if="item.address == $wallet.getWallet().getAccount()" @click="openMultiNftSend(item)" class="mr-1 font-weight-light" variant="dark">{{ $t('nft.send') }}</b-button>
                          <b-button v-if="item.sell_amount > 0 && item.address != $wallet.getWallet().getAccount()" @click="buyMultiNft(item)" class="font-weight-light" variant="primary">{{ $t('nft.buy') }}</b-button>
                          <b-button v-else-if="item.address == $wallet.getWallet().getAccount()" @click="updateSaleMultiNft(item)" class="font-weight-light" variant="primary">{{ $t('nft.update') }}</b-button>
                        </span>
                      </div>
                    </div>
                    <div v-if="nftData.owner.length == 0" class="not__data">
                      {{ $t('nft.not_owners') }}
                    </div>
                  </div>
                </b-tab>

                <b-tab v-if="nftTokenID" class="nav-item" :title="$t('nft.transfers')">
                  <div class="asset__actions" data-scrollbar="true" tabindex="-1" style="overflow: auto; outline: none;">
                    <div class="scroll-content">
                      <div class="asset__action mb-2" v-for="item in nftData.transfers">
                        <img class="border-radius-50" :src="item.to.avatar" alt="">
                        <p v-if="nftData.interface == 'erc721'">
                          {{ getTransferType(item.method) }} <b v-if="item.price">{{ toFixed(getTransferPrice(item.method,item.price)) }}{{ item.token.symbol }}</b> {{ timeToElapsed(item.timestamp) }} </br>
                          <router-link :to="'/profile/' + item.to.address">@{{ item.to.nick }}</router-link>
                        </p>
                        <p v-if="nftData.interface == 'erc1155' && item.method == 'saleMint'">
                          {{ getTransferType(item.method) }} <b v-if="item.price">{{ item.token_amount }}{{ $t('nft.piece') }} {{ $t('nft.per_price') }}{{ toFixed(getTransferPrice(item.method,item.price)) }}{{ item.token.symbol }}</b> {{ timeToElapsed(item.timestamp) }} </br>
                          <router-link :to="'/profile/' + item.to.address">@{{ item.to.nick }}</router-link>
                        </p>
                        <p v-if="nftData.interface == 'erc1155' && item.method != 'saleMint'">
                          {{ getTransferType(item.method) }} {{ item.token_amount }}{{ $t('nft.piece') }}<b v-if="item.price"> {{ $t('nft.total') }}{{  toFixed(getTransferPrice(item.method,item.price)) }}{{ item.token.symbol }}</b> {{ timeToElapsed(item.timestamp) }} </br>
                          <router-link :to="'/profile/' + item.to.address">@{{ item.to.nick }}</router-link>
                        </p>
                      </div>
                    </div>
                    <div v-if="nftData.transfers.length == 0" class="not__data">
                      {{ $t('nft.not_transfers') }}
                    </div>
                  </div>
                </b-tab>
                <b-tab v-else class="nav-item" :title="$t('nft.transfers')" disabled></b-tab>


                <b-tab v-if="!!nftTokenID && nftData.interface == 'erc721'" class="nav-item" :title="$t('nft.bids')">
                  <div class="asset__actions">
                    <div class="asset__action mb-2"  v-for="item in nftData.bids.data">
                      <img class="border-radius-50" :src="item.bidder.avatar" alt="">
                      <p>
                        {{ $t('nft.bid_price') }} <b v-if="item.price">{{ toFixed(item.price) }}{{ item.token.symbol }}</b> {{ timeToElapsed(item.timestamp) }} </br>
                        <router-link :to="'/profile/' + item.bidder.address">@{{ item.bidder.nick }}</router-link>
                      </p>
                    </div>
                    <div v-if="nftData.bids.data.length == 0" class="not__data">
                      {{ $t('nft.not_bids') }}
                    </div>

                  </div>
                </b-tab>
                <b-tab v-else-if="!nftTokenID" class="nav-item" :title="$t('nft.bids')" disabled></b-tab>
              </b-tabs>
            </b-skeleton-wrapper>


            <div v-if="loading.nftData" class="asset__btns pt-3">
              <b-skeleton width="100%" height="40px" ></b-skeleton>
            </div>

            <div v-else class="w-100">
              <div class="asset__wrap" v-if="nftIsOffer">
                <div class="asset__timer">
                  <span>{{ $t('nft.remaining_time') }}</span>
                  <div class="asset__clock">
                    <i class="far fa-stopwatch mr-2 text-primary"></i>{{ auctionRemainingTime }}
                  </div>
                </div>

                <div class="asset__price">
                  <span>{{ $t('nft.minimum_bid') }}</span>
                  <span><i class="far fa-money-bill-alt mr-2 text-primary"></i>{{ parseFloat(toFixed(nftMinBidPrice)) }} {{ nftData.token.symbol }}</span>
                </div>
              </div>

              <div v-if="nftOwner.address == this.$wallet.getWallet().getAccount() && nftData.interface != 'erc1155'" class="asset__btns">
                <b-button v-if="nftOwnerButtonType == 'unconfirmed'" class="height-50 base-font-weight mt-4 w-100" variant="primary" disabled>
                  <span>{{ $t('nft.waiting') }}</span>
                </b-button>

                <b-col v-if="nftOwnerButtonType == 'mint'" class="col-6 pl-0 ml-0 pr-1">
                  <b-button class="height-50 base-font-weight mt-4 w-100" variant="primary" @click="openSale" v-bind:class="{ disabled: loading.button }">
                    <b-spinner v-if="loading.button == true"></b-spinner>
                    <span v-else>{{ $t('nft.sales_registration') }}</span>
                  </b-button>
                </b-col>

                <b-col v-if="nftOwnerButtonType == 'mint'" class="col-6 pl-0 ml-0 pl-1">
                  <b-button class="height-50 base-font-weight mt-4 w-100" variant="dark" @click="deletedNft" v-bind:class="{ disabled: loading.button }">
                    <b-spinner v-if="loading.button == true"></b-spinner>
                    <span v-else>{{ $t('nft.delete') }}</span>
                  </b-button>
                </b-col>

                <b-col v-if="nftOwnerButtonType == 'sale'" class="col-6 pl-0 ml-0 pr-1">
                  <b-button  class="height-50 base-font-weight mt-4 w-100" variant="primary" @click="openSend" v-bind:class="{ disabled: loading.button }">
                    <b-spinner v-if="loading.button == true"></b-spinner>
                    <span v-else>{{ $t('nft.send') }}</span>
                  </b-button>
                </b-col>

                <b-col v-if="nftOwnerButtonType == 'sale'" class="col-6 pl-0 ml-0 pr-1">
                  <b-button  class="height-50 base-font-weight mt-4 w-100" variant="dark" @click="openSale" v-bind:class="{ disabled: loading.button }">
                    <b-spinner v-if="loading.button == true"></b-spinner>
                    <span v-else>{{ $t('nft.sales_registration') }}</span>
                  </b-button>
                </b-col>

                <b-col v-if="nftOwnerButtonType == 'cancelSale'" class="col-6 pl-0 ml-0 pr-1">
                  <b-button class="height-50 base-font-weight mt-4 w-100" variant="primary" @click="cancelSale" v-bind:class="{ disabled: loading.button }">
                    <b-spinner v-if="loading.button == true"></b-spinner>
                    <span v-else>{{ $t('nft.stop_sale') }}</span>
                  </b-button>
                </b-col>

                <b-col v-if="nftOwnerButtonType == 'cancelSale'" class="col-6 pr-0 mr-0 pl-1">
                  <b-button class="height-50 base-font-weight mt-4 w-100" variant="dark" @click="openUpdatePrice" v-bind:class="{ disabled: loading.button }">
                    <b-spinner v-if="loading.button == true"></b-spinner>
                    <span v-else>{{ $t('nft.price_change') }}</span>
                  </b-button>
                </b-col>

                <b-button v-else-if="nftOwnerButtonType == 'cancelAuction'" class="height-50 base-font-weight w-100 border-radius-10" variant="primary" @click="cancelAuction" v-bind:class="{ disabled: loading.button }">
                  <b-spinner v-if="loading.button == true"></b-spinner>
                  <span v-else>{{ $t('nft.stop_auction') }}</span>
                </b-button>

                <b-button v-else-if="nftOwnerButtonType == 'auctionEnd'" class="height-50 base-font-weight w-100 border-radius-10" variant="primary" @click="auctionEnd" v-bind:class="{ disabled: loading.button }">
                  <b-spinner v-if="loading.button == true"></b-spinner>
                  <span v-else>{{ $t('nft.receive') }}</span>
                </b-button>

                <b-button v-if="nftOwnerButtonType == 'cancelAuctionDisabled'" class="height-50 base-font-weight w-100 border-radius-10" variant="primary" disabled>
                  <span>{{ $t('nft.stop_auction') }}</span>
                </b-button>

                <b-button v-if="nftOwnerButtonType == ''" class="height-50 base-font-weight w-100 border-radius-10" variant="primary" disabled>
                  <span>{{ $t('nft.sales_registration') }}</span>
                </b-button>
              </div>

              <div v-else-if="nftData.interface == 'erc721'" class="asset__btns">
                <b-button v-if="nftBuyerButtonType == 'noWallet'" class="height-50 base-font-weight w-100 border-radius-10" variant="primary" disabled>
                  <span>{{ $t('nft.install_wallet') }}</span>
                </b-button>

                <b-button v-else-if="nftBuyerButtonType == 'unconfirmed'" class="height-50 base-font-weight w-100 border-radius-10" variant="primary" disabled>
                  <span>{{ $t('nft.waiting') }}</span>
                </b-button>

                <b-button v-else-if="nftBuyerButtonType == 'buy'" class="height-50 base-font-weight w-100 border-radius-10" variant="primary" @click="buy" v-bind:class="{ disabled: loading.button || isDisabledBuy }">
                  <b-spinner v-if="loading.button == true"></b-spinner>
                  <span v-else>{{ $t('nft.buy') }} - {{ parseFloat(toFixed(this.nftData.price)) }}{{ nftData.token.symbol }}</span>
                </b-button>

                <b-button v-else-if="nftBuyerButtonType == 'approve'" class="height-50 base-font-weight w-100 border-radius-10" variant="primary" @click="submitApprove(nftData.net,nftData.token.tokenAddress,SingleNftContractAddress )" v-bind:class="{ disabled: loading.button || loadingApprove || lackOfBalance }">
                  <b-spinner v-if="loading.button == true"></b-spinner>
                  <span v-else>{{ $t('nft.approve') }}</span>
                  <span v-if="lackOfBalance"> - {{ $t('nft.lack_of_balance') }}</span>
                </b-button>

                <b-button v-else-if="nftBuyerButtonType == 'bid'" class="height-50 base-font-weight w-100 border-radius-10"  variant="primary" @click="openBid" v-bind:class="{ disabled: loading.button }">
                  <b-spinner v-if="loading.button == true"></b-spinner>
                  <span v-else>{{ $t('nft.bid') }}</span>
                </b-button>

                <b-button v-else-if="nftBuyerButtonType == 'cancelBid'" class="height-50 base-font-weight w-100 border-radius-10" variant="primary" @click="cancelBid" v-bind:class="{ disabled: loading.button }">
                  <b-spinner v-if="loading.button == true"></b-spinner>
                  <span v-else>{{ $t('nft.cancel_bid') }}</span>
                </b-button>

                <b-button v-else-if="nftBuyerButtonType == 'auctionEnd'" class="height-50 base-font-weight w-100 border-radius-10" variant="primary" @click="auctionEnd" v-bind:class="{ disabled: loading.button }">
                  <b-spinner v-if="loading.button == true"></b-spinner>
                  <span v-else>{{ $t('nft.win_a_bid') }}</span>
                </b-button>

                <b-button v-else class="height-50 base-font-weight w-100  border-radius-10" variant="primary" disabled>
                  <span>{{ $t('nft.buy') }}</span>
                </b-button>
              </div>
            </div>


          </div>
        </div>
      </div>


    </div>

    <div class="diff_writer" v-if="this.nftData.total_creation > 1">
      <div class="diff_over">
        <div class="container">
          <div class="diff_card">
            <h3 class="title_01">{{ $t('nft.other_works') }}</h3>
            <div class="ab_box">
              <b-skeleton-wrapper :loading="loading.nftData == true || loading.collectionCreatedNFTData == true">
                <template #loading>
                  <b-row>
                    <div class="d-none col-12 col-sm-6 col-lg-4 col-xl-3 pl-2 pr-2" v-for="n in 4"
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

                <swiper class="d-none d-lg-block" :options="swiperOptions">
                  <swiper-slide  v-for="item in collectionCreatedNFTData" style="width: 310px">
                    <NftItem :nft="item"></NftItem>
                  </swiper-slide>
                </swiper>

                <swiper class="d-none d-md-block d-lg-none" :options="swiperOptions">
                  <swiper-slide  v-for="item in collectionCreatedNFTData" style="width: 280px">
                    <NftItem :nft="item"></NftItem>
                  </swiper-slide>
                </swiper>

                <swiper class="d-block d-md-none" :options="swiperOptions">
                  <swiper-slide  v-for="item in collectionCreatedNFTData" style="width: 250px">
                    <NftItem :nft="item"></NftItem>
                  </swiper-slide>
                </swiper>
              </b-skeleton-wrapper>

            </div>
          </div>
        </div>
      </div>
    </div>

    <modal-sale             :nft-data="nftData" :update-nft-data="updateNftData"/>
    <modal-update-price     :nft-data="nftData" :update-nft-data="updateNftData"/>
    <modal-bid              :prop-nft-data="nftData" :update-nft-data="updateNftData" :token-balance="tokenBalance"/>
    <modal-send             :nft-data="nftData" :update-nft-data="updateNftData" :multi-nft-row="modal.multiNftRow"/>
    <modal-multi-nft-buy    :nft-data="nftData" :update-nft-data="updateNftData" :seller-data="modal.sellerData"/>
    <modal-update-multi-nft :nft-data="nftData" :update-nft-data="updateNftData" :seller-data="modal.sellerData"/>
  </main>
</template>

<script>
import Vue from 'vue'
import { Carousel, Slide } from 'vue-carousel';
import NftItem from "../Components/NftItem";
import VueViewer from 'v-viewer'
import VideoPlayer from "@/components/VideoPlayer.vue";
import ModalUpdatePrice from "../Modals/ModalUpdatePrice";
import ModalSale from "../Modals/ModalSale";
import ModalBid from "../Modals/ModalBid";
import ModalMultiNftBuy from "../Modals/ModalMultiNftBuy";
import ModalUpdateMultiNft from "../Modals/ModalUpdateMultiNft";
import ModalSend from "../Modals/ModalSend";
import Nft from "@/mixins/Nft/Nft";

Vue.use(VueViewer)
export default {
  name: "Nft",
  mixins: [Nft],
  components: {
    ModalSend,
    ModalUpdateMultiNft,
    ModalMultiNftBuy,
    ModalBid,
    ModalSale,
    ModalUpdatePrice,
    Carousel,
    Slide,
    NftItem,
    VideoPlayer
  },
}
</script>

<style scoped>

</style>
