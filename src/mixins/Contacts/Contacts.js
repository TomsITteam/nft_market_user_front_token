import company from "@/data/company.json";

export default {
  data(){
    return{
      window : null,
      company : {...company},
      loading : false,
      formData:{
        name : "",
        email : "",
        subject : "",
        message : ""
      }
    }
  },
  methods:{
    onSubmit(event){
      event.preventDefault()
      this.sendMessage()
    },
    async sendMessage(){
      if(this.loading == true){
        return
      }

      this.loading = true

      var result = await this.$api.contacts({
        data : {
          name : this.formData.name,
          email : this.formData.email,
          subject : this.formData.subject,
          message : this.formData.message
        }
      })

      this.loading = false

      if(result.error != undefined){
        alert(result.error.message)
        return
      }else if(result.created != true){
        alert(this.$t('alert.alert5'))
        return
      }

      this.formData.name = ""
      this.formData.email = ""
      this.formData.subject = ""
      this.formData.message = ""
      alert(this.$t('alert.alert6'))
    }
  },
  created() {
    document.title = "문의하기 | " + this.$env.VUE_APP_NAME
  }
}
