import Vue from 'vue'
import Router from 'vue-router'
import { Dialog} from 'vant';
import { Toast} from 'vant';
import store from '../store/index.js'
import HelloWorld from '@/components/HelloWorld'
import first from '@/components/home/first'
import user from '@/components/user/user'
import msg from '@/components/home/msg'
import test from '@/components/new_meet/test'
import account from '@/components/user/account'
import identify from '@/components/user/identify'
import room from '@/components/room/room'
import department from '@/components/user/department'
import room_list from '@/components/room/room_list'
import room_detail from '@/components/room/room_detail'
import meet_list from '@/components/meet/meet_list'
import member from '@/components/user/member.vue'
import login from '@/components/login/login.vue'
import add_room from '@/components/room/add_room.vue'
import meet_detail from '@/components/meet/meet_detail.vue'
import meet_rf from '@/components/meet/meet_rf.vue'
import success from '@/components/new_meet/success'
import register from '@/components/login/register.vue'
Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      name: 'login',
      component: login,
      beforeEnter: (to, from, next) => {
        if(from.path =='/first'){
          next('/first')
        }else{
          next()
        }
      }
    }, {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },{
      path:'/success',
      name:'success',
      component:success
    },
    {
      path: '/user',
      name: 'user',
      component: user,
      beforeEnter: (to, from, next) => {
        if(from.path =='/'){
          next('/')
        }else{
          next()
        }
      }
    }, {
      path: '/msg',
      name: 'msg',
      component: msg
    }, {
      path: '/first',
      name: 'first',
      component: first,
      meta: {
        requireAuth: true
      },
    }, {
      path: '/account',
      name: 'account',
      component: account
    }, {
      path: '/identify',
      name: 'identify',
      component: identify
    }, {
      path: '/member',
      name: 'member',
      component: member
    }, {
      path: '/room',
      name: 'room',
      component: room
    }, {
      path: '/room_list',
      name: 'room_list',
      component: room_list
    }, {
      path: '/room_detail',
      name: 'room_detail',
      component: room_detail
    }, {
      path: '/add_room',
      name: 'add_room',
      component: add_room
    },
    {
      path: '/department',
      name: 'department',
      component: department
    }, {
      path: '/meet_list',
      name: 'meet_list',
      component: meet_list
    }, {
      path: '/meet_detail',
      name: 'meet_detail',
      component: meet_detail
    }, {
      path: '/meet_rf',
      name: 'meet_rf',
      component: meet_rf
    }
  ],
  //mode: "history"
})
router.beforeEach((to, from, next) => {
  const token = store.state.token;
  const identify = store.state.identify;
  if (to.meta.requireAuth) {
    query: {
      redirect: to.fullPath
    }
    if (identify) {
      next();
      var tool = new igexinTool();
      tool.bindAlias(store.state.phone);
      console.log(store.state.phone)
    } else {
      console.log("身份未识别");
      Dialog({
        message: '当前身份未识别，请前往验证',
        confirmButtonText: '前往认证'
      }).then(() => {
        next({
          path: '/identify'
        })
      });
    }
    next()
  }
  else {
    next()
  }
})
router.afterEach(route => {
  const loading = store.state.Loading;
  if (loading) {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      loadingType: 'spinner',
    });
  } else {
    Toast.clear();
  }
})

export default router
