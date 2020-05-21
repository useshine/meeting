<template>
  <div v-if="is_usering">
    <van-nav-bar title="身份认证" left-text="" left-arrow @click-left="$router.back(-1)">

    </van-nav-bar>
    <div class="mui-content" id="edit_user_msg">
      <van-cell-group title=" ">
        <van-field v-model="user.name" v-bind:readonly="edit?false:true" clearable label="姓名" left-icon="manager-o"
          placeholder="输入姓名" />
        <van-field v-model="user.gender?'男':'女'" v-bind:readonly="edit?false:true " label="性别" left-icon="flower-o"
          placeholder="" @click="edit?showList=true:''" />
        <van-field v-model="user.age" v-bind:readonly="edit?false:true" clearable label="年龄" left-icon="clock-o"
          placeholder="" />
      </van-cell-group>
      <van-cell-group title=" ">
        <van-field v-model="user.email" v-bind:readonly="edit?false:true" clearable label="邮箱" left-icon="envelop-o"
          placeholder="输入正确邮箱" />
        <van-field v-model="user.phone" readonly="" clearable label="电话号码" left-icon="phone-circle-o" placeholder="输入正确电话号码" />
      </van-cell-group>
      <van-cell-group title=" ">
        <van-cell title="所属部门" style="pointer-events: painted;" @click="edit?showDepartment=true:''" is-link
          arrow-direction="down" v-bind:value="user.department" />
      </van-cell-group>
      <van-cell-group title=" " @click="edit?git_up():''">
        <van-cell title="人像采集" is-link>
          <!-- 使用 title 插槽来自定义标题 -->
          <template #right-icon v-if="edit==false">
            <van-tag type="danger" v-if="!user.faceFeature">未完成</van-tag>
            <van-tag type="success" v-else>已完成</van-tag>
          </template>
          <template #right-icon v-else-if="file_url==''">
            <van-tag mark type="danger">未采集</van-tag>

          </template>
          <template #right-icon v-else>
            <van-tag mark type="success">已采集</van-tag>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
    <van-popup v-model="showList" round="" position="bottom" style="">
      <van-radio-group v-model="radio">
        <van-cell-group>
          <van-cell title="女" clickable @click="click_ra(0)">
            <template #right-icon>
              <van-radio name="0" />
            </template>
          </van-cell>
          <van-cell title="男" clickable @click="click_ra(1)">
            <template #right-icon>
              <van-radio name="1" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-popup>
    <van-popup v-model="showDepartment" round="" position="bottom" style="">
      <van-list v-model="loading" :finished="finished" finished-text="" @load="onLoad">
        <van-radio-group v-model="radio">
          <van-cell-group>
            <van-cell v-for="item in list" :key="item.departmentId" :title="item.departmentName" clickable @click="click_dep(item)">
              <template #right-icon>
                <van-radio v-bind:name="item.departmentId" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </van-list>
    </van-popup>
   <div style="margin: 25px 2vw;">
     <van-button @click="toedit()"  v-if="edit==false" block type="info" color="red" native-type="submit" style="border-radius: 2vw;">
       修改
     </van-button>
     <van-button @click="update()"  v-else block type="info" color="#75e5d2" native-type="submit" style="border-radius: 2vw;">
       保存
     </van-button>
   </div>
  </div>
</template>

