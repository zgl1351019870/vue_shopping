export default {
  // 尽量让mutations的每个方法只负责一样事情，这样方便调试追踪，actions不仅仅可以处理异步，也可以处理一些复杂的方法。
  // 上面的mutations的addCart方法做了两件事情，一个是如果商品已经存在在cartList就让其数量加1，另一个是将原本不存在的商品添加到cartList里，我们可以将两件事情抽离成两个mutations方法，配合actions来完成，虽然代码看上去复杂了点，但是更符合vuex的要求而且方便devtools调试。
  // addCart(context,payload){
  //   let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
  //   if(oldProduct){
  //     // oldProduct.count += 1;把这一步分离给mutations的addCounter
  //     context.commit('addCounter',oldProduct);
  //   }else{
  //     payload.count = 1;
  //     // context.state.cartList.push(payload);把这一步分离给mutations的addToCart
  //     context.commit('addToCart',payload);
  //   }
  // }
  addCart(context, payload) {
    return new Promise(resolve => {
      let oldProduct = context.state.cartList.find(
        item => item.iid === payload.iid
      );
      if (oldProduct) {
        // oldProduct.count += 1;把这一步分离给mutations的addCounter
        context.commit("addCounter", oldProduct);
        resolve('购物车数量+1');
      } else {
        payload.count = 1;
        // context.state.cartList.push(payload);把这一步分离给mutations的addToCart
        context.commit("addToCart", payload);
        resolve('加入购物车成功');
      }
    });
  }
};
