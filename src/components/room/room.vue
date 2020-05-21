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
      <div class="mui-navbar-inner mui-bar mui-bar-nav hu_header">
        <button type="button" @click="$router.back(-1)" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left">
          <van-icon name="arrow-left" style="line-height: 44px" />
        </button>
        <h1 class="mui-center mui-title account_title">会议室详情</h1>
      </div>
      <div class="mui-page-content">
        <vue-hash-calendar v-bind:scrollChangeDate='false' :disabled-date="disabledDate" @click="setdate" format="YY/MM/DD"
          v-bind:visible='true' v-bind:isShowWeekView='true'></vue-hash-calendar>
        <div class="content" v-if="is_rooming==true">
          <!-- roomlist -->
          <div class="room_detail">
            <div style="font-size: 19px;color: #333333;margin-bottom: 5px;">
              {{room.name}}
              <el-rate style="float: right;" v-model="room.score" disabled show-score text-color="#ff9900"
                score-template="{value}">
              </el-rate>
            </div>
            <div style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
              <span class="mui-icon mui-icon-map"></span> {{room.address}}
            </div>
            <div>
              <span class="mui-icon mui-icon-person"></span> 容量：{{room.capacity}}
            </div>
            <div>
              <span class="mui-icon mui-icon-trash"></span> 开放时间：8:00~21:00
            </div>
            <div>
              <span class="mui-icon mui-icon-settings"></span> 设备：{{room.mike?'话筒':''}}，{{room.projector?'投影仪':''}}，{{room.audio?'麦克风':''}}
            </div>
            <div style="text-align: center;background: #c8c7cc1a;" @click="get_evaluate(room.id)">
              ......
            </div>
          </div>
          <div class="room_use_three">
            <div class="room_use">
              <use_detail v-bind:morn="post.time1"></use_detail>
            </div>
            <div class="room_use">
              <use_detail v-bind:mid="post.time2"></use_detail>
            </div>
            <div class="room_use">
              <use_detail v-bind:even="post.time3"></use_detail>
            </div>
          </div>
          <div class="room_btn">
            <button type="button" v-bind:disabled="!room.state" @click="to_bookmt()" class="mui-btn mui-btn-blue text_btn">
              预约
            </button>
          </div>
        </div>
      </div>
    </div>
    <div id="to_book" class="mui-page">
      <div class="mui-navbar-inner mui-bar mui-bar-nav hu_header">
        <button type="button" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left">
          <span class="mui-icon mui-icon-left-nav" style="color: #75e5d2"></span>
        </button>
        <h1 class="mui-center mui-title account_title">预约</h1>
      </div>
      <!--页面标题栏结束-->
      <!--页面主内容区开始-->
      <div class="mui-page-content">
        <div class="mui-scroll-wrapper">
          <div class="mui-scroll">
            <div id="first_tep">
              <div>
                <div style="padding: 5px 15px;color: #7b7b7b;font-size: 13px;margin-top: 2px;">预约信息</div>
                <div class="room_detail">
                  <div style="font-size: 19px;color: #333333;margin-bottom: 5px;display: inline;">
                    {{room.name}}
                  </div>
                  <div style="white-space: nowrap;overflow: overlay;display: inline;float: right;">
                    {{refer.date}}
                  </div>
                </div>
              </div>
              <div>
                <div style="padding: 5px 15px;color: #7b7b7b;font-size: 13px;">参会信息</div>
                <ul class="mui-table-view" style="border: none;font-size: 15px;">
                  <li class="mui-table-view-cell" style="pointer-events:none">
                    时间
                    <div class="newstwoadd_div" style="pointer-events: none;">
                      <div class="newstwoadd_div1">
                        <div class="newstwoadd_text2 ui-alert" style="pointer-events:all;" @click="timepicker.showPicker=true">{{display_time.startTime?display_time.startTime:'开始'}}</div>
                      </div>
                      <div class="newstwoadd_img">
                        <img src="../../../static/pic/newstwo_img.png" width="60px">
                      </div>
                      <div class="newstwoadd_div1">
                        <div class="newstwoadd_text2 ui-alert" id="end_time" style="pointer-events:all;" @click="timepicker.showPicker_end=true">{{display_time.endTime?display_time.endTime:'结束'}}</div>
                      </div>
                    </div>
                  </li>
                </ul>
                <form class="mui-input-group text_from">
                  <div class="order_people">
                    <div style="padding-left: 16px;">参会人员</div>
                    <div style="padding: 10px 0px;overflow: hidden;">
                      <div style="padding-left: 15px;float: left;">
                        <van-tag size="medium" type="primary">
                          {{startName}}
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
                  <van-field v-model="refer.theme" label="会议主题" />
                  <van-field v-model="refer.introduce" rows="5" autosize label="" type="textarea" maxlength="50"
                    placeholder="请输入会议内容" show-word-limit />
                </form>
              </div>
              <div style="display: none;">
                <div style="padding: 5px 15px;color: #7b7b7b;font-size: 13px;">会议内容（选填）</div>
                <textarea class="newstwoadd_textarea" placeholder="请输入会议内容" style="border: none;"></textarea>
              </div>
              <div class="text_select">
                <button @click="appointment()" type="button" class="mui-btn mui-btn-blue mui-btn-block text_btn">
                  发布
                </button>
              </div>
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
        <h1 class="mui-center mui-title account_title">评价</h1>
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
                          <van-checkbox v-bind:name="item" v-if="item.id!=refer.conferenceInitiator&&attended_people_list.indexOf(item.id)==-1"></van-checkbox>
                        </template>
                      </van-cell>
                    </van-checkbox-group>
                  </van-list>
                  <van-list v-if="active===3">
                    <van-checkbox-group v-model="result">
                      <van-cell title="小胡" icon="user-o" size="medium">
                        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                        <template #title>
                          <span style="font-size: 16px;">小白</span>
                          <van-tag plain type="success">空闲</van-tag>
                        </template>
                        <template #right-icon>
                          <van-checkbox name="a"></van-checkbox>
                        </template>
                      </van-cell>
                      <van-cell title="小胡" icon="user-o" size="medium">
                        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                        <template #title>
                          <span style="font-size: 16px;">小白</span>
                          <van-tag plain type="success">空闲</van-tag>
                        </template>
                        <template #right-icon>
                          <van-checkbox name="b"></van-checkbox>
                        </template>
                      </van-cell>
                      <van-cell title="小胡" icon="user-o" size="medium">
                        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                        <template #title>
                          <span style="font-size: 16px;">小白</span>
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
    <van-popup v-model="timepicker.showPicker" position="bottom">
      <van-datetime-picker type="datetime" v-model="timepicker.currentTime" @confirm="onConfirm" @cancel="timepicker.showPicker = false"
        :filter="filter" :min-date="calender.minDate" :max-date="calender.maxDate" />
    </van-popup>
    <van-popup v-model="timepicker.showPicker_end" position="bottom">
      <van-datetime-picker type="datetime" v-model="timepicker.currentTime_end" @confirm="onConfirm1" @cancel="timepicker.showPicker_end = false"
        :filter="filter_end" :min-date="timepicker.final_start_time" :max-date="timepicker.final_end_time" />
    </van-popup>
  </div>
