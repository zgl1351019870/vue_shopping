<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
}
</script>
<style scoped>
.nav-bar{
  display: flex;
  height: 44px;
  line-height: 44px;
  box-shadow: 0 1px 5px #333;
  text-align: center;
}
.left , .right{
  width: 60px;
  /* background: rosybrown; */
}
.center{
  flex: 1;
  /* background: royalblue; */
}
</style>