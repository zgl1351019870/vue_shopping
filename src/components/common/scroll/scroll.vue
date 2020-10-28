<template>
<!-- 封装better-scroll -->

<!-- ref如果是绑定在组件中，this.$refs.xxx就是获取组件对象 -->
<!-- ref如果是绑定在普通元素中，this.$refs.xxx就是获取元素对象 -->
<!-- 在mounted函数中需要获取元素对象，但是用js的获取方式根据类名获取的不是很恰当，因为其他地方有可能会出现类的命名冲突，而且vue也不推荐我们使用原生js来操作dom，所以我们最好还是使用vue的方式来获取元素对象 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll"
export default {
  props:{
    probeType:{
      type:Number,
      default(){
        return 0;
      }
    },
    pullUpLoad:{
      type:Boolean,
      default(){
        return false;
      }
    }
  },
  data () {
    return {
      scroll:null,
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper,{
      click:true,
      probeType:this.probeType,
      pullUpLoad:this.pullUpLoad,
    })
    // 设置滚动位置scrollTo()
    // this.scroll.scrollTo(0,0);

    // 当父组件传过来的probeType为3时，下面才会执行
    this.scroll.on("scroll",(position) => {
      // 将滚动事件发送给父组件home
      this.$emit("scroll",position)
      // console.log(position);
    })

    // 上拉加载更多
    this.scroll.on("pullingUp",() => {
      this.$emit("loadMore");
    })
  },
  methods: {
    scrollTo(x,y,time = 300){
      return this.scroll.scrollTo(x,y,time);
    },
    refresh(){
      return this.scroll.refresh();
    },
    finishPullUp(){
      return this.scroll.finishPullUp();
    },
    getScrollY(){
      return this.scroll.y;
    }
  },
}
</script>
<style scoped>
</style>