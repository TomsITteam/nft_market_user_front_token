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
                        <a v-if="nftData.interface == 'erc1155'" :href="$wallet.getNftInfoLink(nftData.net,nftData.interface,nftTokenID)" target="_blank">{{ nftTokenID }}</a>
                        <span v-else >{{ nftTokenID }}</span>
                      </p>
                      <p v-else>{{ $t('nft.unpublished') }}</p>
                    </li>
                    <li>
                      <span>{{ $t('nft.tx_hash') }}</span>
                      <p v-if="nftTransactionHash != null"><a :href="$wallet.getTxLink(nftData.net,nftTransactionHash)" target="_blank">{{ reduceAddress(nftTransactionHash) }}</a></p>
                      <p v-else>{{ $t('nft.unpublished') }}</p>
                    </li>
                    <li>
                      <span>{{ $t('nft.contract_address') }}</span>
                      <p v-if="nftTransactionHash != null">
                        <a :href="$wallet.getContractLink(this.nftData.net,this.nftData.interface)" target="_blank">{{  reduceAddress(contractAddress) }}</a>
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
                      <p>{{ nftData.price }} {{ nftData.net }}  ≈ ￦{{ toFixed(amountToPrice(nftData.net,nftData.price)) }}</p>
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
                                price: toFixed(parseFloat(item.price),8) + nftData.net,
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
                          {{ getTransferType(item.method) }} <b v-if="item.price">{{ toFixed(getTransferPrice(item.method,item.price)) }}{{ nftData.net }}</b> {{ timeToElapsed(item.timestamp) }} </br>
                          <router-link :to="'/profile/' + item.to.address">@{{ item.to.nick }}</router-link>
                        </p>
                        <p v-if="nftData.interface == 'erc1155' && item.method == 'saleMint'">
                          {{ getTransferType(item.method) }} <b v-if="item.price">{{ item.token_amount }}개 개당{{ toFixed(getTransferPrice(item.method,item.price)) }}{{ nftData.net }}</b> {{ timeToElapsed(item.timestamp) }} </br>
                          <router-link :to="'/profile/' + item.to.address">@{{ item.to.nick }}</router-link>
                        </p>
                        <p v-if="nftData.interface == 'erc1155' && item.method != 'saleMint'">
                          {{ getTransferType(item.method) }} <b v-if="item.price">{{ item.token_amount }}개 총{{ toFixed(getTransferPrice(item.method,item.price)) }}{{ nftData.net }}</b> {{ timeToElapsed(item.timestamp) }} </br>
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
                        {{ $t('nft.bid_price') }} <b v-if="item.price">{{ toFixed(item.price) }}{{ nftData.net }}</b> {{ timeToElapsed(item.timestamp) }} </br>
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
                  <span><i class="far fa-money-bill-alt mr-2 text-primary"></i>{{ toFixed(nftMinBidPrice) }} {{ nftData.net }}</span>
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
                  <span v-else>{{ $t('nft.buy') }} - {{ toFixed(this.nftData.price) }}{{ this.nftData.net }}</span>
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
    <modal-bid              :prop-nft-data="nftData" :update-nft-data="updateNftData"/>
    <modal-send             :nft-data="nftData" :update-nft-data="updateNftData" :multi-nft-row="modal.multiNftRow"/>
    <modal-multi-nft-buy    :nft-data="nftData" :update-nft-data="updateNftData" :seller-data="modal.sellerData"/>
    <modal-update-multi-nft :nft-data="nftData" :update-nft-data="updateNftData" :seller-data="modal.sellerData"/>
  </main>
</template>

<script>
import Vue from 'vue'
import fees from '@/data/fees.json'
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

