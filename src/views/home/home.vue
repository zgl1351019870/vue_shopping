<template>
  <div id="home">
    <!-- 主页导航开始 -->
    <nav-bar class="nav-home">
      <div slot="center">小优购物街</div>
    </nav-bar>
    <!-- 主页导航结束 -->

    <!-- 障眼法搞定tabControl的吸顶效果，因为better-scroll本身的问题挺多，直接在原来的tabControl里面让滚动到一定位置改为fixed定位在better-scroll不起作用，所以这里用了点技巧，再弄一个tabControl -->
    <tab-control
      class="tab-control"
      :title="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"
    ></tab-control>



    <scroll
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      :probe-type="3"
      :pull-up-load="true"
      @loadMore="loadMore"
    >
      <!-- 主页轮播图开始 -->
      <home-swiper
        :banners="banners"
        @swiperImageLoad.once="swiperImageLoad"
      ></home-swiper>
      <!-- 主页轮播图结束 -->

      <!-- 主页商品推荐开始 -->
      <home-recommend :recommends="recommends"></home-recommend>
      <!-- 主页商品推荐结束 -->

      <!-- 主页商品专栏开始 -->
      <home-feature></home-feature>
      <!-- 主页商品专栏结束 -->

      <!-- 展示分类开始 -->
      <tab-control
        class="tab-control"
        :title="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <!-- 展示分类结束 -->

      <!-- 商品展示开始 -->
      <goods-list :goodslist="showGoods"></goods-list>
      <!-- 商品展示结束 -->
    </scroll>
    <!-- 返回顶部，组件事件需要加native修饰符 -->
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
// 导入components组件
import navBar from "components/common/navbar/navBar";
import tabControl from "components/content/tabControl/tabControl";
import goodsList from "components/content/goods/goodsList";
import scroll from "components/common/scroll/scroll";
import backTop from "components/content/backTop/backTop";

// 导入home内容组件
import homeSwiper from "./homechild/homeSwiper";
import homeRecommend from "./homechild/homeRecommend";
import homeFeature from "./homechild/homeFeature";

// 导入home组件专属的axios网络请求
import { getHomeMultiData, getHomeGoods } from "network/home.js";

// 导入common，工具
import { debounce } from "common/utils.js";

export default {
  name: "home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        //每个选项都有图片数据和页数，list数组装数据
        // 流行
        pop: { page: 0, list: [] },
        // 新款
        new: { page: 0, list: [] },
        // 精选
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed:false,
      saveY:0,
    };
  },
  components: {
    navBar,
    tabControl,
    goodsList,
    scroll,
    backTop,

    homeSwiper,
    homeRecommend,
    homeFeature
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  methods: {
    /*
     *事件监听相关
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backTop() {
      // console.log('scroll');
      // better-scrll实例有个scrollTo方法 scrollTop(x,y,time)，可以设置滚动位置及时间
      // this.$refs.scroll.scroll.scrollTo(0,0,500);
      // 上面的代码一般人看不知道在干嘛，两个scroll，久了看可能会比较懵，我们可以在scroll组件中封装一下
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    contentScroll(position) {
      // console.log(position);
      // 只有下滑距离大于1000才显示backtop
      // 因为position默认是负值，所以用-转+
      this.isShowBackTop = -position.y > 1000;

      // tabControl吸顶
      this.isTabFixed = (-position.y) > this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
      // 让上拉加载更多可以多次触发
      this.$refs.scroll.finishPullUp();
    },
    swiperImageLoad() {
      // console.log(this.$refs.tabControl.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    /*
     *网络请求相关
     */
    // 将网络请求的方法封装在这里，然后created直接调用就行了，这样的好处是逻辑清晰，因为像方法处理这些东西放在methods比较好，created钩子函数只需调用就可以了
    getHomeMultiData() {
      getHomeMultiData().then(res => {
        // console.log(res);
        // 把接受过来的数据放进data里面
        this.banners = res.data.data.banner.list; //这里这么长主要是轮播图的数据就是放在接口数据比较里面，要一层一层拿，通过打印res就可以看到
        this.recommends = res.data.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      // 要让参数page是数组goods里的page加一，然后才把数据放进list
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        // console.log(res);
        // 如果要将一个数组的内容追加进另一个数组，可以用for循环，但是这里可以有个更简便的方法，push方法有一个可变参数，他可以传多个元素，那么我们可以用...，
        // ...可以解析数组，将数组的元素一个一个取出来
        this.goods[type].list.push(...res.data.data.list);
        // 更新数组中page的值
        this.goods[type].page += 1;
      });
    }
  },
  created() {
    // 获取主页数据，注意这里要加this，表示调用的是methods的getHomeMultData而不是从home.js导入进来的
    this.getHomeMultiData();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 接收由goodsListItem传过来的自定义函数
    // 无防抖
    // this.$bus.$on("itemImageLoad", () => {
    //   // 在这里加个判断，因为可能出现找不到this.$refs.scroll的情况，也就是主页挂载后但是scroll组件还没挂载所以拿scroll会找不到，就有时候会出现这种情况。
    //   if (this.$refs.scroll) {
    //     this.$refs.scroll.refresh();
    //     console.log("---");
    //   }
    // });

    // 防抖函数使用  debounce被封装到common下的utils.js文件里
    this.$bus.$on(
      "homeItemImageLoad",
      debounce(() => {
        if (this.$refs.scroll) {
          this.$refs.scroll.refresh();
        }
      }, 100)
    );
  },
  activated() {
    // 保险起见刷新一下，不然可能还有BUG，这里要放前面
    this.$refs.scroll.refresh();
    // 活跃时将滚动位置还原
    this.$refs.scroll.scrollTo(0,this.saveY,0);
  },
  deactivated() {
    // 不活跃时保存滚动位置
    this.saveY = this.$refs.scroll.getScrollY();
  },
};
</script>
<style scoped>
#home {
  padding-top: 44px;
  /* home高度要占100%视口高度 */
  height: 100vh;
  position: relative;
}
.nav-home {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
.tab-control {
  position: relative;
  z-index: 999;
}
.content {
  /* 这里类名叫content，而scroll里也有个content，但是不会冲突因为style加了scoped作用域 */
  /* 让内容撑满中间 */
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
