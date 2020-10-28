<template>
  <nav-bar>
    <div slot="left" @click="back">
      <img src="~assets/img/common/back.svg" class="goback" />
    </div>
    <div slot="center" class="detail-nav">
      <div 
        class="detail-nav-item" 
        v-for="(item, index) of title" 
        :key="index"
        :class="{active:index == currentIndex}"
        @click="titleClick(index)">
        {{ item }}
      </div>
    </div>
  </nav-bar>
</template>

<script>
import navBar from "components/common/navbar/navBar";

export default {
  data() {
    return {
      title: ["商品", "参数", "评论", "推荐"],
      currentIndex:0
    };
  },
  components: {
    navBar
  },
  methods: {
    titleClick(index){
      this.currentIndex = index;
      this.$emit('titleClick',index);
    },
    back(){
      this.$router.back()
    }
  },
};
</script>
<style scoped>
.detail-nav {
  display: flex;
}
.detail-nav-item {
  flex: 1;
  font-size: 14px;
}
.goback {
  margin-top: 10px;
}
.active{
  color: var(--color-high-text);
}
</style>
