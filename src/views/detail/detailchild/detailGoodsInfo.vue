<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{ detailInfo.desc }}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{ detailInfo.detailImage[0].key }}</div>
    <div class="info-list">
      <img
        v-for="(item, index) in detailInfo.detailImage[0].list"
        :src="item"
        alt=""
        :key="index"
        @load="imageLoad"
      />
    </div>
  </div>
</template>

<script>
import {debounce} from "common/utils"
export default {
  name: "detailGoodsInfo",
  props: {
    detailInfo: {
      type: Object
    }
  },
  data(){
    return {
      counter:0,
      detailImageLength:0,
    }
  },
  methods: {
    imageLoad(){
      // 只加载到最后一张图片然后刷新scroll
      this.counter += 1;
      if(this.counter === this.detailImageLength)
        this.$emit('imageLoad');
    }
  },
  watch: {
    // 监听detailInfo变化，获取到把长度赋值给detailImageLength，也可以不做这一步，直接在上边
    // counter===this.detailInfo.detailImage[0].list.length也行，但是这样每次调用图片加载函数就要获取一次比较麻烦，而监听的话获取一次就行了
    detailInfo(){
      this.detailImageLength = this.detailInfo.detailImage[0].list.length;
    }
  },
};
</script>

<style scoped>
.goods-info {
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;
}

.info-desc {
  padding: 0 15px;
}

.info-desc .start,
.info-desc .end {
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
  position: relative;
}

.info-desc .start {
  float: left;
}

.info-desc .end {
  float: right;
}

.info-desc .start::before,
.info-desc .end::after {
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #333;
  bottom: 0;
}

.info-desc .end::after {
  right: 0;
}

.info-desc .desc {
  padding: 15px 0;
  font-size: 14px;
}

.info-key {
  margin: 10px 0 10px 15px;
  color: #333;
  font-size: 15px;
}

.info-list img {
  width: 100%;
}
</style>
