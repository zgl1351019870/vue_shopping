<template>
  <div class="category-left">
    <scroll class="content">
      <div
        class="category-item"
        v-for="(item, index) in categorys"
        :key="index"
        @click="checkedClick(index)"
        :class="{ active: index == currentIndex }"
      >
        {{ item.title }}
      </div>
    </scroll>
  </div>
</template>

<script>
import scroll from "components/common/scroll/scroll";
export default {
  name: "categoryLeft",
  props: {
    categorys: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    checkedClick(index) {
      this.currentIndex = index;
      this.$emit('categoryLeftClick',index)
      this.$bus.$emit('leftClick');
    }
  },
  components: {
    scroll
  }
};
</script>
<style scoped>
.category-item {
  width: 90px;
  height: 45px;
  line-height: 45px;
  background-color: #f6f6f6;
  text-align: center;
}
.category-item.active {
  font-weight: 700;
  color: var(--color-high-text);
  background-color: #fff;
  border-left: 3px solid var(--color-high-text);
}
.content{
  height: calc(100% - 44px - 49px);
}
</style>
