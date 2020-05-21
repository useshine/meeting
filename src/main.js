// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//图标
import feather from 'vue-icon'
//mui
import mui from '../static/mui/js/mui.min.js'
import '../static/mui/css/mui.min.css'
import '../static/mui/css/mui.picker.min.css'
//日历
import vueHashCalendar from 'vue-hash-calendar'
import 'vue-hash-calendar/lib/vue-hash-calendar.css'
//评分
import {Rate} from 'element-ui'
//vant
import {Notify} from 'vant'
import Vant from 'vant'
import 'vant/lib/index.css'
import {Dialog} from 'vant';
import {Toast} from 'vant';
import {Search} from 'vant';
import {DatetimePicker} from 'vant';
//vuex
import Vuex from 'vuex'
import store from './store/index.js'
import {Calendar} from 'vant';
//axios
import axios from 'axios'
import './assets/css/common.css'

Vue.prototype.mui = mui

Vue.use(feather, 'v-icon')
Vue.use(vueHashCalendar)
Vue.use(Rate)
Vue.use(Vant)
Vue.use(Notify);
Vue.use(Vuex);
Vue.use(Dialog);

Vue.config.productionTip = false
//axios.defaults.withCredentials=true
axios.defaults.baseURL = 'http://120.26.48.169:8081';

Vue.prototype.axios = axios

var meet_id;

document.addEventListener("plusready", function() {
  plus.runtime.setBadgeNumber(0);
  plus.push.setAutoNotification(true);
  // 监听点击消息事a件
  plus.push.addEventListener("click", function(msg) {
    switch (msg.payload) {
      case "LocalMSG":
        console.log(msg.content)
        router.push({
          path: 'meet_detail',
          query: {
            'meetid': meet_id
          }
        }).catch(data => {})
        break;
      default:
        console.log(msg.content)
        router.push({
          path: 'meet_detail',
          query: {
            'meetid': meet_id
          }
        }).catch(data => {})
        break;
    }
    // 提示点击的内容

  }, false);
  // 监听在线消息事件
  plus.push.addEventListener("receive", function(msg) {
    //创建消息通知
    if (msg.aps) { // Apple APNS message
      alert("接收到在线APNS消息：" + msg.content);
    } else {
      console.log(msg.content);
      var content = JSON.parse(msg.content);
      plus.push.createMessage(content.msg);
      Notify({
        type: 'primary',
        message: content.msg
      });
      console.log(content.meet_name);
      meet_id = content.meet_id;
      store.commit('updatePushMessage', msg);
      store.commit('SET_MSG', msg)
    }
  }, false);
}, false);

new Vue({
  el: '#app',
  router,
  render: h => h(App),
  components: {
    App
  },
  store,
  template: '<App/>'
}).$mount('#app')
