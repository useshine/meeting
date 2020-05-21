<template>
  <div v-if="is_rooming==true">
    <van-nav-bar title="会议室" class="account_title" @click-left="$router.back(-1)" left-text="" left-arrow>
      <template #title>
        <span class="account_title">会议室</span>
      </template>
      <template #right v-if="role!='user'">
        <van-icon name="add-o" size="20" @click="goRouter('add_room')" />
      </template>
    </van-nav-bar>
    <div class="content" style="height: calc(100% - 44px);background-color: #efeff4;">
      <van-card @click="goRouter('room',item.id)" v-if="item.state!=0||role!='user'" v-bind:key="item.id" v-for="(item,index) in room_list" v-bind:num="item.capacity"
        v-bind:desc="item.address" title="A101"  :thumb="item.picture?('http://120.26.48.169:8081/'+item.picture):' '"  style="background-color: white;padding: 5vw;">
        <template #title>
          <span style="font-size: 19px;">{{item.name}}</span>
        </template>
        <template #thumb>
          <van-image width="78px" height="68px" :src="item.picture?('http://120.26.48.169:8081/'+item.picture):' '">
            <template v-slot:error>暂无图片</template>
          </van-image>
        </template>
        <template #tag>
          <van-tag v-if="item.state" mark="" type="success">可用</van-tag>
          <van-tag v-else mark type="danger">禁用</van-tag>
        </template>
        <template #tags>
          <van-tag plain type="danger" v-if="item.audio">摄像头</van-tag>
          <van-tag plain type="danger" v-if="item.mike">投影</van-tag>
          <van-tag plain type="danger" v-if="item.projector">麦克风</van-tag>
        </template>
        <template #price>
          <van-rate v-model="item.score" size="medium" readonly />
        </template>
         <template v-slot:error>暂无图片</template>
        <template #footer>
          <van-button type="warning" size="small" @click.stop="goRouter('room',item.id)" v-bind:disabled="!item.state">预约</van-button>
          <van-button size="small" v-if="role!='user'" @click.stop="delete_room(item.id)">删除</van-button>
        </template>
      </van-card>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'room_list',
    data() {
      return {
        room_list: [],
        room_url: '/room',
        rate: 4.3,
        is_rooming: false,
        role: this.$store.state.root
      }
    },
    mounted() {

    },
    created() {
      this.$store.commit('showLoading')
      this.getallroom();
    },
    methods: {
      goRouter: function(pos, id) {
        this.$router.push({
          path: pos,
          query: {
            'roomid': id
          }
        }).catch(data => {})
      },
      getallroom: function() {
        var axios = this.axios;
        var vm = this;
        let url = vm.room_url;
        axios.get(url)
          .then(function(response) {
            console.log(response);
            vm.room_list = response.data.data;
            vm.is_rooming = true;
            vm.$store.commit('hideLoading')
          })
          .catch(function(error) {

          })
      },
      delete_room: function(id) {
        var vm = this;
        var axios = vm.axios;
        vm.$dialog.confirm({
          message: '是否删除该会议室？'
        }).then(() => {
          delete_room()
        }).catch(() => {});
        var delete_room = function() {
          let url = '/room/delete?roomId=' + id;
          axios.post(url)
            .then(function(response) {
              if (response.data.code == 200) {
                 vm.getallroom()
                 vm.$toast.success("删除会议室成功");

              }else{
                vm.$toast.fail(response.data.msg)
              }
            })
            .catch(function(error) {

            });
        }
      }
    }
  }
</script>

<style>
  @import url("../../assets/css/common.css");
</style>
