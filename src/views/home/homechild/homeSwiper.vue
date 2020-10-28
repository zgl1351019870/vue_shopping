<template>
  <swiper>
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" @load="swiperImageLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from "components/common/swiper/index"
export default {
  name:'homeSwiper',
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
      isLoad:false,
    };
  },
  components:{
    Swiper,
    SwiperItem,
  },
  methods: {
    swiperImageLoad(){
      // 实际上只需要一张图片加载完就可以了，不需要监听所有
      // if(!this.isLoad){
      //   this.$emit('swiperImageLoad');
      //   this.isLoad = true;
      // }
      // 直接在home里接收那里加.oncec修饰符就可以了
      this.$emit('swiperImageLoad');
    }
  },
};
</script>
<style scoped></style>
