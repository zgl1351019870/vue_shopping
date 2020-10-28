<template>
  <div class="goods clear-fix">
    <goods-list-item v-for="(item,index) of goodslist" :key="index" :item = "item"></goods-list-item>
  </div>
</template>

<script>
import goodsListItem from "./goodsListItem"

export default {
  props:{
    goodslist:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data () {
    return {
    }
  },
  components:{
    goodsListItem,
  }
}
</script>
<style scoped>
.goods{
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-around; */
  /* 均等分 */
  justify-content: space-evenly;
}
</style>