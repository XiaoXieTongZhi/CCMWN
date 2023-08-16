import { createRouter, createWebHashHistory } from "vue-router";
// import * as crypto from '../utils/crypto';
// import jwt_decode from 'jwt-decode';
// import store from '../store/index';
const routes = [
  {
    path: "/",
    redirect: "/wall",
    name: "index",
    //先显示路由的组件 在重定向到wall加载wall组件
    component: () => import("@/view/Index"),
    children: [
      {
        path: "wall",
        component: () => import("../view/wallmessage.vue"),
      },
      {
        path: "tool",
        component: () => import("../view/tool.vue"),
      },
    ],
  },
  {
    path: "/enda",
    name: "enda",
    component: () => import("../view/End.vue"),
    beforeEnter: (to, from, next) => {
      // 在这里进行权限验证或其他逻辑判断
      // 如果满足条件，可以调用 next() 方法继续跳转到 `/end` 路由
      // 如果不满足条件，可以调用 next(false) 来取消路由跳转
      const parseTokenInfo = (token) => {
        let info = token.split(".")[1];
        info = window.atob(info);
        info = JSON.parse(info);
        const message = info.message;
        let text = "";
        for (let i of message) {
          text += String.fromCodePoint(i);
        }
        return JSON.parse(text);
      };
      //示例：假设需要验证用户是否登录
        if(localStorage.getItem("token") !== null){
      let payload = parseTokenInfo(localStorage.getItem("token"));
      if (payload.Permission == "Level1") {
        next(); // 用户已登录，继续跳转到 `/end` 路由
      } else {
        next(false); // 用户未登录，跳转到登录页或其他页面
      }
    } else {
        next(false);
    }
    },
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/wall' // 重定向到 `/wall`
  }
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
