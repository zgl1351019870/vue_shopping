<template>
  <div class="recommend">
    <div v-for="(item,index) in recommends" :key="index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    recommends:{
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
}
</script>
<style scoped>
.recommend{
  display: flex;
  padding: 15px 0 20px;
  border-bottom: 8px solid #eee;
}
.recommend-item{
  flex: 1;
  text-align: center;
  font-size: 14px;
}
.recommend-item img{
  width: 80%;
}

</style>