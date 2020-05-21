<template>
  <div>
    <div id="app_mui" class="mui-views">
      <div class="mui-view">
        <div class="mui-navbar">
        </div>
        <div class="mui-pages">
        </div>
      </div>
    </div>
    <div id="setting" class="mui-page">
      <!--页面标题栏开始-->
      <div class="mui-navbar-inner mui-bar mui-bar-nav hu_header">
        <button type="button" @click="$router.back(-1)" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left">
          <van-icon name="arrow-left" style="line-height: 44px" />
        </button>
        <h1 class="mui-title account_title">预约</h1>
      </div>
      <!--页面标题栏结束-->
      <!--页面主内容区开始-->
      <div class="mui-page-content">
        <div class="mui-scroll-wrapper">
          <div class="mui-scroll">
            <div id="first_tep">
              <div>
                <van-cell-group title="预约信息">
                  <ul style="border-bottom: 1px solid #eaeaea;">
                    <li class="mui-table-view-cell" style="pointer-events:none">
                      时间
                      <div class="newstwoadd_div" style="pointer-events: none;">
                        <div class="newstwoadd_div1">

                          <div class="newstwoadd_text2 ui-alert" style="pointer-events:all;" @click="start_time()">{{startTime?startTime:'开始'}}</div>
                        </div>
                        <div class="newstwoadd_img">
                          <img src="../../../static/pic/newstwo_img.png" width="60px">
                        </div>
                        <div class="newstwoadd_div1">

                          <div class="newstwoadd_text2 ui-alert" id="end_time" style="pointer-events:all;" @click="end_time()">{{endTime?endTime:'结束'}}</div>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <van-cell title="日期">
                    <span style="float: right;margin-right: 5%;">{{refer.date}}</span>
                  </van-cell>

                </van-cell-group>
                <van-cell-group title="设备">
                  <van-checkbox-group v-model="result">
                    <van-cell-group>
                      <van-cell title="话筒" clickable>
                        <template #right-icon>
                          <van-checkbox name="a"></van-checkbox>
                        </template>
                      </van-cell>
                      <van-cell title="投影仪" clickable>
                        <template #right-icon>
                          <van-checkbox name="b"></van-checkbox>
                        </template>
                      </van-cell>
                      <van-cell title="屏幕" clickable>
                        <template #right-icon>
                          <van-checkbox name="c"></van-checkbox>
                        </template>
                      </van-cell>
                    </van-cell-group>
                  </van-checkbox-group>
                </van-cell-group>
                <van-cell-group title="参会信息">
                  <van-form required>
                    <van-field autofocus v-model="refer.numbers" name="参会人数" placeholder="请输入整数" label="参会人数" :rules="[{required:true,pattern, message: '格式错误',trigger:'onChange'}]" />
                  </van-form>
                </van-cell-group>
              </div>
              <div class="text_select" @click="toselect()">
                <button id="new_meet" native-type="submit" type="button" class="mui-btn mui-btn-blue mui-btn-block text_btn">
                  推荐
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--页面主内容区结束-->
    </div>
    <div id="select" class="mui-page">
      <div class="mui-navbar-inner mui-bar mui-bar-nav hu_header " style="text-align: left;">
        <button type="button" style="color: black;" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left">
          <span class="mui-icon mui-icon-left-nav"></span>
        </button>
        <div class="search">
          <van-icon name="calender-o" size="large" style="margin-right: 2vw;" />
          <span> {{search}}</span>
        </div>
      </div>
      <div class="mui-page-content">
        <div class="mui-scroll-wrapper" style="background-color: rgb(249, 249, 249);">
          <div class="mui-scroll">
            <div class="select_choose_date">
            </div>
            <div v-if="is_selecting==true" style="position: fixed;overflow-y: scroll;height: calc(100% - 70px);width: 100%;">
              <van-card @click="to_detail(item.roomVo.id)" v-bind:key="item.roomVo.id" v-if="item.roomVo.state" v-for="(item,index) in room_list"
                v-bind:num="item.roomVo.capacity" v-bind:desc="item.roomVo.address" title="A101" thumb="../../../static/pic/pic3.jpg"
                style="background-color: white;padding: 5vw;">
                <template #title>
                  <span style="font-size: 19px;">{{item.roomVo.name}}</span>
                </template>
                <template #thumb>
                  <van-image width="78px" height="68px" :src="item.roomVo.picture?('http://120.26.48.169:8081/'+item.roomVo.picture):' '">
                    <template v-slot:error>暂无图片</template>
                  </van-image>
                </template>
                <template #tags>
                  <van-tag plain type="danger" v-if="item.roomVo.audio">摄像头</van-tag>
                  <van-tag plain type="danger" v-if="item.roomVo.mike">投影</van-tag>
                  <van-tag plain type="danger" v-if="item.roomVo.projector">麦克风</van-tag>
                </template>
                <template #price>
                  <van-rate v-model="item.roomVo.score" size="medium" readonly />
                </template>
                <template #footer>
                  <van-button type="warning" size="small" @click.stop="to_choose_room(item.roomVo)" v-bind:disabled="!item.roomVo.state">预约</van-button>
                  <!-- <van-button size="small" @click="goRouter('room',item.roomVo.id)">查看详情</van-button> -->
                </template>
              </van-card>
              </van-grid>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="order" class="mui-page">
      <div class="mui-navbar-inner mui-bar mui-bar-nav hu_header ">
        <button type="button" style="color: black;" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left">
          <span class="mui-icon mui-icon-left-nav"></span>上一步
        </button>
        <h1 class="mui-center mui-title account_title">发布预约</h1>
      </div>
      <!--页面标题栏结束-->
      <!--页面主内容区开始-->
      <div class="mui-page-content">
        <div class="mui-scroll-wrapper">
          <div class="mui-scroll">
            <div id="three_tep">
              <div>
                <div style="padding: 5px 15px;color: #7b7b7b;font-size: 13px;margin-top: 2px;">预约信息</div>
                <div class="room_detail">
                  <div style="font-size: 19px;color: #333333;margin-bottom: 5px;">
                    {{choose_room.name}}
                  </div>
                  <div style="white-space: nowrap;overflow: overlay;">
                    日期：{{refer.date}}
                  </div>
                  <div>
                    时间：{{startTime}}~{{endTime}}
                  </div>
                  <div>
                    参会人数：{{refer.numbers}}
                  </div>
                </div>
                <div style="padding: 5px 15px;color:#7b7b7b;font-size: 13px;margin-top: 2px;">会议信息</div>
                <form class="mui-input-group text_from" style="padding: 5px 15px;">
                  <div class="order_people">
                    <div>参会人员</div>
                    <div style="padding: 10px 0px;overflow: hidden;">
                      <div style="padding-left: 15px;float: left;">
                        <van-tag size="medium" type="primary">
                          {{start_man}}
                        </van-tag>
                      </div>
                      <div style="padding-left: 15px;float: left;" v-for=" (item,index) in choose_peoplerd" v-bind:key="item.id">
                        <van-tag v-if="item" closeable size="medium" type="warning" @close="close(item)">
                          {{item.name}}
                        </van-tag>
                      </div>
                      <div style="padding-left: 15px;float: left;" @click="choose_people()">
                        <van-icon name="add-o" size="23px" color="gray" />
                      </div>
                    </div>
                  </div>
                  <van-field v-model="book.theme" label="会议主题" />
                  <van-field v-model="book.introduce" rows="5" autosize label="" type="textarea" maxlength="50"
                    placeholder="请输入会议内容" show-word-limit />
                </form>
              </div>
              <div class="text_select">
                <button @click="to_bookmt()" id="new_meet" type="button" class="mui-btn mui-btn-blue mui-btn-block text_btn">
                  发布
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="addpeople" class="mui-page">
      <div class="mui-navbar-inner mui-bar mui-bar-nav hu_header ">
        <h1 class="mui-center mui-title account_title">添加人员</h1>
        <button type="button" style="color: black;" class="mui-right mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-right">
          <van-button plain style="float: right;margin-top: 2vw;" size="small">确认</van-button>
        </button>
      </div>
      <div class="mui-page-content">
        <div class="mui-scroll-wrapper" style="height: 100%;">
          <div class="mui-scroll content" style="height: 100%;">
            <div id="four_tep" style="height: 100%;">
              <van-tree-select height="100%" :items="items" :main-active-index.sync="active">
                <template #content>
                  <van-list v-if="active===0">
                    <van-checkbox-group v-model="choose_peoplerd">
                      <van-cell title="小胡" icon="user-o" size="medium" v-bind:key="item.id" v-for="(item,i) in allpeople">
                        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                        <template #title>
                          <span style="font-size: 16px;">{{item.name}}</span>
                          <van-tag plain type="warning" v-if="item.id==refer.conferenceInitiator">发起者</van-tag>
                          <van-tag plain type="success" v-else-if="attended_people_list.indexOf(item.id)==-1">
                            空闲
                          </van-tag>
                          <van-tag plain type="danger" v-else>繁忙</van-tag>
                        </template>
                        <template #right-icon>
                          <van-checkbox v-bind:name="item" v-if="item.id!=refer.conferenceInitiator&&attended_people_list.indexOf(item.id)==-1"
                            @click="addto_name()"></van-checkbox>
                        </template>
                      </van-cell>
                    </van-checkbox-group>
                  </van-list>
                  <van-list v-if="active===3">
                    <van-checkbox-group v-model="result" :max="2">
                      <van-cell title="小胡" icon="user-o" size="medium">
                        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                        <template #title>
                          <span style="font-size: 16px;">小胡</span>
                          <van-tag plain type="warning">发起人</van-tag>
                        </template>
                      
                      </van-cell>
                      <van-cell title="小胡" icon="user-o" size="medium">
                        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                        <template #title>
                          <span style="font-size: 16px;">小王</span>
                          <van-tag plain type="success">空闲</van-tag>
                        </template>
                        <template #right-icon>
                          <van-checkbox name="b"></van-checkbox>
                        </template>
                      </van-cell>
                      <van-cell title="小胡" icon="user-o" size="medium">
                        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                        <template #title>
                          <span style="font-size: 16px;">小黄</span>
                          <van-tag plain type="danger">繁忙</van-tag>
                        </template>
                        <template #right-icon>
                          <van-checkbox name="c"></van-checkbox>
                        </template>
                      </van-cell>
                      <van-cell title="小胡" icon="user-o" size="medium">
                        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                        <template #title>
                          <span style="font-size: 16px;">小羊</span>
                          <van-tag plain type="success">空闲</van-tag>
                        </template>
                        <template #right-icon>
                          <van-checkbox name="c"></van-checkbox>
                        </template>
                      </van-cell>
                    </van-checkbox-group>
                  </van-list>
                </template>
              </van-tree-select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="detail" class="mui-page">
      <div class="mui-navbar-inner mui-bar mui-bar-nav hu_header">
        <button type="button" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left">
          <span class="mui-icon mui-icon-left-nav" style="color: #75e5d2"></span>
        </button>
        <h1 class="mui-center mui-title account_title">会议室详情</h1>
      </div>
      <div class="mui-page-content">
        <div class="mui-slider" style="padding: 2vw;background-color: white;height: 35%;">
          <van-image width="100%" height="100%" :src="room.picture?('http://120.26.48.169:8081/'+room.picture):' '">
            <template v-slot:error>暂无图片</template>
          </van-image>
        </div>
        <div class="room_detail" style="margin: 0px;">
          <div style="font-size: 19px;color: #333333;margin-bottom: 5px;">
            {{room.name}}
            <el-rate style="float: right;" v-model="room.score" disabled show-score text-color="#ff9900" score-template="{value}">
            </el-rate>
          </div>
          <div style="">
            <van-icon name="location-o" /> {{room.address}}
          </div>
          <div>
            <van-icon name="friends-o" /> 容量：{{room.capacity}}
          </div>
          <div>
            <van-icon name="clock-o" /> 开放时间：8:00~21:00
          </div>
          <div>
            <van-icon name="bullhorn-o" /> 设备：{{room.mike?'话筒':''}}，{{room.projector?'投影仪':''}}，{{room.audio?'麦克风':''}}
          </div>
          <div>
            <van-icon name="setting-o" /> 绑定设备：{{room.serialNumber?'已绑定':'未绑定'}}
          </div>
        </div>
        <div style="margin: 1vw auto;width: 98%;" v-for="(item ,index) in rate" v-bind:key="index">
          <van-panel>
            <template #header>
              <div class="van-cell van-panel__header" style="display: flex;align-items:flex-end;">
                <div class="van-cell__title" style="display: flex;align-items: center;">
                  <van-image round width="2rem" height="2rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                  <span style="font-size: 15px;margin-left: 2vw;">{{item.name}}</span>
                </div>
                <div class="van-cell__value van-panel__header-value">
                  <van-rate v-model="item.rate" :count="6" />
                </div>
              </div>
            </template>
            <div style="padding: 10px 25px;">
              <div v-if="item.introduce=='' " style="text-align: center;" class="text_area">暂无评论</div>
              <div v-else class="text_area">{{item.introduce}}</div>
            </div>
            <template #footer>
              <div style="font-size: 13px;color: gray;text-align: right;">2020-03-05</div>
            </template>
          </van-panel>
        </div>
        <div v-if="rate.length==0" style="padding: 5vw;color: #c5c0c0;text-align: center;">暂无评论</div>
      </div>
    </div>
    <van-popup v-model="timepicker.showPicker" position="bottom">
      <van-datetime-picker type="datetime" v-model="timepicker.currentTime" @confirm="onConfirm" @cancel="timepicker.showPicker = false"
        :filter="filter" :min-date="calender.minDate" :max-date="calender.maxDate" min-hour="8" max-hour="21" />
    </van-popup>
    <van-popup v-model="timepicker.showPicker_end" position="bottom">
      <van-datetime-picker type="datetime" v-model="timepicker.currentTime_end" @confirm="onConfirm1" @cancel="timepicker.showPicker_end = false"
        :filter="filter_end" :min-date="timepicker.final_start_time" :max-date="timepicker.final_end_time" />
    </van-popup>
  </div>
