<template>
  <router-view></router-view>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods:{
    ...mapActions('exchange',[
      'loadPrice'
    ]),
    ...mapActions('payTokens',[
      'loadPayTokens'
    ])
  },
  created() {
    if(this.langLocale != 'ko'){
      this.$i18n.locale = this.langLocale
    }

    this.loadPrice("")
    this.loadPayTokens()
  }
}
</script>
