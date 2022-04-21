<template>
  <video ref="videoPlayer" class="video-js" ></video>
</template>

<script>
import videojs from 'video.js';

export default {
  name: "VideoPlayer",
  props: {
    options: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      player: null
    }
  },
  mounted() {
    this.player = videojs(this.$refs.videoPlayer, this.options, function onPlayerReady() {
      console.log('onPlayerReady', this);
    })
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose()
    }
  }
}
</script>

<style scoped>
  .video-js{
    width:100%;
    height: 0;
    padding-bottom:76%;
    border-radius: 16px;
    overflow: hidden;

  }
  .video-js video{
    object-fit: fill;
    border-radius: 20px;
  }
  .vjs-fullscreen{
    padding:0;
  }
  .vjs-fullscreen video{
    object-fit: contain !important;
    -o-object-fit: contain !important;
  }
</style>
