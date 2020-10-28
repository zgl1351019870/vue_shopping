<template>
  <div class="cart-bottom-bar">
    <div class="check-content">
      <CheckButton 
        class="check-button" 
        :isChecked = "isSelectAll"
        @click.native="checkAll"></CheckButton>
      <span>全选</span>
    </div>
    <div class="total-price">
      <span>合计:{{totalPrice}}</span>
    </div>
    <div class="calc" @click="calcClick">
      <span>去计算({{checkedLength}})</span>
    </div>
    <toast :message = "message" v-show="isShow"></toast>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/checkButton'
import toast from "components/common/toast/toast"

export default {
  name: "cartBottomBar",
  data () {
    return {
      message:'',
      isShow:false,
    }
  },
  components:{
    CheckButton,
    toast,
  },
  computed: {
    totalPrice(){
      return '￥' + this.$store.state.cartList.filter(item => {
        return item.checked;
      }).reduce((preValue,item) => {
        return preValue + item.price * item.count;
      },0).toFixed(2);
    },
    checkedLength(){
      return this.$store.state.cartList.filter(item => {
        return item.checked;
      }).length;
    },
    isSelectAll(){
      if(this.$store.state.cartList.length === 0) return false;
      // return !(this.$store.state.cartList.filter(item => !item.checked).length);
      return !this.$store.state.cartList.find(item => !item.checked);
    }
  },
  methods: {
    checkAll(){
      // 如果全部被选中则全不选
      if(this.isSelectAll){
        this.$store.commit('allNoChecked');
      }else{//反之则全选
        this.$store.commit('allChecked');
      }
    },
    calcClick(){
      if(this.checkedLength == 0){
        this.message = '请选择要结算的商品';
        this.isShow = true;
        setTimeout(() => {
          this.isShow = false;
          this.message = '';
        }, 1000);
      }
    }
  },
}
</script>
<style scoped>
.cart-bottom-bar{
  height: 40px;
  background-color: #eee;
  display: flex;
}
.check-content{
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}
.check-button{
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
.total-price{
  line-height: 40px;
  margin-left: 20px;
  flex: 1;
}
.calc{
  line-height: 40px;
  width: 90px;
  background-color: red;
  color: #fff;
  text-align: center;
}
</style>