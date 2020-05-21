<template>
  <div style="height: 100%;">
    <van-nav-bar title="注册" class="account_title" :color="'#0FAFAA'" left-arrow @click-left="$router.back(-1)">
    </van-nav-bar>
    <div style="background-color: rgb(250, 250, 250);height: 100%;">
      <van-form @submit="register" required validate-first @failed="onFailed">
        <!-- 通过 pattern 进行正则校验 -->
        <van-field class="padding" autofocus v-model="phone" name="手机号" placeholder="请输入正确手机号" label="手机号" :rules="[{ required: true, pattern, message: '格式错误',trigger:'onChange'}]" />
        <van-field autofocus class="padding" v-model="password" type="password" name="password" label="密码" placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]" />
        <van-field class="padding" v-model="password1" type="password" name="password" label="确认密码" placeholder="请再次输入密码"
          :rules="[{ required: true, validator: asyncValidator, message: '两次输入密码不一致',trigger:'onChange'}]" />
        <div style="margin: 25px 13vw;">
          <van-button block type="info" color="#75e5d2" native-type="submit" style="border-radius: 2vw;">
            注册
          </van-button>
        </div>

      </van-form>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        phone: '',
        password: '',
        password1: '',
        pattern: /^1[3456789]\d{9}$/
      }
    },
    created() {

    },
    methods: {
      asyncValidator(val) {
        var vm = this;
        console.log(val)
        if (val === vm.password)
          return true;
        else
          return false;
      },
      onFailed(errorInfo) {
        console.log('failed', errorInfo);
      },
      register: function(values) {
        var axios = this.axios;
        var vm = this;
        var url = '/registered';
        const params = new URLSearchParams();
        params.append('account', vm.phone);
        params.append('password', vm.password);
        if (values) {
          axios.post(url, params)
            .then((response) => {
              if (response.data.code === 200) {
                vm.login();
              } else {
                this.$dialog.alert({
                  message: response.data.msg,
                }).then(() => {

                });
              }
            })
            .catch(function(error) {
              console.log(error);
              return false;
            });
        }
      },
      login: function() {
        var axios = this.axios;
        var vm = this;
        var url = '/login';
        axios.post(url, {
            'account': vm.phone,
            'password': vm.password
          }).then((response) => {
            if (response.data.code === 200) {
              this.$store.commit('SET_USER', response.data.data.userId);
              if(response.data.data.hasOwnProperty('role')){
              this.$store.commit('SET_ROOT', response.data.data.role);
              }else{
                this.$store.commit('SET_ROOT', 'user');
              }
              this.$store.commit('SET_IDENTIFY', response.data.data.isVerify);
              this.$store.commit('SET_PHONE', vm.phone);
              this.$router.push({
                name: 'first'
              });
              // this.axios.defaults.withCredentials=true;
            } else {
              this.$dialog.alert({
                message: "账号或密码错误",
              }).then(() => {

              });
            }
          })
          .catch(function(error) {
            console.log(error);
            return false;
          });

      }
    },
  }
</script>

<style scoped="">
  .padding {
    padding: 4vw 13vw;
  }
</style>