Vue.use(VueViewer)
export default {
  name: "Nft",
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
  watch:{

  },
  asyncComputed:{
    async isDisabledBuy(){
      if(this.nftData == undefined){
        return true
      }

      let address = this.$wallet.getWallet().getAccount()
      if(address == undefined || address == null){
        return true
      }

      let buyValue = parseFloat(this.nftData.price)
      if(buyValue <=  (await this.$wallet.getWallet().getBalance(address) / 10**18)){
        return false
      }

      return true
    }
  },
  computed:{
    contractAddress(){
      let address

      if(this.nftData.interface == 'erc721'){
        address = this.$env['VUE_APP_' + this.nftData.net + '_SINGLENFT_CONTRACT_ADDRESS']
      }else{
        address = this.$env['VUE_APP_' + this.nftData.net + '_MULTINFT_CONTRACT_ADDRESS']
      }

      return address
    },
    totalCreation(){
      if(!this.nftData){
        return 0
      }

      return this.nftData.total_creation
    },
    nftBuyerButtonType(){
      let time = (new Date()).getTime() / 1000

      if(this.$wallet.isWallet() == false){
        return "noWallet"
      }else if(this.unconfirmed == true){
        return "unconfirmed"
      }else if(this.nftData.listed == true) {
        return "buy"
      }else if(this.nftData.offer != undefined && this.nftData.offer.isForSale == true && this.nftData.offer.endTime < time && this.nftData.bid.bidder == this.$wallet.getWallet().getAccount() ){
        return "auctionEnd"
      }else if(this.nftData.offer != undefined && this.nftData.offer.isForSale == true && this.nftData.offer.endTime > time && this.nftData.bid.bidder == this.$wallet.getWallet().getAccount()){
        return "cancelBid"
      }else if(this.nftData.offer != undefined && this.nftData.offer.isForSale == true && this.nftData.offer.endTime > time){
        return "bid"
      }

      return ""
    },
    nftOwnerButtonType(){
      let time = (new Date()).getTime() / 1000

      if(this.unconfirmed == true){
        return "unconfirmed"
      }else if(!this.nftTokenID) {
        return "mint"
      }else if(this.nftData.listed == false && (this.nftData.offer == undefined || this.nftData.offer.isForSale == false)){
        return "sale"
      }else if(this.nftData.listed == true){
        return "cancelSale"
      }else if(this.nftData.offer != undefined && this.nftData.offer.isForSale == true && this.nftData.offer.endTime < time && this.nftData.bid != undefined && this.nftData.bid.hasBid == true){
        return "auctionEnd"
      }else if(this.nftData.offer != undefined && this.nftData.offer.isForSale == true && this.nftData.bid != undefined && this.nftData.bid.hasBid == false){
        return "cancelAuction"
      }else if(this.nftData.offer != undefined && this.nftData.offer.isForSale == true && this.nftData.bid != undefined && this.nftData.bid.hasBid == true){
        return "cancelAuctionDisabled"
      }

      return ""
    },
    locationHref(){
      return window.location.href
    },
    nftID(){
      return this.$route.params.nft_id
    },
    nftName(){
      if(this.nftData == null)
        return ""

      return this.nftData.name
    },
    nftDescription(){
      if(this.nftData == null)
        return ""

      let description = this.strip_tags(this.nftData.description)

      let linkSplit = description.split("http://")
      for (var i=1;i<linkSplit.length;i++) {
        let value = linkSplit[i]
        value = value.split(" ")[0]
        value = value.split("\n")[0]

        value = "http://" + value
        description = description.replaceAll( value,`<a  target="_blank"href="${value}">${value}</a>`)
      }

      linkSplit = description.split("https://")
      for (var i=1;i<linkSplit.length;i++) {
        let value = linkSplit[i]
        value = value.split(" ")[0]
        value = value.split("\n")[0]

        value = "https://" + value
        description = description.replaceAll(value,`<a target="_blank" href="${value}">${value}</a>`)
      }

      return description
    },
    nftImageURL(){
      if(this.nftData == null)
        return ""

      return this.nftData.image_url
    },
    nftCreator(){
      if(this.nftData == null) {
        return {
          address : "",
          profile : {
            name : "",
            image_url : "/img/profile.svg"
          }
        }
      }

      return this.nftData.creator
    },
    nftOwner(){
      if(this.nftData == null) {
        return {
          address : "",
          profile : {
            name : "",
            image_url : "/img/profile.svg"
          }
        }
      }

      return this.nftData.owner
    },
    nftTransactionHash(){
      if(this.nftData == null || this.nftData.tx_hash == "")
        return null

      return this.nftData.tx_hash
    },
    nftTokenID(){
      if(this.nftData == null)
        return null

      return this.nftData.token_id
    },
    nftCreationYear(){
      if(this.nftData == null)
        return null

      return this.nftData.year_creation
    },
    nftIsOffer(){
      if(this.nftData == null)
        return false
      else if(this.nftData.offer == undefined)
        return false

      return this.nftData.offer.isForSale
    },
    nftPrice(){
      if(this.nftData == null)
        return false

      return this.nftData.price
    },
    nftMinBidPrice(){
      if(this.nftData == null)
        return 0
      else if(this.nftData.bid.hasBid == true){
        return this.nftData.bid.value
      }

      return this.nftData.offer.minValue
    },
  },

  data(){
    return {
      unconfirmed : false,
      fees : {...fees},
      loading : {
        nftData : true,
        collectionCreatedNFTData : true,
        liked : false,
        button : false,
      },
      auctionRemainingTimer : null,
      auctionRemainingTime : "00:00:00",
      nftData : {},
      collectionCreatedNFTData : [],
      videoOptions: {
        autoplay: true,
        controls: true,
        loop : true,
        muted : true,
        playsinline : true,
      },
      swiperOptions: {
        slidesPerView: 'auto',
        spaceBetween : 20,
        freeMode: true,
      },
      modal:{
        sellerData : {},
        multiNftRow : {},
      }
    }
  },
  methods:{
    strip_tags (str) {
      return str.replace(/(<([^>]+)>)/ig,"");
    },
    openSend(){
      if(this.$wallet.checkChainID(this.nftData.net) == false){
        return
      }
      this.$bvModal.show('bv-modal-send')
    },
    openUpdatePrice(){
      if(this.$wallet.checkChainID(this.nftData.net) == false){
        return
      }

      this.$bvModal.show('bv-modal-update-price')
    },
    openSale(){
      if(this.$wallet.checkChainID(this.nftData.net) == false){
        return
      }

      this.$bvModal.show('bv-modal-sale')
    },
    openBid(){
      if(this.$wallet.checkChainID(this.nftData.net) == false){
        return
      }

      this.$bvModal.show('bv-modal-bid')
    },
    openMultiNftSend(row){
      if(this.$wallet.checkChainID(this.nftData.net) == false){
        return
      }

      this.modal.multiNftRow = row
      this.$bvModal.show('bv-modal-send')
    },
    findOwner(ownerAddress){
      for (var index in this.nftData.owner){
        let owner = this.nftData.owner[index]
        if(owner.address == ownerAddress){
          return owner
        }
      }

      return false
    },
    async updateSaleMultiNft(sellerData){
      if(this.$wallet.checkChainID(this.nftData.net) == false){
        return
      }

      this.modal.sellerData = sellerData
      this.$bvModal.show("bv-modal-update-multinft")
    },
    async buyMultiNft(sellerData){
      if(this.$wallet.checkChainID(this.nftData.net) == false){
        return
      }

      this.modal.sellerData = sellerData
      this.$bvModal.show("bv-modal-multinft-buy")
    },
    updateNftData(nftData){
      this.nftData = nftData
    },
    async before(){
      if(this.$wallet.isConnect() == false || this.$wallet.getWallet().getAccount() == undefined){
        this.$wallet.connectWallet()
        return false
      }

      return true
    },
    timeToElapsed(time){
      let parallax = parseInt((new Date()).getTime() / 1000) - time

      if(parallax > 86400){
        return parseInt(parallax / 86400) + this.$t('nft.day_ago')
      }else if(parallax > 3600){
        return parseInt(parallax / 3600) + this.$t('nft.hour_ago')
      }else if(parallax > 60){
        return parseInt(parallax / 60) + this.$t('nft.minute_ago')
      }else {
        return parseInt(parallax ) + this.$t('nft.second_ago')
      }
    },
    async cancelBid(){
      if(this.$wallet.checkChainID(this.nftData.net) == false){
        return
      }

      this.loading.button = true
      let tx_hash = await this.$contract.singleNFT.cancelBid(this.nftData.net,this.nftData.token_id)
      this.loading.button = false

      if(tx_hash == false){
        return
      }

      if(this.$env.VUE_APP_BASE_WALLET == 'METAMASK') {
        this.$cookies.set("tx_" + this.nftID, tx_hash, "7d");
      }

      this.nftData.bid = {
        hasBid : false,
        bidder : "",
        value : 0,
      }
    },
    async buy(){
      if(this.$wallet.checkChainID(this.nftData.net) == false){
        return
      }

      if(await this.before() == false){
        return
      }else if(this.loading.button == true){
        return
      }else if(this.isDisabledBuy == true){
        return
      }

      this.loading.button = true
      if(await this.beforeTransaction() == true){
        this.loading.button = false
        return
      }

      this.loading.button = true
      let tx_hash = await this.$contract.singleNFT.buy(this.nftData.net,this.nftData.token_id,this.nftData.price)
      this.loading.button = false
      if(tx_hash == false){
        return
      }

      if(this.$env.VUE_APP_BASE_WALLET == 'METAMASK') {
        this.$cookies.set("tx_" + this.nftID, tx_hash, "7d");
      }

      this.$router.go()
    },
    async cancelSale(){
      this.loading.button = true
      await this.updateListingStatus(0)
      this.loading.button = false
    },
    async cancelAuction(){
      if(this.$wallet.checkChainID(this.nftData.net) == false){
        return
      }

      this.loading.button = true
      let tx_hash = await this.$contract.singleNFT.cancelAuction(this.nftData.net,this.nftData.token_id)
      this.loading.button = false

      if(tx_hash == false){
        return
      }

      if(this.$env.VUE_APP_BASE_WALLET == 'METAMASK') {
        this.$cookies.set("tx_" + this.nftID, tx_hash, "7d");
      }

      this.nftData.offer.isForSale = false
    },
    async auctionEnd(){
      if(this.$wallet.checkChainID(this.nftData.net) == false){
        return
      }
      if(this.loading.button == true){
        return
      }

      this.loading.button = true
      if(await this.beforeTransaction() == true){
        this.loading.button = false
        return
      }

      this.loading.button = true
      let tx_hash = await this.$contract.singleNFT.endAuction(this.nftData.net,this.nftData.token_id)
      this.loading.button = false

      if(tx_hash == false){
        return
      }

      if(this.$env.VUE_APP_BASE_WALLET == 'METAMASK') {
        this.$cookies.set("tx_" + this.nftID, tx_hash, "7d");
      }
      this.$router.go()
    },
    getTransferPrice(method,price){
      if(method == 'mint') {
        return this.$t('nft.price') + " " + price
      }else if(method == 'auctionMint'){
        return this.$t('nft.minimum_bid') + " " + price
      }else if(method == 'buy'){
        return price
      }else if(method == 'endAuction'){
        return this.$t('nft.successful_bid_price') + " "  + price
      }

      return this.$t('nft.price') + price
    },
    getTransferType(method){
      if(method == 'mint') {
        return this.$t('nft.mint')
      }else if(method == 'auctionMint'){
        return this.$t('nft.auctionMint')
      }else if(method == 'buy'){
        return this.$t('nft.buy')
      }else if(method == 'endAuction'){
        return this.$t('nft.successful_bid')
      }else if(method == 'burn'){
        return this.$t('nft.incinerated')
      }else if(method == 'saleMint'){
        return this.$t('nft.quantity_issuance')
      }

      return this.$t('nft.sendRecived')
    },
    copyToClipboard(val) {
      const t = document.createElement("textarea");
      document.body.appendChild(t);
      t.value = val;
      t.select();
      document.execCommand('copy');
      document.body.removeChild(t);

      alert(this.$t('nft.has_been_copied'))
    },
    async liked(){
      if(this.$wallet.beforeWalletCheck() == false){
        return
      }

      if(this.loading.liked == true){
        return
      }

      this.loading.liked = true


      let result = await this.$api.liked({
        data : {
          category : 'nft',
          token_id : this.nftTokenID,
        }
      })
      this.loading.liked = false

      if(result.error != undefined){
        alert(result.error.message)
        return
      }else if(result == false){
        return
      }

      if(result.liked == true){
        this.nftData.like++
      }else{
        this.nftData.like--
      }

    },
    async updateListingStatus(listed){
      if(this.$wallet.checkChainID(this.nftData.net) == false){
        return
      }
      let tx_hash = await this.$contract.singleNFT.updateListingStatus(this.nftData.net,this.nftData.token_id,listed)
      if(tx_hash == false){
        return
      }
      if(this.$env.VUE_APP_BASE_WALLET == 'METAMASK') {
        this.$cookies.set("tx_" + this.nftID, tx_hash, "7d");
      }

      this.nftData.listed = listed
    },
    async getNft(nft_id){
      this.loading.nftData = true

      let result = await this.$api.getNFT({
        data : {
          nft_id
        }
      })

      this.loading.nftData = false

      this.nftData = result
      document.title = this.nftData.name + " | " + this.$env.VUE_APP_NAME
      if(this.nftData.video_url != undefined) {
        this.videoOptions.sources = [
          {
            src: this.nftData.video_url,
            type: "video/mp4"
          }
        ]
      }

      if(this.nftData.total_creation > 1) {
        this.collectionCreatedNFT(this.nftCreator.address)
      }else{
        this.loading.collectionCreatedNFTData = false
      }
    },
    async collectionCreatedNFT(address){
      this.loading.collectionCreatedNFTData = true
      let result = await this.$api.collectionCreatedNFT({
        data : {
          address
        }
      })

      for(var key  in result.data){
        let data = result.data[key]
        if(data.id == this.nftID){
          result.data.splice(key,1)
          break
        }
      }
      this.collectionCreatedNFTData = result.data
      this.loading.collectionCreatedNFTData = false
    },
    async deletedNft(){
      if(this.loading.button == true) {
        return
      }

      this.loading.button = true
      let result = await this.$api.deletedNFT({
        data : {
          nft_id        : this.nftID,
        }
      })
      this.loading.button = false
      if(result == false){
        return
      }else if(result.error != undefined){
        alert(result.error.message)
        return
      }

      this.$router.push({
        name : "Home",
      })
    },
    dataUpdate(nft_id){
      this.loading.nftData = true
      this.loading.collectionCreatedNFTData = true

      this.getNft(nft_id)
    },
    auctionCountDown() {
      if (this.nftData == null){
        return
      }else if(this.nftTokenID == false){
        return
      }else if(this.nftIsOffer == false){
        return
      }

      let time = (new Date()).getTime() / 1000
      if(this.nftData.offer.endTime < time ){
        this.auctionRemainingTime = "00:00:00"
      }else{
        this.auctionRemainingTime = ""

        let remainingTime = this.nftData.offer.endTime - time

        if(remainingTime > 86400){
          let days = parseInt(remainingTime / 86400)
          remainingTime -= days * 86400

          this.auctionRemainingTime = days + this.$t('nft.day') + " "
        }

        if(remainingTime > 3600){
          let hous = parseInt(remainingTime / 3600)
          remainingTime -= hous * 3600

          if(hous < 10){
            hous = "0" + hous
          }
          this.auctionRemainingTime += hous + ":"
        }else{
          this.auctionRemainingTime += "00:"
        }

        if(remainingTime > 60){
          let minute = parseInt(remainingTime / 60)
          remainingTime -= minute * 60

          if(minute < 10){
            minute = "0" + minute
          }
          this.auctionRemainingTime += minute + ":"
        }else{
          this.auctionRemainingTime += "00:"
        }

        if(remainingTime > 0){
          let second = parseInt(remainingTime)

          if(second < 10){
            second = "0" + second
          }
          this.auctionRemainingTime += second
        }else{
          this.auctionRemainingTime += "00"
        }

      }
    },
    async checkConfirm(){
      let tx_hash = this.$cookies.get("tx_" + this.nftID);

      if(tx_hash == undefined || tx_hash == null || tx_hash == false || tx_hash == "undefined"){
        return
      }

      let rawtx = await ethereum.request({
        method: 'eth_getTransactionByHash',
        params: [tx_hash],
      });
      if(rawtx == null){
        this.unconfirmed = false
        this.$cookies.remove("tx_" + this.nftID);
        return
      }

      if(rawtx.blockNumber == undefined || parseInt(rawtx.blockNumber,16) <= 0){
        this.unconfirmed = true
        return
      }

      this.unconfirmed = false
      this.$cookies.remove("tx_" + this.nftID);
    },
    startTimer(){
      if(this.$env.VUE_APP_BASE_WALLET == 'METAMASK') {
        setInterval(() => this.checkConfirm(), 1000)
      }

      this.auctionRemainingTimer = setInterval(() => this.auctionCountDown(), 1000);
    },
    stopTimer(){
      if(this.auctionRemainingTimer == null)
        return

      clearInterval(this.auctionRemainingTimer);
    },
    async beforeTransaction(){
      let result = await this.$api.paused({})
      if(result == false){
        return true
      }else if(result.data == true){
        alert(this.$t('nft.stop_transaction'))
        return true
      }

      return false
    },
  },
  beforeRouteUpdate(to,from,next){
    this.stopTimer()
    this.startTimer()

    this.dataUpdate(to.params.nft_id)
    next()
  },
  created() {
    this.stopTimer()
    this.startTimer()

    this.getNft(this.$route.params.nft_id)
  }
}
</script>

<style scoped>

</style>
