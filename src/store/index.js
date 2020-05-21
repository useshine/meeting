import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 初始化时用sessionStore.getItem('token'),这样子刷新页面就无需重新登录
const state = {
  user: window.sessionStorage.getItem('user'),
  root: window.sessionStorage.getItem('root'),
  identify: window.sessionStorage.getItem('identify'),
  phone: window.sessionStorage.getItem('phone'),
  username: window.sessionStorage.getItem('username'),
  pushMessage: '',
  Messages:[],
  Loading:false
}
const mutations = {
  //将token保存到sessionStorage里，token表示登陆状态
  //获取用户名
  SET_USER: (state, data) => {
    // 把用户名存起来
    state.user = data
    window.sessionStorage.setItem('user', data)
  },
  SET_ROOT: (state, data) => {
    state.root = data
    window.sessionStorage.setItem('root', data)
  },
  SET_IDENTIFY: (state, data) => {
    state.identify = data;
    window.sessionStorage.setItem('identify', data)
  },
  SET_PHONE: (state, data) => {
    state.phone = data;
    window.sessionStorage.setItem('phone', data)
  },
  //登出
  LOGOUT: (state) => {
    // 登出的时候要清除token
    state.user = null;
    state.phone = null;
    state.root=null;
    state.identify=null;
    state.username='';
    state.Messages=[];
    state.pushMessage='';
    state.Loading=false;
    console.log(state.user)
    window.sessionStorage.removeItem('user')
    window.sessionStorage.removeItem('phone');
    window.sessionStorage.removeItem('root');
    window.sessionStorage.removeItem('identify');
    window.sessionStorage.removeItem('username');
    var tool = new igexinTool();
    tool.bindAlias(null);
  },
  updatePushMessage(state, message) {
    var sh=JSON.parse(message.content);
    state.pushMessage = sh.msg|| '';
  },
  SET_MSG:(state,message)=>{
    state.Messages.push(JSON.parse(message.content))
  },
  SET_NAME:(state,data)=>{
    state.username=data;
    window.sessionStorage.setItem('username', data)
  },
  showLoading(state){
    state.Loading=true
  },
  hideLoading(state){
    state.Loading=false
  }
}

const actions = {}
export default new Vuex.Store({
  state,
  mutations,
  actions
})
