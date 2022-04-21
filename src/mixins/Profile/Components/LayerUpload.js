import Create from "@/mixins/Profile/Create";

export default {
  mixins:[Create],
  data(){
    return {
      selecteLayerData : {},
      selectLayer : {

      },
      previewThumbnail : null,
    }
  },
  methods:{
    async createdNft(){
      if(this.loading == true) {
        return
      }

      this.loading = true

      let layers = this.selectedToLayers()
      console.log(layers)
      let result = await this.$api.createdNFT({
        data : {
          layers : layers,
          nft_file        : this.formData.file,
          nft_thumbnail        : this.formData.thumbnail,
          nft_category        : this.formData.category,
          nft_name       : this.formData.name,
          nft_description : this.formData.description,
        }
      })
      this.loading = false
      if(result == false){
        return
      }else if(result.error != undefined){
        alert(result.error.message)
        return
      }

      this.$router.push({
        name : "Nft",
        params: { nft_id: result.id }
      })
    },
    selectedToLayers(){
      let previewLayers = []
      for (var key in this.selectLayer){
        let value = this.selectLayer[key]

        previewLayers.push(JSON.stringify({
          type : key,
          value : value
        }))
      }

      return previewLayers
    },
    async changeLayerPreview(){
      let previewLayers = this.selectedToLayers()
      let result = await this.$api.genLayerImage({
        data : {
          layers : previewLayers
        }
      })
      if(result.image_url == undefined){
        return
      }

      this.previewImage = result.image_url
    },
    changeLayerSelect(type){
      let layers = window.front_env.VUE_APP_LAYERS

      var layer = {}
      for (var item of layers){
        if(item.type == type && item.value == this.selectLayer[type]){
          layer = item
          break
        }
      }

      this.changeLayerPreview()
    },
    reset(){
      let layers = window.front_env.VUE_APP_LAYERS

      let selecteLayerData = {}
      for (var layer of layers){
        let layerType = layer.type
        if(selecteLayerData[layerType] == undefined){
          selecteLayerData[layerType] = []
        }

        selecteLayerData[layerType].push({
          text : layer.value,
          value : layer.value,
        })
      }

      this.selecteLayerData = selecteLayerData
    },
    beforeCreated(){
      this.reset()
    }
  },

}
