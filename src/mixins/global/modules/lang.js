import {mapGetters,mapState,mapActions} from "vuex";


export default {
  computed: {
    ...mapState('lang', {
      langLocale : state => state.locale
    }),
  },
  methods:{
    ...mapActions('lang',[
      'changeLocale'
    ]),
  }
}
