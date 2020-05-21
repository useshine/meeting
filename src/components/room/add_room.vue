<template>
  <div>
    <van-nav-bar title="添加会议室" @click-left="$router.back(-1)" class="account_title" left-text="" left-arrow>
      <template #title>
        <span class="account_title">添加会议室</span>
      </template>
    </van-nav-bar>
    <div>
      <van-form @submit="">
        <van-field v-model="post.name" name="name" label="会议室名称" placeholder="会议室" :rules="[{ required: true, message: '填写会议室名称' }]" />
        <van-field name="stepper" label="容量">
          <template #input>
            <van-stepper v-model="post.capacity" />
          </template>
        </van-field>
        <van-field name="checkboxGroup" label="设备">
          <template #input>
            <van-checkbox-group v-model="checkboxGroup" direction="horizontal">
              <van-checkbox name="a" shape="square">投影仪</van-checkbox>
              <van-checkbox name="b" shape="square">话筒</van-checkbox>
              <van-checkbox name="c" shape="square">音响</van-checkbox>
            </van-checkbox-group>
          </template>
        </van-field>
        <van-field readonly clickable name="area" :value="addr.address" label="地址" placeholder="点击选择省市区" @click="showArea = true" />
        <van-field v-model="addr.address_detail" label="详细地址" />
        <div style=" background: white;">
          <div style="font-size: 13px; color: gray;background: ghostwhite;text-align: center; border-radius: 2vw;width: 98%;margin: 0 auto;">*请输入会议室大致位置情况，具体地址由该会议室绑定设备提供。</div>
        </div>
        <van-field required="" name="uploader" label="文件上传">
          <template #input>
            <van-uploader v-model="post.file" :max-count="1" :before-read="beforeRead" :after-read="afterRead" />
          </template>
        </van-field>
        <van-field style="margin-top: 2vw;border-radius: 2vw 2vw 0 0;" v-model="post.remark" rows="4" autosize label="留言"
          type="textarea" maxlength="100" placeholder="请输入留言" show-word-limit />
        <!-- <van-field name="switch" label="启用会议室">
          <template #right-icon>
            <van-switch v-model="post.state" size="20" />
          </template>
        </van-field> -->
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit" @click="add_room()">
            添加
          </van-button>
        </div>
      </van-form>
    </div>
    <van-popup v-model="showArea" position="bottom">
      <van-area :area-list="areaList" @confirm="onConfirm" @cancel="showArea = false" />
    </van-popup>
  </div>
</template>

<script>
  import AreaList from '../../../static/js/area.js'
  export default {
    data() {
      return {
        post: {
          name: '',
          capacity: 1,
          address: '',
          file: [],
          audio: false,
          mike: false,
          projector: false,
          remark: '',
          state: false
        },
        checkboxGroup: [],
        checkbox: false,
        showArea: false,
        areaList: AreaList,
        addr: {
          address: '',
          address_detail: '',
        }
      };
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
      onConfirm: function(values) {
        this.addr.address = values.map(item => item.name).join('');
        this.showArea = false
      },
      add_room: function() {
        var axios = this.axios;
        var vm = this;
        vm.post.audio = vm.checkboxGroup.indexOf('a') != -1 ? true : false;
        vm.post.mike = vm.checkboxGroup.indexOf('b') != -1 ? true : false;
        vm.post.projector = vm.checkboxGroup.indexOf('c') != -1 ? true : false;
        let params = new FormData();
        if (vm.post.file.length) {
          params.append("file", vm.post.file[0].file);
        }
        console.log(vm.post.file[0])
        params.append("name", vm.post.name);
        params.append("capacity", vm.post.capacity);
        params.append('address', vm.addr.address + vm.addr.address_detail);
        params.append('audio', vm.post.audio);
        params.append('mike', vm.post.mike);
        params.append('projector', vm.post.projector);
        params.append('remark', vm.post.remark);
        params.append('state', vm.post.state);
        var url = '/room';
        axios.post(url, params)
          .then(function(response) {
            console.log(response.data)
            if (response.data.code == 200) {
              vm.$dialog.alert({
                message: '添加会议室成功，请尽快绑定前端设备'
              }).then(() => {
                vm.goRouter('room', response.data.data.roomId)

              })
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      beforeRead(file) {
        if (file.type !== 'image/jpeg') {
          Toast('请上传 jpg 格式图片');
          return false;
        }
        return true;
      },
      afterRead(file) {
        // 此时可以自行将文件上传至服务器
        console.log(file);
      },
    },
  }
</script>

<style>
</style>
