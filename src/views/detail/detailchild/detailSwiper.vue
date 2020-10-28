<template>
  <swiper class="swiper-height">
    <swiper-item v-for="(item,index) of topImages" :key="index">
      <img :src="item">
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from "components/common/swiper"
export default {
  props:{
    topImages:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data () {
    return {
    }
  },
  components:{
    Swiper, 
    SwiperItem,
  }
}
</script>
<style scoped>
.swiper-height{
  height: 300px;
  overflow: hidden;
}
</style>