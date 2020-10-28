import { request } from "./request";

export function getDetail(iid) {
  return request({
    url: "/detail",
    params: {
      iid
    }
  });
}
export function getRecommend(){
  return request({
    url:'/recommend'
  })
}
// 整合数据   下面用的是ES6的类的语法来创建对象，其实也可以使用构造函数来创建对象

// 获取商品数据
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.realPrice = itemInfo.lowNowPrice;
  }
}

// 获取店铺信息
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
  }
}

// 获取商品参数
export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    if(rule){
      this.sizes = rule.tables;
    }else{
      this.sizes = [];
    }
  }
}
// 用构造函数来创建对象
// export function GoodsParam(info,rule){
//   this.image = info.images ? info.images[0] : '';
//   this.infos = info.set;
//   this.sizes = rule.tables;
// }
