export default {
  props : {
    nft : {
      required : true,
      type : Object
    }
  },
  computed:{
    profile(){
      if(this.nft.interface == 'erc1155'){
        return this.nft.creator
      }

      return this.nft.owner
    },
    nftAmount(){
      if(this.nft.offer == undefined || this.nft.offer.isForSale != true){
        return this.nft.price
      }

      return this.nft.offer.minValue
    },
    priceTitle(){
      if(this.nft.offer != undefined && this.nft.offer.isForSale == true){
        return this.$t('nft.auction')
      }

      return this.$t('nft.buy_now')
    },
    isSale(){
      if(this.nft.offer == undefined){
        return false
      }

      return this.nft.offer.isForSale
    },
    locationHref(){
      return window.location.href
    },
  },
  watch:{
    time(val){
      if(this.nft == undefined || this.nft.offer == undefined || this.nft.offer.endTime == undefined){
        return ""
      }

      let remainingsScond = this.nft.offer.endTime - val
      if(remainingsScond < 0){
        this.remainingTime = '00:00'
        return
      }else if(remainingsScond > 86400){
        this.remainingTime =parseInt(remainingsScond / 86400) + this.$t('nft.day')
        return
      }

      let hours = parseInt(remainingsScond / 3600)

      remainingsScond -= hours * 3600
      if(hours < 10){
        hours = "0" + hours
      }

      let minutes = parseInt(remainingsScond  / 60)
      remainingsScond -= minutes * 60
      if(minutes < 10){
        minutes = "0" + minutes
      }

      let scond  = parseInt(remainingsScond )
      remainingsScond -= scond
      if(scond < 10){
        scond = "0" + scond
      }

      if(hours > 0){
        this.remainingTime = `${hours}:${minutes}`
        return
      }

      this.remainingTime = `${minutes}:${scond}`
    }
  },
  data(){
    return {
      nftData : null,
      timer : null,
      time : 0,
      remainingTime : '00:00',
      active : false,
      mouse:false,
    }
  },
  methods:{
    setTime(){
      this.time = parseInt((new Date()).getTime() / 1000)
    },
    startTimer() {
      this.timer = setInterval(() => this.setTime(), 1000);
    },

    mouseover(){
      this.mouse = true
    },
    mouseleave(){
      this.mouse = false
    }
  },
  created() {
    this.nftData = this.nft

    if(this.nftData.interface == 'erc1155'){
      return
    }

    this.setTime()
    this.startTimer()
  }
}
