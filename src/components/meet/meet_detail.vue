<template>
  <div v-if="is_detailing">
    <van-nav-bar title="添加会议室" class="account_title" left-text="" left-arrow @click-left="$router.back(-1)">
      <template #title>
        <span class="account_title">会议详情</span>
      </template>
    </van-nav-bar>
    <div style="text-align: center;padding:9vw 3vw 2vw;background-color: white;border-radius: 0 0 10vw 10vw;line-height: 2;">
      <div style="font-size:20px;font-family: monospace;font-weight: bold;">{{meet.name}}
      </div>
      <div style="font-size: 18px;font-family: cursive;">
        <van-icon name="user-circle-o" color="#FF9800" size="medium" />
        {{meet.startMan}}
      </div>
    </div>
    <div>
      <van-cell-group title="会议信息">
        <van-cell title="地址" v-bind:value="meet.room" v-bind:label="meet.address" is-link="" @click="goRouterwithid('room',meet.roomId)" />
        <van-cell title="会议时间" v-bind:value="meet.time">
          <template #title>
            <span>会议时间</span>
            <van-tag v-if="meet.state==2">已结束</van-tag>
            <van-tag v-else-if="meet.state==3" type="warning">已取消</van-tag>
            <van-tag v-else-if="meet.state==0" type="danger">未开始</van-tag>
            <van-tag v-else-if="meet.state==1" type="success">进行中</van-tag>
            <van-tag v-else-if="meet.state==4" type="primary">推迟</van-tag>
            <van-tag v-else-if="meet.state==5" type="primary">延迟</van-tag>
          </template>
        </van-cell>
        <van-cell v-if="meet.state==2&&meet.realEndTime" title="结束时间" :value="meet.realEndTime" />
        <van-field v-model="meet.introduce" readonly="" autosize label="内容" type="textarea" minlength="80" placeholder="" />
      </van-cell-group>
      <van-cell-group title="参会人员">
        <template #title>
          <span>参会人员({{meet.user?meet.user.length:''}})</span>
          <span style="float: right;" v-if="meet.state==1||meet.state==5||meet.state==2">参会({{meet.attend.length}})，未参会({{meet.unAttend.length}})</span>
        </template>
        <div>
          <div style="padding:4vw 0px;overflow: hidden;">
            <div style="padding-left: 5vw;float: left;" v-for=" (item,index) in meet.user" v-bind:key="index">
              <van-image round width="2rem" height="2rem" v-bind:src="(meet.state!=1&&meet.state!=5&&meet.state!=2)?pic_url+'/logo1.png':(item.state?pic_url+'/logo1.png':'')" />
              <van-tag plain type="warning" v-if="item&&item.name!=user" style="display: block;text-align: center;height: 17px;line-height: 17px;">{{item.name}}</van-tag>
              <van-tag plain type="success" v-else-if="item" style="display: block;text-align: center;height: 17px;line-height: 17px;">{{item.name}}</van-tag>
            </div>
          </div>
        </div>
      </van-cell-group>
    </div>
    <div class="text_select" style="display: flex;padding: 1vw;">
      <van-button type="danger" v-if="(meet.state==0||meet.state==4)&&meet.startMan==user" block @click="cancel_meet()">取消</van-button>
      <van-button type="warning" round="" v-else-if="meet.state==2" block @click="goRouterwithmeet('meet_rf',meet_id)">评价</van-button>
      <van-button type="" round="" v-else-if="meet.state==3" block @click="delete_meet()" style="background-color: #f4f4f4;">删除</van-button>
      <van-button type="warning" round="" @click="signoff()" v-if="(meet.state==1||meet.state==5)&&meet.attend.indexOf(user)&&meet.startMan==user"
        block>签退</van-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message: '',
        meet: {
          address: "浙江省杭州市江干区浙江工商大学钱江湾生活园区29幢",
          attend: [],
          startMan: "小胡",
          introduce: "大大大大大大",
          name: "测试会议通知",
          unAttend: [{
            name: "小胡"
          }, {
            name: "张三"
          }, {
            name: "小王"
          }, {
            name: "小胡"
          }],
          state: 2,
          time: "2020-04-16 05:00:00~07:00:00",
          room: "A301",
        },
        meet_id: '',
        is_detailing: false,
        user: '',
        pic_url: 'http://120.26.48.169:8081/'
      }
    },
    created() {
      this.user = this.$store.state.username;
      console.log(this.user)
      this.getParams();
    },
    watch: {
      '$route': 'getParams'
    },
    methods: {
      getParams: function() {
        // 取到路由带过来的参数
        this.meet_id = this.$route.query.meetid;
        // 将数据放在当前组件的数据内
        this.get_detail(this.meet_id)
      },
      goRouter: function(pos) {
        this.$router.push({
          path: pos,
        }).catch(data => {})
      },
      goRouterwithid: function(pos, id) {
        console.log(id)
        this.$router.push({
          path: pos,
          query: {
            'roomid': id
          }
        }).catch(data => {})
      },
      goRouterwithmeet: function(pos, id) {
        console.log(id)
        this.$router.push({
          path: pos,
          query: {
            'meetid': id
          }
        }).catch(data => {})
      },
      cancel_meet: function() {
        var axios = this.axios;
        var vm = this;
        vm.$dialog.confirm({
          message: '是否取消该会议？'
        }).then(() => {
          cancel();
        }).catch(() => {})
        var cancel = function() {
          var url = '/conference/cancle';
          const params = new URLSearchParams();
          params.append('conferenceId', vm.meet_id)
          axios.post(url, params).then(function(response) {
            if (response.data.code == 200) {
              vm.$toast.success("取消会议成功");
              vm.$notify({
                type: 'success',
                message: '已向用户发送会议取消提示'
              });
              vm.$router.back(-1)
            }
          }).catch(function(error) {
            console.log(error)
          })
        }
      },
      get_detail(id) {
        let axios = this.axios;
        var vm = this;
        axios.get('/conference/detail', {
          params: {
            conferenceId: id
          }
        }).then(function(response) {
          if (response.data.code == 200) {
            vm.meet = response.data.data;

            vm.meet.user = [];
            if (vm.meet.hasOwnProperty('attend')) {
              for (let item of vm.meet.attend) {
                vm.meet.user.push({
                  name: item.name,
                  state: 1
                });
              }
            }
            if (vm.meet.hasOwnProperty('unAttend')) {
              for (let item of vm.meet.unAttend) {
                vm.meet.user.push({
                  name: item.name,
                  state: 0
                });
              }
            }
            console.log(vm.meet.user)

            vm.is_detailing = true;
          }
        }).catch(function(error) {
          console.log(error)
        });
      },
      delete_meet: function() {
        let axios = this.axios;
        var vm = this;
        vm.$dialog.confirm({
          message: '是否删除该会议记录？'
        }).then(() => {
          delete_m()
        }).catch(() => {

        })
        var delete_m = function() {
          var url = '/conference/delete?conferenceId=' + vm.meet_id+'&userId='+vm.$store.state.user;
          axios.post(url)
            .then(function(response) {
              if (response.data.code == 200) {
                vm.$toast.success("删除会议记录成功");
                vm.$router.back(-1)
              } else {
                vm.$toast.fail("操作失败，请重新操作");
              }
            })
            .catch(function(error) {
              console.log(error);
              vm.$toast.fail("操作失败，请重新操作")
            });
        }
      },
      signoff: function() {
        let axios = this.axios;
        var vm = this;
        vm.$dialog.confirm({
          message: '是否结束该会议？'
        }).then(() => {
          signoff_inline()
        }).catch(() => {
        })
        var signoff_inline = () => {
          var url = '/signOff?userId=' + vm.$store.state.user + '&conferenceId=' + vm.meet_id;
          axios.post(url).then(function(response) {
            if (response.data.code == 200) {
              console.log("ddd")
              vm.get_detail(vm.meet_id);
            }
          }).catch(function(error) {
            console.log(error)
          });
        }
      }
    }
  }
</script>

<style>
</style>
