export default {
  // addCart(state,payload){
  //   // 先判断传进来的payload是否在cartList已经存在，如果存在就判定为已经存在的商品oldProduct
  //   // let oldProduct = null;
  //   // for(let item of state.cartList){
  //   //   if(payload.iid === item.iid){
  //   //     oldProduct = item;
  //   //   }
  //   // }
  //   // 可以使用数组函数find来判断oldProduct一句话搞定
  //   let oldProduct = state.cartList.find(item => item.iid === payload.iid);

  //   // 对已经存在的商品进行数量的加1，而如果不是已经存在的商品，则将数量设置为1并且追加到cartList数组中
  //   if(oldProduct){
  //     oldProduct.count += 1;
  //   }else{
  //     payload.count = 1;
  //     state.cartList.push(payload);
  //   }
  // }
  addCounter(state,payload){
    payload.count += 1;
  },
  addToCart(state,payload){
    // 将商品的购物车是否选中放进对象模型里
    payload.checked = true;
    state.cartList.push(payload);
  },
  // 按钮点击更改状态
  checkedChange(state,payload){
    payload.checked = !payload.checked;
  },

  // 全不选
  allNoChecked(state){
    state.cartList.forEach(item => item.checked = false);
  },
  // 全选
  allChecked(state){
    state.cartList.forEach(item => item.checked = true);
  }
}