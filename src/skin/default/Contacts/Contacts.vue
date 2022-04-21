<template>
  <main class="main pb-5" style="background-color: #eff3f7">
    <div id="ask_box">
      <div class="qa_img">
        <div class="qa_imgbox">
          <div class="container">
            <ul class="sdk_box">
              <li>
                <span>{{ $env.VUE_APP_COMPANY_NAME }}</span>
                <p>{{ $env.VUE_APP_COMPANY_TEXT }}</p>
              </li>
              <li>
                <p>{{ $env.VUE_APP_COMPANY_PHONE }}</p>
                <p>{{ $env.VUE_APP_COMPANY_EMAIL }}</p>
                <p>{{ $env.VUE_APP_COMPANY_ADDRESS }}</p>
                <b-button class="d-none d-sm-block" @click="openWEB"><strong>BLOCKSDK</strong><span>{{ $t('contactus.site') }}</span><i class="ml-2 fas fa-arrow-right"></i></b-button>
              </li>
            </ul>
          </div>
        </div>
        <div class="container">
          <div class="route ask_route">
            <b-breadcrumb class="d-none d-sm-flex p-0">
              <b-breadcrumb-item active-class="text-white" to="/">{{ $t('header.home') }}</b-breadcrumb-item>
              <b-breadcrumb-item active class="text-primary">{{ $t('header.contact_us') }}</b-breadcrumb-item>
            </b-breadcrumb>
            <h2>{{ $t('header.contact_us') }}</h2>
          </div>

          <b-form  @submit="onSubmit">
            <b-row>
              <b-col class="col-12 col-sm-6 mb-3">
                <input type="text" class="form-control w-100 border-0" id="exampleInputname1" :placeholder="$t('contactus.name')" v-model="formData.name" required >
              </b-col>
              <b-col class="col-12 col-sm-6 mb-3">
                <input type="email" class="form-control w-100 border-0" id="exampleInputEmail1" aria-describedby="emailHelp" :placeholder="$t('contactus.email')" v-model="formData.email" required >
              </b-col>
            </b-row>
            <div class="mb-3 title_ask">
              <input type="text" class="form-control w-100 border-0" id="exampleInputtitle1" :placeholder="$t('contactus.subject')" v-model="formData.subject" required >
            </div>
            <div class="mb-3">
              <textarea class="form-control w-100 border-0" id="exampleFormControlTextarea1" rows="3" :placeholder="$t('contactus.message')" v-model="formData.message" required ></textarea>
            </div>
            <b-button class="border-radius-10 d-block m-auto" type="submit" variant="primary" v-bind:class="{ disabled : loading }" style="width:120px;height:50px;">
              <b-spinner v-if="loading"></b-spinner>
              <span v-else>{{ $t('contactus.send') }}</span>
            </b-button>
          </b-form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import store from "../../../store";
import Contacts from '@/mixins/Contacts/Contacts'

export default {
  name: "Contacts",
  mixins: [Contacts],

}
</script>

<style scoped>

</style>
