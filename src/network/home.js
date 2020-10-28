// 封装axios之专门对home首页的网络请求进行封装
// 封装前 home.vue进行网络请求就是 request({url:'/home/multidata'}).then()，现在将then前的这些代码有进行一次封装，让组件只处理执行结果then()
// 好处：这样子 home.js就对应home.vue的网络请求，解耦，维护更好等等
import {request} from './request'

export function getHomeMultiData(){
  return request({
    url:'/home/multidata'
  })
}

export function getHomeGoods(type,page){
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}