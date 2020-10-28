<template>
  <div id="detail">
    <detail-nav
      class="detail-nav"
      @titleClick="titleClick"
      ref="nav"
    ></detail-nav>
    <scroll class="content" ref="scroll" @scroll="scroll" :probeType="3">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detailInfo="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo" ref="param"></detail-param-info>
      <detail-comment-info
        :commentInfo="commentInfo"
        ref="comment"
      ></detail-comment-info>
      <goods-list :goodslist="recommends" ref="recommend"></goods-list>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <toast :message="message" v-show="isShow"></toast>
  </div>
</template>

<script>
// 组件相关
import detailNav from "views/detail/detailchild/detailNav";
import detailSwiper from "views/detail/detailchild/detailSwiper";
import detailBaseInfo from "views/detail/detailchild/detailBaseInfo";
import detailShopInfo from "views/detail/detailchild/detailShopInfo";
import detailGoodsInfo from "views/detail/detailchild/detailGoodsInfo";
import detailParamInfo from "views/detail/detailchild/detailParamInfo";
import detailCommentInfo from "views/detail/detailchild/detailCommentInfo";
import detailBottomBar from "views/detail/detailchild/detailBottomBar";

import backTop from "components/content/backTop/backTop";
import scroll from "components/common/scroll/scroll";
import goodsList from "components/content/goods/goodsList";
import toast from "components/common/toast/toast";

import { debounce } from "common/utils";
import { mapActions } from "vuex";

// 网络请求相关
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";
export default {
  name: "detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      navScrollTos: [],
      norepeat: 0,
      isShowBackTop: false,
      // 购物车弹窗
      message: "",
      isShow: false
    };
  },
  components: {
    detailNav,
    detailSwiper,
    detailBaseInfo,
    detailShopInfo,
    detailGoodsInfo,
    detailParamInfo,
    detailCommentInfo,
    detailBottomBar,

    backTop,
    scroll,
    goodsList,
    toast
  },
  created() {
    this.iid = this.$route.params.iid;
    // 获取详情数据
    getDetail(this.iid).then(res => {
      // console.log(res);
      const data = res.data.result;
      // 获取顶部轮播图信息
      this.topImages = data.itemInfo.topImages;
      // 获取商品基本信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 获取店铺信息
      this.shop = new Shop(data.shopInfo);

      // 获取商品详细信息
      this.detailInfo = data.detailInfo;

      // 获取商品参数
      if (data.itemParams.rule) {
        this.paramInfo = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        );
      }else{
        this.paramInfo = new GoodsParam(
          data.itemParams.info,
        );
      }

      // 获取用户评论
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    // 获取推荐数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.data.list;
    });
  },
  methods: {
    ...mapActions(["addCart"]),
    imageLoad() {
      this.$refs.scroll.refresh();
      // 当图片加载完后获取各标题的top值并保存到navScrollTos上
      this.navScrollTos.push(0);
      this.navScrollTos.push(this.$refs.param.$el.offsetTop - 44); //-44是因为有个导航栏挡住了
      this.navScrollTos.push(this.$refs.comment.$el.offsetTop - 44);
      this.navScrollTos.push(this.$refs.recommend.$el.offsetTop - 44);
      // console.log(this.navScrollTos);
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.navScrollTos[index], 100);
    },
    // 滚动导航栏变色  用norepeat来防止scroll频繁赋值
    scroll(position) {
      if (
        this.norepeat !== 1 &&
        -position.y >= this.navScrollTos[0] &&
        -position.y < this.navScrollTos[1]
      ) {
        this.$refs.nav.currentIndex = 0;
        this.norepeat = 1;
      } else if (
        this.norepeat !== 2 &&
        -position.y >= this.navScrollTos[1] &&
        -position.y < this.navScrollTos[2]
      ) {
        this.$refs.nav.currentIndex = 1;
        this.norepeat = 2;
      } else if (
        this.norepeat !== 3 &&
        -position.y >= this.navScrollTos[2] &&
        -position.y < this.navScrollTos[3]
      ) {
        this.$refs.nav.currentIndex = 2;
        this.norepeat = 3;
      } else if (this.norepeat !== 4 && -position.y >= this.navScrollTos[3]) {
        this.$refs.nav.currentIndex = 3;
        this.norepeat = 4;
      }

      this.isShowBackTop = -position.y > 1000;
    },
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    addToCart() {
      // 获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 将购物车商品添加到vuex的状态中，记住不要直接修改状态而是用mutations
      // 使用promise 和 mapActions(可以将actions的方法映射到methods中，然后直接使用)
      // this.$store.dispatch('addCart',product).then(res => console.log(res));
      this.addCart(product).then(res => {
        this.message = res;
        this.isShow = true;
        setTimeout(() => {
          this.isShow = false;
          this.message = "";
        }, 1000);
      });
    }
  },
  mounted() {
    this.$bus.$on(
      "detailItemImageLoad",
      debounce(() => {
        if (this.$refs.scroll) {
          this.$refs.scroll.refresh();
        }
      }, 100)
    );
  }
};
</script>
<style scoped>
#detail {
  position: relative;
  z-index: 999;
  background-color: #fff;
  height: 100vh;
}
.content {
  /* 注意这里的父元素需要固定高度，给detail设置100vh */
  height: calc(100% - 44px - 49px);
}
.detail-nav {
  position: relative;
  z-index: 999;
  background-color: #fff;
}
</style>
