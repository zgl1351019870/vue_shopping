import Vue from 'vue'
import VueRouter from 'vue-router'

const home = ()=> import('views/home/home.vue')
const category = ()=> import('views/category/category.vue')
const shopcart = ()=> import('views/shopcart/shopcart.vue')
const profile = ()=> import('views/profile/profile.vue')
const detail = ()=> import('views/detail/detail.vue')


Vue.use(VueRouter)

const routes = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component:home,
    meta:{
      title:'首页'
    }
  },
  {
    path:'/category',
    component:category,
    meta:{
      title:'分类'
    }
  },
  {
    path:'/shopcart',
    component:shopcart,
    meta:{
      title:'购物车'
    }
  },
  {
    path:'/profile',
    component:profile,
    meta:{
      title:'用户'
    }
  },
  {
    path:'/detail/:iid',
    component:detail,
    meta:{
      title:'商品详情'
    }
  }
]

const router =  new VueRouter({
  routes,
  mode:'history'
})

router.beforeEach((to,from,next) => {
  // console.log(to);
  document.title = to.meta.title;
  next();
})

export default router

// 解决连续点击同个路由报的错误 这里使用的是VueRouter而不是router变量
// 我发现下面的代码在脚手架4版本可以但是2版本不行，2版本要换种代码
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err);
};