</template>
<script>
  require('../../../static/mui/js/mui.picker.min.js')
  require('../../../static/mui/js/mui.view.js')
  import use_detail from '../room/common1.vue'
  export default {
    name: 'test',
    data() {
      return {
        //选人分类
        active: 0,
        items: [{
            text: '全部人员'
          }, {
            text: '财务部'
          }, {
            text: '活动部'
          },
          {
            text: '设计部'
          }
        ],
        activeIndex: 0,
        //勾选设备
        result: [],
        //房间列表
        room_list: [],
        refer: {
          "conferenceInitiator": this.$store.state.user,
          "date": '',
          "duration": 0,
          "endTime": '',
          "isAudio": false,
          "isMike": false,
          "isProjector": false,
          "numbers": '',
          "startTime": '',
          "state": 0
        },
        search: '',
        book: {
          "introduce": '',
          "roomId": 0,
          "theme": ""
        },
        start_man: this.$store.state.username,
        choose_room: {},
        startTime: '',
        endTime: '',
        allpeople: [{
          "name": '',
          "id": ''
        }, {}],
        choose_peoplerd: [],
        attended_people_list: [],
        viewApi: null,
        is_selecting: false,
        //calender
        calender: {
          minDate: new Date(),
          maxDate: new Date(),
        },
        timepicker: {
          showPicker: false,
          showPicker_end: false,
          currentTime: new Date(),
          currentTime_end: new Date(new Date().setTime(new Date().getTime() + 30 * 60 * 1000)),
          final_start_time: new Date(),
          final_end_time: new Date(),
          time_clock: true,
        },
        //正则校验
        pattern: /(^[1-9]\d*$)/,
        //room_detail
        room: [],
        rate: [],
        to_select_url: '/recommendation',
        user_url: '/users',
        to_book: '/book',
        participants: '/participants',
        attended_people: '/conference/user'
      }
    },
    components: {
      use_detail
    },
    mounted() {
      var mui = this.mui;
      var vm = this;
      mui.init();
      //初始化单页view
      var viewApi = mui('#app_mui').view({
        defaultPage: '#setting'
      });
      vm.viewApi = viewApi;
      //初始化单页的区域滚动
      //mui('.mui-scroll-wrapper').scroll();
      //分享操作
      var view = viewApi.view;
      (function($) {
        //处理view的后退与webview后退
        var oldBack = $.back;
        $.back = function() {
          if (viewApi.canBack()) { //如果view可以后退，则执行view的后退
            //console.log(mui.currentWebview())
            viewApi.back();
          } else { //执行webview后退
            oldBack();
          }
        }
        var start_time = document.querySelector("#start_time");
        var end_time = document.querySelector("#end_time");
        var mike = document.querySelector(".mike");
        var remake = document.querySelector(".remake");
        var green = document.querySelector(".green");
        var dtpicker1 = new mui.DtPicker({
          type: "time",
        });
        document.body.addEventListener('focusout', function() {
          window.scrollTo(0, 0);
        });
      })(mui);
    },
    created() {
      Date.prototype.Format = function(fmt) { //author: meizz
        var o = {
          "M+": this.getMonth() + 1, //月份
          "d+": this.getDate(), //日
          "h+": this.getHours(), //小时
          "m+": this.getMinutes(), //分
          "s+": this.getSeconds(), //秒
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度
          "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : ((
            "00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
      };
      this.refer.date = new Date().Format("yyyy-MM-dd");
      this.calender.minDate = new Date();
      this.calender.maxDate = new Date(new Date().setDate(this.calender.minDate.getDate() + 3));
      if (this.calender.maxDate.getHours() >= 21) {
        this.timepicker.time_clock = true;
      }
      this.getallpeople();
    },
    methods: {
      onConfirm: function(time) {
        this.refer.date = time.Format("yyyy-MM-dd");
        this.refer.startTime = time;
        this.timepicker.currentTime_end = new Date(new Date().setTime(time.getTime() + 30 * 60 * 1000));
        this.timepicker.final_end_time = new Date(this.refer.date + ' ' + '21:00:00');
        this.timepicker.final_start_time = new Date(new Date().setTime(time.getTime() + 30 * 60 * 1000))
        this.startTime = time.Format("hh:mm");
        this.timepicker.showPicker = false;
      },
      onConfirm1: function(time) {
        this.refer.endTime = time;
        this.endTime = time.Format("hh:mm");
        this.timepicker.showPicker_end = false;
      },
      start_time: function() {
        if (this.timepicker.time_clock) {
          this.timepicker.showPicker = true;
        } else {
          this.$toast.fail("21点后不可预约会议室")
        }
      },
      end_time: function() {
        if (this.timepicker.time_clock) {
          this.timepicker.showPicker_end = true;
        } else {
          this.$toast.fail("21点后不可预约会议室")
        }
      },
      filter(type, options) {
        if (type === 'minute') {
          return options.filter((option) => option % 15 === 0 || option == 0);
        }
        if (type === 'hour') {
          return options.filter((option) => option >= 8 && option < 21)
        }
        return options;
      },
      filter_end: function(type, options) {

        if (type === 'minute') {
          return options.filter((option) => option % 15 == 0 || option == 0);
        }
        if (type === 'hour') {
          return options.filter((option) => option >= 8 && option < 21)
        }
        return options;
      },
      to_detail(id) {
        var vm = this;
        vm.get_room_detail(id);
        vm.get_evaluate(id);
      },
      get_room_detail(id) {
        var axios = this.axios;
        var vm = this;
        let url = '/room/id';
        axios.get(url, {
            params: {
              id: id
            }
          })
          .then(function(response) {
            if (response.data.code == 200) {
              vm.room = response.data.data.room;
            }
          })
          .catch(function(error) {

          })
      },
      get_evaluate: function(id) {
        var axios = this.axios;
        var vm = this;
        let url = '/evaluate';
        axios.get(url, {
          params: {
            roomId: id
          }
        }).then(function(response) {
          if (response.data.code == 200) {
            if (typeof(response.data.data) != 'string') {
              vm.rate = response.data.data;
              vm.$nextTick(function() {
                vm.viewApi.go('#detail')
              })
            }
          }
        }).catch(function(error) {
          console.log(error);
        })
      },
      toselect: function() {
        var vm = this;
        vm.refer.isAudio = vm.result.indexOf('a') != -1 ? true : false;
        vm.refer.isMike = vm.result.indexOf('b') != -1 ? true : false;
        vm.refer.isProjector = vm.result.indexOf('c') != -1 ? true : false;
        var axios = this.axios;
        var url = vm.to_select_url;
        axios.post(url, vm.refer)
          .then(function(response) {
            if (response.status == 200) {
              vm.room_list = response.data.data;
              if (vm.room_list.length == 0) {
                vm.$toast.fail("无符合条件会议室")
              } else {
                vm.is_selecting = true;
                vm.search = vm.refer.date + ' ' + vm.startTime + '~' + vm.endTime;
                vm.$nextTick(function() {
                  vm.viewApi.go("#select");
                })
              }
            } else {
              vm.$toast.fail(response.data.msg)
            }
          })
          .catch(function(error) {
            console.log(error);
            vm.$toast.fail("操作失败，请重新操作")
          })
        //vm.viewApi.go("#select");
      },

      choose_people: function() {
        var vm = this;
        vm.viewApi.go("#addpeople");
      },
      getallpeople: function() {
        var axios = this.axios;
        var vm = this;
        var url = vm.user_url;
        axios.get(url)
          .then(function(response) {
            vm.allpeople = response.data.data;
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      get_attend_people: function() {
        var axios = this.axios;
        var vm = this;
        var url = vm.attended_people;
        const params = new URLSearchParams();
        params.append('date', vm.refer.date);
        params.append('start_time', new Date(vm.refer.date + ' ' + vm.startTime));
        params.append('end_time', new Date(vm.refer.date + ' ' + vm.endTime))
        axios.post(url, params)
          .then(function(response) {
            vm.attended_people_list = response.data.data;
            if (vm.attended_people_list.indexOf(parseInt(vm.refer.conferenceInitiator)) != -1) {
              console.log("ddd")
              vm.$toast.fail("当前时段您有待参加会议，请重新操作");
            } else {
              vm.$nextTick(function() {
                vm.viewApi.go('#order')
              })
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      addto_name: function() {
        var vm = this;
      },
      close(type) {
        var vm = this;
        var index = vm.choose_peoplerd.indexOf(type);
        if (index > -1) {
          vm.choose_peoplerd.splice(index, 1);
        }
      },
      to_choose_room: function(data) {
        var vm = this;
        vm.choose_room = data;
        vm.book.roomId = data.id;
        vm.get_attend_people();
      },
      to_bookmt: function() {
        var vm = this;
        vm.refer.introduce = vm.book.introduce;
        vm.refer.roomId = vm.book.roomId;
        vm.refer.theme = vm.book.theme;
        var axios = this.axios;
        var url = vm.to_book;
        axios.post(url, vm.refer)
          .then(function(response) {
            if (response.data.code == 200) {
              vm.add_paticipant(response.data.data.conferenceId)
            } else {
              vm.$toast.fail(response.data.msg)
            }
          })
          .catch(function(error) {
            console.log(error);
            vm.$toast.fail("操作失败，请重新操作")
          })
      },
      add_paticipant: function(conferenceId) {
        var vm = this;
        var url = vm.participants;
        var axios = this.axios;
        var participantsid = [];
        for (let item of vm.choose_peoplerd) {
          participantsid.push(item.id);
        }
        const params = new URLSearchParams();
        params.append('conferenceId', conferenceId);
        params.append('initiatorId', this.$store.state.user);
        params.append('participants', participantsid)
        axios.post(url, params).then(function(response) {
            if (response.data.code == 200) {
              vm.$notify({
                type: 'success',
                message: '已向用户发送会议邀请信息'
              });
              vm.goRouterwithid('meet_detail', conferenceId)
            } else {
              vm.$toast.fail(response.data.msg)
            }
          })
          .catch(function(error) {
            console.log(error);
            //vm.$toast.fail("操作失败，请重新操作")
          })
      },
      goRouterwithid: function(pos, id) {
        this.$router.push({
          path: pos,
          query: {
            'meetid': id
          }
        }).catch(data => {})
      },

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped="">
  @import url("../../assets/css/view.css");

  input.van-field__control {
    padding: 0px;
    border: none !important;
  }

  a.van-card__thumb {
    height: 58px;
    width: 68px;
  }

  .search {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 30px;
    line-height: 44px;
    background-color: #F7F8FA;
    padding: 2vw 4vw;
    border-radius: 999px;
    color: gray;
    font-size: 14px;
    text-align: left;
    margin-top: 2%;
  }

  .van-card__thumb {
    margin-right: 15px;
  }
</style>