<script>
  export default {
    name: 'identify',
    data() {
      return {
        user: {
          id: this.$store.state.user,
          departmentId: 1,
          department: "财务部",
          name: "张三",
          age: 10,
          email: "807281235@qq.com",
          gender: true,
          phone: "18768170289",
          faceFeature: null
        },
        showList: false,
        loading: false,
        finished: false,
        list: [{
            departmentId: 1,
            departmentName: "财务部",
            tel: ''
          },
          {
            departmentId: 2,
            departmentName: "宣传部",
            tel: ''
          }
        ],
        showDepartment: false,
        radio: 1,
        edit: false,
        update_url: '/user',
        file_url: '',
        is_usering: false
      }
    },
    mounted() {

    },
    created() {
      this.getUserInfo();
    },
    methods: {
      onLoad() {
        var axios = this.axios;
        var vm = this;
        var url = '/department';
        axios.get(url)
          .then(function(response) {
            console.log(response)
            if (response.status == 200) {
              vm.list = response.data.data;
            }
          })
          .catch(function(error) {
            console.log(error)
          })
        this.finished = true
      },
      click_dep(key) {
        this.radio = key.departmentId;
        this.showDepartment = false;
        this.user.department = key.departmentName;
        this.user.departmentId = key.departmentId;
      },
      click_ra: function(gender) {
        var vm = this;
        vm.radio = gender;
        vm.showList = false;
        vm.user.gender = gender ? true : false;
      },
      toedit: function() {
        var vm = this;
        vm.edit = true;
      },
      git_up: function() {
        var vm = this;
        console.log(vm.user)
        var cmr = plus.camera.getCamera();
        cmr.captureImage(function(p) {
          plus.io.resolveLocalFileSystemURL(p, function(entry) {
            plus.nativeUI.showWaiting("人脸识别中", "");
            plus.zip.compressImage({
              src: entry.toLocalURL(),
              dst: '_doc/camera/' + p,
              overwrite: true,
              format: "jpg",
            }, function(zip) {
              if (zip.size > (1 * 1024 * 1024)) {
                return mui.toast('文件超大,请调整相机重新拍照');
              }
              console.log(zip.size);
              vm.file_url = zip.target;
              console.log(vm.file_url);
              //转为base64
              //getBase64(file_url);
              //uploadToServer(file_url);
              plus.nativeUI.closeWaiting();
            }, function(zipe) {
              plus.nativeUI.closeWaiting();
              mui.toast('压缩失败！');
            });
          }, function(e) {
            plus.nativeUI.closeWaiting(); //获取图片失败,loading框取消
            mui.toast('失败：' + e.message); //打印失败原因,或给出错误提示
          });
        }, function(e) {
          plus.nativeUI.closeWaiting(); //开启照相机失败,关闭loading框
          mui.toast('失败：' + e.message); //打印错误原因,给出错提示
        }, {
          filename: '_doc/camera/', //图片名字
          index: 1 //摄像头id
        });
      },
      update: function() {
        var vm = this;
        console.log("上传")
        vm.uploadToServer();
      },
      uploadToServer: function() {
        var vm = this;
        let update = 'http://120.26.48.169:8081' + vm.update_url;
        console.log(JSON.stringify(vm.user))
        var task = plus.uploader.createUpload(update, {
          method: "POST",
          blocksize: 20 * 1024,
        }, function(t, status) {
          console.log(status)
          var msg = task.responseText;
          console.log(JSON.stringify(msg));
          if (status == 200) {
            msg=JSON.parse(task.responseText)
            if (msg.code == 200) {
              vm.$store.commit('SET_IDENTIFY', true);
              vm.$toast.success("修改认证信息成功");
              vm.edit = false;
              vm.$store.commit('SET_NAME', vm.user.name);
              vm.getUserInfo()
            } else {
              vm.$toast.fail(msg.msg);
              console.log(JSON.stringify(t));
              vm.edit = false;
            }
          } else {
             console.log(t)
             vm.$toast.fail("修改信息失败，请重新操作");
          }
        });
        task.addFile(vm.file_url, {
          key: "file"
        });
        task.addData("id", vm.user.id+'');
        task.addData("age", vm.user.age);
        task.addData("departmentId", vm.user.departmentId+'');
        task.addData("email", vm.user.email);
        task.addData("gender", vm.user.gender);
        task.addData("name", vm.user.name);
        console.log(vm.user.id)
        task.start();

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
              vm.$store.commit('SET_NAME', response.data.data.name);
            }
          })
          .catch(function(error) {
            console.log(error)
          });
      }
    }
  }
</script>

<style scoped="">
  .van-cell-group.van-hairline--top-bottom {
    padding: 2vw 3vw;
  }
</style>
