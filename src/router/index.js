import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/index.vue'
import Login from '../views/login.vue'
import Console from '../views/console.vue'
import ResetPassword from '../views/resetPassword.vue'
import registerNew from '../views/registerNew.vue'

const routes = [
    {
        path: '/',
        name: 'Index',
        component: Index,
        meta: {
            title: '豆油拌饭Dの歌单'  // 在meta字段中定义中文名称
        }
    },
    {
        path: '/douyou/console',
        name: 'Console',
        component: Console,
        meta: {
            title: '豆油拌饭Dの控制台'  // 在meta字段中定义中文名称
        }
    },
    {
        path: '/resetPassword',
        name: 'ResetPassword',
        component: ResetPassword
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/registerNew',
        name: 'registerNew',
        component: registerNew
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router