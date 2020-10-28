<template>
  <div class="category-right">
    <scroll class="content" ref="scroll">
      <div class="sub-category">
        <div
          class="sub-category-item"
          v-for="(item, index) in subCategorys"
          :key="index"
        >
          <a :href="item.link">
            <div class="item-img">
              <img :src="item.image" @load="imageLoad" />
            </div>
            <div class="item-text">{{ item.title }}</div>
          </a>
        </div>
      </div>
      <div class="category-detail">
        <tab-control
          :title="['综合', '新品', '销量']"
          @tabClick="tabClick"
        ></tab-control>
        <goods-list :goodslist="categoryDetail[currentType].list"></goods-list>
      </div>
    </scroll>
  </div>
</template>

<script>
import scroll from "components/common/scroll/scroll";
import tabControl from "components/content/tabControl/tabControl";
import goodsList from "components/content/goods/goodsList";
import {debounce} from "common/utils"
export default {
  name: "categoryRight",
  props: {
    subCategorys: {
      type: Array,
      default() {
        return [];
      }
    },
    categoryDetail: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      counter: 0,
      currentType: "pop"
    };
  },
  components: {
    scroll,
    tabControl,
    goodsList
  },
  methods: {
    imageLoad() {
      this.counter++;
      if (this.counter == this.subCategorys.length) {
        this.$refs.scroll.refresh();
        // console.log("我刷新了");
      }
    },
    tabClick(index) {
      // console.log(index);
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
    }
  },
  mounted() {
    this.$bus.$on("leftClick", () => {
      setTimeout(() => {
        this.$refs.scroll.refresh();
        // console.log("刷新");
      }, 1000);
    });
    this.$bus.$on(
      "categoryItemImageLoad",
      debounce(() => {
        if (this.$refs.scroll) {
          this.$refs.scroll.refresh();
          // console.log('zgll');
        }
      }, 100)
    );
  }
};
</script>
<style scoped>
.content {
  height: calc(100% - 44px - 49px);
}
.sub-category {
  display: flex;
  flex-wrap: wrap;
  padding-top: 10px;
}
.sub-category-item {
  width: 30%;
  margin-left: 5px;
  margin-bottom: 5px;
  text-align: center;
  /* flex: 1; */
}
.item-img img {
  width: 100%;
}
</style>
