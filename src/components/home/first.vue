<template>
  <div>
    <van-nav-bar title="智会" class="account_title">
      <template #right>
        <van-icon name="location-o" @click="goRouter('success')" size="18" />
      </template>
    </van-nav-bar>
    <div class="content" style="height: calc(100% - 100px);">
      <div class="mui-slider">
        <div class="mui-slider-group mui-slider-loop" style="height: 200px;">
          <div class="mui-slider-item mui-slider-item-duplicate">
            <a href="#"><img v-bind:src="pic_carousel[3].src" /></a>
          </div>
          <div class="mui-slider-item" v-for="(item,i) in pic_carousel">
            <a href="#"><img v-bind:src="item.src" /></a>
          </div>
          <div class="mui-slider-item mui-slider-item-duplicate">
            <a href="#"><img v-bind:src="pic_carousel[0].src" /></a>
          </div>
        </div>
        <div class="mui-slider-indicator">
          <div class="mui-indicator mui-active"></div>
          <div class="mui-indicator"></div>
          <div class="mui-indicator"></div>
          <div class="mui-indicator"></div>
        </div>
      </div>
      <div class="vant_notify">
        <!-- link 模式，在右侧显示链接箭头 -->
        <van-notice-bar scrollable="" mode="link" left-icon="volume-o" color="#dd524d" background="white" @click="goRouter('msg')">
          {{pushMessage?pushMessage:'暂无通知'}}
        </van-notice-bar>
      </div>
      <div v-if="isloading==true" style="padding: 3vw;margin-top: 2vw;background-color: #F9F9F9;">
        <van-pull-refresh v-model="van_isloading" @refresh="onRefresh" success-text="刷新成功">
          <van-tag size="medium" mark type="primary" color="#75e5d2">今日会议</van-tag>
          <span style="float: right;font-size: 15px;color: gray;" @click="goRouter('/meet_list')">
          </span>
          <div style="margin: 3vw 0;border-top: 1px solid #e2e2e2;">
            <template v-for="(meet,index) in meeting">
              <van-panel style="margin-bottom: 2%;" v-bind:key=meet.id @click="goRouterwithid('meet_detail',meet.id)">
                <template #header>
                  <div class="van-cell van-panel__header">
                    <div class="van-cell__title">
                      <van-tag size="medium" mark type="primary" style="margin-right: ;" color="#f09e7b">{{meet.initatorName}}</van-tag>
                      <span style="15px">{{meet.theme}}</span>
                      <div class="van-cell__label">{{meet.date+' '+meet.startTime}}</div>
                    </div>
                    <div class="van-cell__value van-panel__header-value">
                      <span v-if="meet.state==2" style="color: gray;">已完成</span>
                      <span v-else-if="meet.state==1" style="color: green;">进行中</span>
                      <span v-else-if="meet.state==0" style="color: red;">未开始</span>
                      <span v-else-if="meet.state==3" style="color: #ee9f0a;">已取消</span>
                      <span v-else-if="meet.state==4" style="color: #3F51B5;">推迟</span>
                      <span v-else-if="meet.state==5" style="color: #3F51B5;">延迟</span>
                    </div>
                  </div>
                </template>
                <div style="padding: 10px 25px;">
                  <div class="text_area">{{meet.introduce?meet.introduce:'暂无会议内容'}}</div>
                </div>
                <template #footer>
                  <div style="width: 190px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
                    <van-icon name="location-o" size="17" />
                    <span style="font-size:13px;color: gray;">{{meet.address}}</span>
                  </div>
                </template>
              </van-panel>
            </template>
            <template v-if="meeting.length==0">
              <div style="text-align: center;color: #9e9e9e;padding: 5vw;background-color: white;margin-top: 2vw;">今日暂无会议</div>
            </template>
          </div>
        </van-pull-refresh>
      </div>
    </div>
    <router-view />
    <van-tabbar fixed="" safe-area-inset-bottom="" route="" v-model="active" active-color="#75e5d2">
      <van-tabbar-item replace to="/first" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="add-o" to="/test">预约</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  export default {
    name: 'first',
    data() {
      return {
        pic_carousel: [{
            src: 'http://120.26.48.169:8081/pic1.jpg'
          },
          {
            src: 'http://120.26.48.169:8081/pic2.jpg'
          },
          {
            src: 'http://120.26.48.169:8081/pic3.jpg'
          },
          {
            src: 'http://120.26.48.169:8081/pic4.jpg'
          }
        ],
        activeBtn: 0,
        active: 0,
        meeting: [],
        isloading: false,
        pushmsg: '',
        van_isloading: false,
      }
    },
    computed: mapState(['pushMessage']),
    mounted() {
      var mui = this.mui;
      var that = this;
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval: 3000 //自动轮播周期，若为0则不自动播放，默认为0；
      });
    },
    created() {
      this.$store.commit('showLoading')
      this.get_today_meet();
    },
    methods: {
      goRouter: function(pos) {
        this.$router.push({
          path: pos,
        }).catch(data => {})
      },
      goRouterwithid: function(pos, id) {
        this.$router.push({
          path: pos,
          query: {
            'meetid': id
          }
        }).catch(data => {})
      },
      get_today_meet: function() {
        var axios = this.axios;
        var vm = this;
        axios.get('/conference/day', {
            params: {
              userId: this.$store.state.user
            }
          }, {
            withCredentials: true
          })
          .then(function(response) {
            if (response.data.code == 200) {
              vm.meeting = response.data.data;
              vm.isloading = true;
              vm.$store.commit('hideLoading')
            }
          })
          .catch(function(error) {

          })
      },
      onRefresh: function() {
        setTimeout(() => {
          this.get_today_meet()
          // this.$toast('刷新成功');
          this.van_isloading = false;
        }, 1000);
      }
    }
  }
</script>

<style>
  @import url("../../../static/mui/css/mui.min.css");
</style>
