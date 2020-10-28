<template>
  <div id="category">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="content">
      <category-left
        :categorys="categorys"
        @categoryLeftClick="categoryLeftClick"
      ></category-left>
      <category-right
        :subCategorys="subCategorys"
        :categoryDetail="categoryDetail"
      ></category-right>
    </div>
  </div>
</template>

<script>
import navBar from "components/common/navbar/navBar";

import categoryLeft from "./categorychild/categoryLeft";
import categoryRight from "./categorychild/categoryRight";
// 网络请求相关
import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from "network/category";
export default {
  name: "category",
  data() {
    return {
      categorys: [],
      currentIndex: 0,
      subCategorys: [],
      categoryDetail: {
        pop: { list: [] },
        new: { list: [] },
        sell: { list: [] }
      }
    };
  },
  components: {
    navBar,
    categoryLeft,
    categoryRight
  },
  created() {
    this.getCategory();
  },
  methods: {
    /*
     *网络请求相关
     */
    getCategory() {
      getCategory().then(res => {
        // console.log(res);
        this.categorys = res.data.data.category.list;
        // console.log(this.categorys);

        // 请求第一个分类的数据
        this.getSubcategory(0);
      });
    },
    getSubcategory(index) {
      this.currentIndex = index;
      // 这里的变量不能叫maitKey会报错
      const checked_maitKey = this.categorys[index].maitKey;
      getSubcategory(checked_maitKey).then(res => {
        // console.log(res);
        this.subCategorys = res.data.data.list;
        // console.log(this.subCategorys);
        this.getCategoryDetail("pop");
        this.getCategoryDetail("new");
        this.getCategoryDetail("sell");
      });
    },
    getCategoryDetail(type) {
      const checked_miniWallkey = this.categorys[this.currentIndex].miniWallkey;
      getCategoryDetail(checked_miniWallkey, type).then(res => {
        // console.log(res);
        this.categoryDetail[type].list = res.data;
      });
    },

    /*
     *事件相关
     */
    categoryLeftClick(index) {
      this.getSubcategory(index);
    }
  },
  computed: {
    // showGoods(){
    //   return this.categoryDetail['pop'].list;
    // }
  },
};
</script>
<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  position: relative;
  z-index: 999;
}
.content {
  display: flex;
  height: 100vh;
  /* width: 100vh; */
}
</style>
