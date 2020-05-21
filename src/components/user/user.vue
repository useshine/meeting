<template>
  <div v-if="is_usering==true">
    <div id="setting">
      <!--页面标题栏开始-->
      <div class="mui-navbar-inner mui-bar mui-bar-nav home_bar" ref="homebar">
        <ul class="mui-table-view mui-table-view-chevron home_card" v-if="activepage==1">
          <li class="mui-table-view-cell mui-media" style="width: 100%;text-align: left;" @click="goRouter_role()">
            <img class=" mui-pull-left head-img" id="head-img" src="../../../static/pic/logo1.png" style="margin-right: 2vw;">
            <div class="mui-media-body" style="font-size: 20px;line-height: 2">
              {{user.name?user.name:'暂未填写'}}
              <p class='mui-ellipsis'>部门：
                <van-tag size="medium" mark type="primary" color="#75e5d2">{{user.department}}</van-tag>
                <van-tag size="medium" mark type="primary" color="#F44336" v-if="role!='user'">管理员</van-tag>
              </p>
            </div>
          </li>
        </ul>
      </div>
      <!--页面标题栏结束-->
      <!--页面主内容区开始-->
      <div class="mui-page-content" style="top: 60vw;">
        <van-grid :column-num="3" clickable="">
          <van-grid-item icon="comment-o" text="通知" to="/msg" />
          <van-grid-item icon="todo-list-o" text="我的会议" to="/meet_list" />
          <van-grid-item icon="hotel-o" text="会议室" to="/room_list" />
        </van-grid>
        <van-cell-group title=" ">
          <van-cell icon="setting-o" title="账号与信息" is-link to="/account" />
          <van-cell icon="service-o" title="信息反馈" is-link />
        </van-cell-group>
        <van-cell-group title=" ">
          <van-cell @click="logout()" title="退出登录" style="text-align: center;" />
        </van-cell-group>
      </div>
      <van-tabbar fixed="" safe-area-inset-bottom="" route="" v-model="active" active-color="#75e5d2">
        <van-tabbar-item replace to="/first" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item icon="add-o" to="/test">预约</van-tabbar-item>
        <van-tabbar-item icon="friends-o" to="/user">我的</van-tabbar-item>
      </van-tabbar>
      <!--页面主内容区结束-->
    </div>
  </div>
</template>
<script>
  require('../../../static/mui/js/mui.view.js');
  export default {
    name: 'user',
    data() {
      return {
        title: '智会',
        user: {
          name: '王小明',
          phone: '13216161505',
          address: '浙江省杭州市江干区下沙街道温馨小区6栋203',
          balance: 12,
          department: "财务部"
        },
        activepage: 1,
        active: 2,
        role:'',
        is_usering: false,
      }
    },
    mounted() {

    },
    created() {
      this.$store.commit('showLoading')
      this.role=this.$store.state.root;
      this.getUserInfo();
    },
    methods: {
      goRouter: function(pos) {
        this.$router.push({
          path: pos
        }).catch(data => {})
      },
      goRouter_role: function() {
        if (this.$store.state.root == 'administrator') {
          this.$router.push({
            path: 'account'
          }).catch(data => {})
        } else {
          this.$router.push({
            path: 'identify'
          }).catch(data => {})
        }
      },
      getUserInfo: function() {
        var axios = this.axios;
        var vm = this;
        var url = '/user';
        axios.get(url, {
            params: {
              userId: this.$store.state.user
            }
          })
          .then(function(response) {
            console.log(response)
            if (response.status == 200) {
              vm.user = response.data.data;
              vm.is_usering = true;
              vm.$store.commit('hideLoading');
              vm.$store.commit('SET_NAME',response.data.data.name)
            }
          })
          .catch(function(error) {
            console.log(error)
          });
      },
      logout: function() {
        var vm=this;
        vm.$dialog.confirm({
          message: '确定退出？'
        }).then(() => {
          logout();
        }).catch(() => {});
        var logout = function() {
          vm.$router.push({
            path: '/'
          }).catch(data => {});
          vm.$store.commit('LOGOUT');
        }
      }
    }
  }
</script>

<style scoped="">
  @import url("../../../static/mui/css/mui.min.css");
  @import url("../../assets/css/view.css");

  .mui-navbar {
    background-color: #f7f7f8;
  }

  .mui-table-view {
    margin-top: 20px;
  }
</style>
