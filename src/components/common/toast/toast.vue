<template>
  <div class="toast">
    {{message}}
  </div>
</template>

<script>
export default {
  name: "toast",
  props:{
    message:{
      type:String,
      default(){
        return '';
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
.toast{
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  padding: 10px;
  color: #fff;
  text-align: center;
}
</style>