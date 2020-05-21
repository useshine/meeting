<template>
  <div style="height: 100%;">
    <van-nav-bar title="会议详情" class="account_title" :color="'#0FAFAA'" left-arrow @click-left="$router.back(-1)">
      <!-- <template #right>
        <van-icon name="search" />
      </template> -->
    </van-nav-bar>
    <div style="height: 100%;background-color: #efeff4;">
      <van-tabs v-model="active" animated>
        <van-tab title="全部">
          <van-pull-refresh v-model="isLoading" success-text='刷新成功' @refresh="onRefresh()">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load='getall_meet()'>
              <div @click="goRouter('meet_detail',item.id)" v-for="(item,index) in meet" style="width: 96%; border-radius: 2vw;margin: 2vw auto;overflow: hidden;">
                <van-panel>
                  <template #header>
                    <div class="van-cell van-panel__header">
                      <div class="van-cell__title">
                        <span style="15px">{{item.theme}}</span>
                        <div class="van-cell__label">{{item.date+' '+item.startTime}}</div>
                      </div>
                      <div class="van-cell__value van-panel__header-value">
                        <span v-if="item.state==2" style="color: gray;">已完成</span>
                        <span v-else-if="item.state==1" style="color: green;">进行中</span>
                        <span v-else-if="item.state==0" style="color: red;">未开始</span>
                        <span v-else-if="item.state==3" style="color: #ee9f0a;">已取消</span>
                        <span v-else-if="item.state==4" style="color: #3F51B5;">推迟</span>
                        <span v-else-if="item.state==5" style="color: #3F51B5;">延迟</span>
                      </div>
                    </div>
                  </template>
                  <div style="padding: 10px 25px;">
                    <div class="text_area">{{item.introduce.length==0?'暂无内容':item.introduce}}</div>
                  </div>
                  <template #footer>
                    <van-button round="" size="small" class="round_btn" plain hairline type="warning">查看详情</van-button>
                    <van-button round="" size="small" class="round_btn" v-if="(item.state==0||item.state==4)&&item.conferenceInitiator==user" plain
                      hairline type="info" v-on:click.stop="cancel_meet(item.id)">取消</van-button>
                    <van-button round="" size="small" class="round_btn" v-else-if="item.state==2" plain hairline type="info"
                      v-on:click.stop="goRouter('meet_rf',item.id)">评价</van-button>
                    <van-button round="" size="small" class="round_btn" color="gray" v-else-if="item.state==3" plain
                      hairline type="info" @click.stop="delete_meet(item.id)">删除</van-button>
                  </template>
                </van-panel>
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <van-tab title="未开始">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getall_meet()">
            <van-pull-refresh style="overflow-y: scroll;height: 100%;" v-model="isLoading" success-text='刷新成功' @refresh="onRefresh()">
              <div @click="goRouter('meet_detail',item.id)" v-for="(item,index) in meet" v-if="item.state==0||item.state==4" style="width: 96%; border-radius: 2vw;margin:2vw auto;overflow: hidden;">
                <van-panel>
                  <template #header>
                    <div class="van-cell van-panel__header">
                      <div class="van-cell__title">
                        <span style="15px">{{item.theme}}</span>
                        <div class="van-cell__label">{{item.date+' '+item.startTime}}</div>
                      </div>
                      <div class="van-cell__value van-panel__header-value">
                        <span style="color: red;" v-if="item.state==0">未开始</span>
                        <span style="color: rgb(63, 81, 181);" v-else>延迟</span>
                        </div>
                    </div>
                  </template>
                  <div style="padding: 10px 25px;">
                    <div class="text_area">{{item.introduce.length==0?'暂无内容':item.introduce}}</div>
                  </div>
                  <template #footer>
                    <!-- <van-icon name="location-o" size="17" />
                <span style="font-size:13px;color: gray;">{{item.address}}</span> -->
                    <van-button round="" size="small" class="round_btn" plain hairline type="warning">查看详情</van-button>
                    <van-button round="" size="small" class="round_btn" plain hairline type="info" v-on:click.stop="cancel_meet(item.id)">取消</van-button>
                  </template>
                </van-panel>
              </div>
            </van-pull-refresh>
          </van-list>
        </van-tab>
        <van-tab title="已完成">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了">
            <van-pull-refresh style="overflow-y: scroll;height: 100%;" v-model="isLoading" success-text='刷新成功' @refresh="onRefresh()">
              <div v-for="(item,index) in meet" v-if="item.state==2" style="width: 96%;border-radius: 2vw;margin: 2vw auto;overflow: hidden;">
                <van-panel @click="goRouter('meet_detail',item.id)">
                  <template #header>
                    <div class="van-cell van-panel__header">
                      <div class="van-cell__title">
                        <span style="15px">{{item.theme}}</span>
                        <div class="van-cell__label">{{item.date+' '+item.startTime}}</div>
                      </div>
                      <div class="van-cell__value van-panel__header-value">
                        <span style="color: gray;">已结束</span>
                      </div>
                    </div>
                  </template>
                  <div style="padding: 10px 25px;">
                    <div class="text_area">{{item.introduce.length==0?'暂无内容':item.introduce}}</div>
                  </div>
                  <template #footer>
                    <!-- <van-icon name="location-o" size="17" />
                <span style="font-size:13px;color: gray;">{{item.address}}</span> -->
                    <van-button round="" size="small" class="round_btn" plain hairline type="warning">查看详情</van-button>
                    <van-button round="" size="small" class="round_btn" plain hairline type="info" v-on:click.stop="goRouter('meet_rf',item.id)">评价</van-button>
                  </template>
                </van-panel>
              </div>
            </van-pull-refresh>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'meet_list',
    data() {
      return {
        count: 0,
        isLoading: false,
        active: 0,
        meet: [],
        is_meetLoading: false,
        loading: false,
        finished: false,
        user:this.$store.state.user
      }
    },
    computed: {},
    mounted() {

    },
    created() {
      //this.getall_meet()
    },
    methods: {
      onRefresh(showToast) {
        setTimeout(() => {
          this.isLoading = false;
          this.getall_meet();
        }, 1000);
      },
      getall_meet() {
        var axios = this.axios;
        var vm = this;
        axios.get('/conference/all', {
            params: {
              userId: this.$store.state.user
            }
          })
          .then(function(response) {
            if (response.data.code == 200) {
              vm.meet = response.data.data;
              vm.loading = false;
              vm.finished = true;
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      goRouter: function(pos, id) {
        console.log(id)
        this.$router.push({
          path: pos,
          query: {
            'meetid': id
          }
        }).catch(data => {})
      },
      cancel_meet: function(id) {
        var axios = this.axios;
        var vm = this;
        var url = '/conference/cancle';
        const params = new URLSearchParams();
        params.append('conferenceId', id)
        vm.$dialog.confirm({
          message: '是否取消该会议？'
        }).then(() => {
          cancel();
        }).catch(() => {})
        var cancel = function() {
          axios.post(url, params).then(function(response) {
            if (response.data.code == 200) {
              vm.$toast.success("取消会议成功");
              vm.$notify({
                type: 'success',
                message: '已向用户发送会议取消提示'
              });
              vm.onRefresh()
            } else {
              vm.$toast.fail("操作失败，请重新操作")
            }
          }).catch(function(error) {
            console.log(error)
            vm.$toast.fail("操作失败，请重新操作")
          })
        }
      },
      delete_meet: function(id) {
        var vm=this;
        vm.$dialog.confirm({
          message: '是否删除该会议记录？'
        }).then(() => {
          delete_m()
        }).catch(() => {

        })
        var delete_m = function() {
          var axios = vm.axios;
          var url = '/conference/delete?conferenceId=' + id+'&userId='+vm.$store.state.user;
          axios.post(url)
            .then(function(response) {
              if (response.data.code == 200) {
                vm.$toast.success("删除会议记录成功");
                vm.onRefresh();
              } else {
                vm.$toast.fail("操作失败，请重新操作");
              }
            })
            .catch(function(error) {
              console.log(error);
              vm.$toast.fail("操作失败，请重新操作")
            });
        }
      }
    }
  }
</script>

<style scoped="">
  @import url("../../assets/css/common.css");

  .van-panel__footer {
    text-align: right;
  }

  .van-tabs {
    height: 100%;
  }
</style>
