<template>
<div>
  <div class="header__menu--item d-lg-none" @click="open(!isOpen)" v-bind:class="{ active : isOpen }">
    {{ text }}<i class="fal fa-plus-circle"></i>
  </div>
  <div v-if="items != null" class="header__menu--dropdown d-lg-none" v-bind:class="{ active : isOpen }">
    <span  v-for="(item) in items">
      <router-link v-if="isExternalLink(item.link) == false" class="header__menu--dropdown-item" exact-active-class="active" active-class="" :to="item.link">
        {{ item.name }}
      </router-link>
      <a v-else class="header__menu--dropdown-item" :href="item.link">
        {{ item.name }}
      </a>
    </span>
  </div>
  <b-nav-item-dropdown :text="text" class="header__nav-link d-none d-lg-block">
    <span v-for="(item, index) in items" >
      <b-dropdown-divider v-if="index != 0"></b-dropdown-divider>
      <b-dropdown-item  v-if="isExternalLink(item.link) == false" :to="item.link" exact-active-class="active" active-class="">{{ item.name }}</b-dropdown-item>
      <b-dropdown-item  v-else :href="item.link" exact-active-class="active" active-class="" target="_blank">{{ item.name }}</b-dropdown-item>
    </span>
  </b-nav-item-dropdown>
</div>
</template>

<script>
export default {
  name: "menu-dropdown-item",
  props:{
    text : {
      type : String
    },
    items : {
      type : Array,
      default : null
    }
  },
  data(){
    return {
      isOpen : false
    }
  },
  methods:{
    isExternalLink(link){
      if(link.substr(0,7) == "http://" || link.substr(0,8) == "https://"){
        return true
      }

      return false
    },
    open(is){
      this.isOpen = is;
    }
  }
}
</script>

<style scoped>

</style>
