<template>
  <div id="shopcart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ cartListLength }})</div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import navBar from "components/common/navbar/navBar";
import cartList from "views/shopcart/shopcartchild/cartList";
import cartBottomBar from "views/shopcart/shopcartchild/cartBottomBar";
// 从vuex导入getters的辅助函数
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  components: {
    navBar,
    cartList,
    cartBottomBar
  },
  computed: {
    // 在计算属性使用mapGetters辅助函数，这样getters里边的方法在这里配置了后，
    // 使用就不需要$store.getters.cartListLength，如果多个就在数组后追加就好了
    ...mapGetters(["cartListLength"])
    // 也可以用对象的方式，给getters的方法起别名
    // ...mapGetters({
    //   length:'cartListLength',
    // })
  }
};
</script>
<style scoped>
#shopcart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  position: relative;
  top: 0;
  z-index: 999;
}

</style>
