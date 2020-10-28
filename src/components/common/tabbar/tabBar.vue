<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  
};
</script>
<style scoped>
#tab-bar {
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f6f6f6;
  /* 盒子阴影 参数为 水平阴影 垂直阴影 模糊距离 阴影尺寸 颜色 */
  box-shadow: 0 -1px 5px rgba(100, 100, 100, 0.8);
}

</style>
