import company from "@/data/company.json";
import footer from "@/data/footer.json";

export default {
  computed:{
    categoryRow(){
      let result = this.$env.VUE_APP_CATEGORY.length / 4
      if(result < 1){
        return 1
      }else if(parseInt(result) < result){
        return parseInt(result) + 1
      }

      return parseInt(result)
    },
    langText(){
      if(this.langLocale == 'ko'){
        return "한국어"
      }else if(this.langLocale == 'en'){
        return "English"
      }else if(this.langLocale == 'cn'){
        return "中文"
      }

      return ""
    }
  },
  data(){
    return {
      company : {...company},
      footer : {...footer}
    }
  },
  methods:{
    categoryLine(row){
      if(row == 1){
        return 3
      }else if(row == this.categoryRow){
        return this.$env.VUE_APP_CATEGORY.length - ((row-1) * 4) + 1
      }

      return 4
    },
    categoryNmae(n,n2){
      if(n == 1){
        return this.$env.VUE_APP_CATEGORY[((n-1)*4)+(n2-1)].name
      }

      return this.$env.VUE_APP_CATEGORY[((n-1)*4)+(n2-2)].name
    },
    categoryText(n,n2){
      if(n == 1){
        return this.$env.VUE_APP_CATEGORY[((n-1)*4)+(n2-1)].footer
      }

      return this.$env.VUE_APP_CATEGORY[((n-1)*4)+(n2-2)].footer
    }
  },
}
