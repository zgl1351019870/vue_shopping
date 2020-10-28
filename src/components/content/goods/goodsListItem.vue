<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImage" @load="imageLoad">
    <div class="goods-item-text">
      <p>{{item.title}}</p>
      <span class="price">{{item.price}}</span>
      <span class="collect">{{item.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    item:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data () {
    return {
    }
  },
  computed: {
    showImage(){
      return this.item.img || this.item.image || this.item.show.img;
    }
  },
  methods: {
    imageLoad(){
      // 监听图片加载完成事件，并且使用事件总线发射一个自定义事件
      // 因为主页和详情页都是用了goodsList，所以这里要判断一下
      if(this.$route.path == '/home'){
        this.$bus.$emit('homeItemImageLoad');
      }else if(this.$route.path.indexOf('/detail') !== -1){
        this.$bus.$emit('detailItemImageLoad');
      }else if(this.$route.path == '/category'){
        this.$bus.$emit('categoryItemImageLoad');
      }
    },
    itemClick(){
      this.$router.push('/detail/'+this.item.iid);
    }
  },
}
</script>
<style scoped>
.goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }
  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-item-text {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-item-text p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-item-text .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-item-text .collect {
    position: relative;
  }

  .goods-item-text .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>