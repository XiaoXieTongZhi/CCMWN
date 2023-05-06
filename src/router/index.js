import { createRouter,createWebHashHistory } from "vue-router";

const routes =[
    {
        path:'/',
        redirect:'wall',
        name:'index',
        //先显示路由的组件 在重定向到wall加载wall组件
        component:()=>import('@/view/Index'),
        children:[
            {
                path:'wall',
                component:()=>import('../view/wallmessage.vue')
                
            },
            {
                path:'tool',
                component:()=>import('../view/tool.vue')
            }
        ]
    }
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})
export default router