</template>

<script>
  require('../../../static/mui/js/mui.view.js')
  import use_detail from './common.vue'
  export default {
    name: 'room',
    components: {
      use_detail
    },
    data() {
      return {
        startName: '',
        refer: {
          "conferenceInitiator": this.$store.state.user,
          "date": '2020-04-08',
          "endTime": new Date(new Date().setTime(new Date().getTime() + 30 * 60 * 1000)),
          "introduce": "",
          "roomId": 4,
          "startTime": new Date(),
          "state": 0,
          "theme": ""
        },
        attended_people_list: [],
        calender: {
          minDate: '',
          maxDate: '',
        },
        timepicker: {
          showPicker: false,
          showPicker_end: false,
          currentTime: new Date(),
          currentTime_end: new Date(new Date().setTime(new Date().getTime() + 30 * 60 * 1000)),
          final_start_time: new Date(),
          final_end_time: new Date(),
        },
        display_time: {
          startTime: '',
          endTime: ''
        },
        post: {
          title: "hello",
          time1: [{
              state: 0
            }, //6:00~6:15
            {
              state: 0
            }, //6:15~6:30
            {
              state: 0
            }, //6:30~6:45
            {
              state: 0
            }, //6:45~7:00
            {
              state: 0
            }, //7:00~7:15
            {
              state: 0
            }, //7:15~7:30
            {
              state: 0
            }, //7:30~7:45
            {
              state: 0
            }, //7:45~8:00
            {
              state: -1
            }, //8:00~8:15
            {
              state: -1
            }, //8:15~8:30
            {
              state: -1
            }, //8:30~8:45
            {
              state: -1
            }, //8:45~9:00
            {
              state: -1
            }, //9:00~9:15
            {
              state: -1
            }, //9:15~9:30
            {
              state: -1
            }, //9:30~9:45
            {
              state: -1
            }, //9:45~10:00
            {
              state: -1
            }, //10:00~10:15
            {
              state: -1
            }, //10:15~10:30
            {
              state: -1
            }, //10:30~10:45
            {
              state: -1
            }, //10:45~11:00
            {
              state: -1
            }, //11:00~11:15
            {
              state: -1
            }, //11:15~11:30
            {
              state: -1
            }, //11:30~11:45
            {
              state: -1
            }
          ], //11:45~12:00
          time2: [{
              state: -1
            }, //12:00~12:15
            {
              state: -1
            }, //12:15~12:30
            {
              state: -1
            }, //12:30~12:45
            {
              state: -1
            }, //12:45~13:00
            {
              state: -1
            }, //13:00~13:15
            {
              state: -1
            }, //13:15~13:30
            {
              state: -1
            }, //13:30~13:45
            {
              state: -1
            }, //13:45~14:00
            {
              state: -1
            }, //14:00~14:15
            {
              state: -1
            }, //14:15~14:30
            {
              state: -1
            }, //14:30~14:45
            {
              state: -1
            }, //14:45~15:00
            {
              state: -1
            }, //15:00~15:15
            {
              state: -1
            }, //15:15~15:30
            {
              state: -1
            }, //15:30~15:45
            {
              state: -1
            }, //15:45~16:00
            {
              state: -1
            }, //16:00~16:15
            {
              state: -1
            }, //16:15~16:30
            {
              state: -1
            }, //16:30~16:45
            {
              state: -1
            }, //16:45~17:00
            {
              state: -1
            }, //17:00~17:15
            {
              state: -1
            }, //17:15~17:30
            {
              state: -1
            }, //17:30~17:45
            {
              state: -1
            }
          ], //17:45~18:00
          time3: [{
              state: -1
            }, //18:00~18:15
            {
              state: -1
            }, //18:15~18:30
            {
              state: -1
            }, //18:30~18:45
            {
              state: -1
            }, //18:45~19:00
            {
              state: -1
            }, //19:00~19:15
            {
              state: -1
            }, //19:15~19:30
            {
              state: -1
            }, //19:30~19:45
            {
              state: -1
            }, //19:45~20:00
            {
              state: -1
            }, //20:00~20:15
            {
              state: -1
            }, //20:15~20:30
            {
              state: -1
            }, //20:30~20:45
            {
              state: -1
            }, //20:45~21:00
            {
              state: 0
            }, //21:00~21:15
            {
              state: 0
            }, //21:15~21:30
            {
              state: 0
            }, //21:30~21:45
            {
              state: 0
            }, //21:45~22:00
            {
              state: 0
            }, //22:00~22:15
            {
              state: 0
            }, //22:15~22:30
            {
              state: 0
            }, //22:30~22:45
            {
              state: 0
            }, //22:45~23:00
            {
              state: 0
            }, //23:00~23:15
            {
              state: 0
            }, //23:15~23:30
            {
              state: 0
            }, //23:30~23:45
            {
              state: 0
            }, //23:45~24:00
          ],
        },
        room: {
          id: 4,
          name: "A301",
          capacity: 20,
          audio: true,
          mike: true,
          projector: true,
          address: "浙江省杭州市江干区浙江工商大学钱江湾生活园区29幢",
          serialNumber: "001",
          picture: '',
          state: true,
          remark: "暂无",
          score: 3.6,
          judges: 12
        },
        items: [{
          text: '全部人员'
        }],
        active: 0,
        allpeople: [{
          "name": '',
          "id": ''
        }, {}],
        choose_peoplerd: [],
        value: 3.6,
        viewApi: null,
        book: {
          numbers: '',
          theme: '',
          introduce: ''
        },
        room_detail_url: '/room/id',
        show: {
          primary: true
        },
        pic_carousel: [{
          src: '/static/pic/pic1.jpg'
        }, ],
        rate: [],
        occupy: [],
        is_rooming: false,
        is_evalute: false,
        user_url: '/users',
        book_url: '/book',
        participants: '/participants',
        room_time_url: '/room/time',
        attended_people: '/conference/user'
      }
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
            viewApi.back();
          } else { //执行webview后退
            oldBack();
          }
        }

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
      this.startName = this.$store.state.username;
      this.getallpeople();
      this.refer.date = new Date().Format("yyyy-MM-dd");
      this.calender.minDate = new Date();
      this.calender.maxDate = new Date(this.refer.date + ' ' + '21:00:00');
      var start_date = new Date();
      this.getParams();
      this.getroom_time();
    },
    methods: {
      onConfirm: function(date) {
        this.refer.startTime = date;
        this.display_time.startTime = date.Format('hh:mm');
        this.timepicker.showPicker = false;
        this.timepicker.final_end_time = new Date(this.refer.date + ' ' + '21:00:00');
        this.timepicker.final_start_time = new Date(new Date().setTime(date.getTime() + 30 * 60 * 1000))
      },
      onConfirm1: function(time) {
        this.refer.endTime = time;
        this.display_time.endTime = time.Format('hh:mm');
        this.timepicker.showPicker_end = false;
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
      disabledDate(date) {
        let timestamp = date.getTime();
        if (timestamp > new Date(new Date().setDate(new Date().getDate() + 3)).getTime() || timestamp < new Date(new Date()
            .setDate(new Date().getDate() - 1)).getTime()) {
          return true
        }

        return false
      },
      goRouter: function(pos) {
        this.$router.push({
          path: pos
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
      getParams: function() {
        // 取到路由带过来的参数
        var roomid = this.$route.query.roomid;
        this.room.id = roomid;
        this.refer.roomId = roomid;
        // 将数据放在当前组件的数据内
        this.getroom_detail(roomid)
      },
      getroom_detail: function(id) {
        var axios = this.axios;
        var vm = this;
        let url = vm.room_detail_url;
        axios.get(url, {
            params: {
              id: id
            }
          })
          .then(function(response) {
            if (response.data.code == 200) {
              vm.room = response.data.data.room;
              vm.is_rooming = true;
            }
          })
          .catch(function(error) {

          })
      },
      to_bookmt: function() {
        var vm = this;
        vm.viewApi.go("#to_book");

      },
      choose_people: function() {
        var vm = this;
        vm.get_attend_people()

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
      getroom_time: function() {
        var axios = this.axios;
        var vm = this;
        var url = vm.room_time_url;
        axios.get(url, {
          params: {
            roomId: vm.room.id,
            date: vm.refer.date
          }
        }).then(function(response) {
          if (response.data.code == 200) {
            vm.setTime(response.data.data.time);
            vm.occupy = response.data.data.time;
          }
        }).catch(function(error) {
          console.log(error)
        })
      },
      setTime: function(time) {
        var vm = this;
        var timeok = [];
        for (var item of vm.post.time1) {
          if (item.state == 1)
            item.state = -1;
        }
        for (var item of vm.post.time2) {
          if (item.state == 1) {
            item.state = -1;
          }
        }
        for (var item of vm.post.time3) {
          if (item.state == 1)
            item.state = -1;
        }
        for (let clock of time) {
          var ms = (new Date(vm.refer.date + ' ' + clock.endTime) - new Date(vm.refer.date + ' ' + clock.startTime));
          var index = (Math.floor(ms) / 1000 / 60 / 15);
          var ms1 = (new Date(vm.refer.date + ' ' + clock.startTime) - new Date(vm.refer.date + ' ' + '08:00:00'));
          var ms2 = (new Date(vm.refer.date + ' ' + clock.startTime) - new Date(vm.refer.date + ' ' + '12:00:00'));
          var ms3 = (new Date(vm.refer.date + ' ' + clock.startTime) - new Date(vm.refer.date + ' ' + '18:00:00'));
          var ms4 = 0;
          if (ms3 >= 0) {
            timeok = vm.post.time3;
            ms4 = ms3;
          } else if (ms2 >= 0) {
            timeok = vm.post.time2;
            ms4 = ms2;
          } else if (ms1 >= 0) {
            timeok = vm.post.time1;
            ms4 = ms1;
          } else {

          }
          var start = (Math.floor(ms4) / 1000 / 60 / 15);
          if (ms4 == ms1) {
            start = start + 8;
          }
          for (let i = start; i < start + index; i++) {
            if (timeok[i].state == -1) {
              timeok[i].state = 1;
            }
          }
        }
      },
      close(type) {
        var vm = this;
        var index = vm.choose_peoplerd.indexOf(type);
        if (index > -1) {
          vm.choose_peoplerd.splice(index, 1);
        }
      },
      appointment: function() {
        var axios = this.axios;
        var vm = this;
        var url = vm.book_url;
        axios.post(url, vm.refer)
          .then(function(response) {
            if (response.data.code == 200) {
              vm.add_paticipant(response.data.data.conferenceId)
            } else {
              vm.$toast.fail(response.data.msg);
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      setdate: function(date) {
        var vm = this;
        date = date.replace(/(\/)/g, '-');
        vm.refer.date = date;
        vm.calender.minDate = new Date(vm.refer.date + ' ' + '08:00:00');
        vm.calender.maxDate = new Date(vm.refer.date + ' ' + '21:00:00');
        vm.getroom_time();
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
                message: '发送会议邀请成功'
              });
              vm.goRouterwithid('meet_detail', conferenceId)
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      get_evaluate: function(id) {
        var axios = this.axios;
        var vm = this;
        vm.viewApi.go("#detail")
        let url = '/evaluate';
        axios.get(url, {
          params: {
            roomId: id
          }
        }).then(function(response) {
          if (response.data.code == 200) {
            if (typeof(response.data.data) != 'string') {
              vm.rate = response.data.data;
            }
          }
        }).catch(function(error) {
          console.log(error);
        })
      },
      get_attend_people: function() {
        var axios = this.axios;
        var vm = this;
        var url = vm.attended_people;
        const params = new URLSearchParams();
        params.append('date', vm.refer.date);
        params.append('start_time', new Date(vm.refer.date + ' ' + vm.display_time.startTime));
        params.append('end_time', new Date(vm.refer.date + ' ' + vm.display_time.endTime))
        axios.post(url, params)
          .then(function(response) {
            vm.attended_people_list = response.data.data;
            if (vm.attended_people_list.indexOf(parseInt(vm.refer.conferenceInitiator)) != -1) {
              vm.$toast.fail("当前时段您有待参加会议，请重新操作");
            } else {
              vm.$nextTick(function() {
                vm.viewApi.go("#addpeople");
              })
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      },
    }
  }
</script>

<style>
  @import url("../../assets/css/view.css");

  .calendar_title_date {
    width: 80%;
    text-align: center;
  }

  span.calendar_title_date_time {
    pointer-events: none;
  }
</style>
