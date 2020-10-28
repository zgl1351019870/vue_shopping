<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item, index) in cartList" :key="index" :itemInfo = "item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import scroll from "components/common/scroll/scroll";
import cartListItem from "./cartListItem"
export default {
  name: "cartList",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["cartList"])
  },
  components: {
    scroll,
    cartListItem
  },
  activated() {
    this.$refs.scroll.refresh();
    // console.log("abc");
  }
};
</script>
<style scoped>
.cart-list {
  height: calc(100% - 44px - 49px - 40px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>
