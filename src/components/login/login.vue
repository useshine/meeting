<template>
  <div style="height: 100%;background-color: white;padding: 12% 0;">
    <div style="text-align: center;margin: 0 10% 12%">
      <van-image round width="6rem" height="6rem" src="http://120.26.48.169:8081/logo.jpg" />
      <div style="font-size: 6vw;font-family: fantasy;margin-top: 1vw;">Conference++</div>
    </div>
    <van-form @submit="onSubmit" required style="padding:0 14%;">
      <van-field autofocus="" v-on:focus="get($event)" v-model="username" name="account" label="" placeholder="*用户名"
        :rules="[{ required: true, message: ' ' }]" />
      <van-field style="margin-top: 5vw;" v-model="password" type="password" name="password" label="" placeholder="*密码"
        :rules="[{ required: true, message: ' ' }]" />
      <div style="text-align: right;margin-top: 5vw;text-decoration: underline;color: #b1b1b5;">
        <router-link style="color: gray;font-size: 15px;" to="/register">立即注册</router-link>
        </div>
      <div style="margin: 10% 0;">
        <van-button block type="info" color="#75e5d2" native-type="submit" style="border-radius: 2vw;">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        height: {
          maxHeight: 100,
          minHeight: 50
        },
      };
    },
    mounted() {

    },
    created() {
      console.log(this.$route.path)
    },
    methods: {
      onSubmit(values) {
        var axios = this.axios;
        var vm = this;
        var url = '/login';
        if (values) {
          axios.post(url, {
              'account': vm.username,
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
                this.$store.commit('SET_PHONE', vm.username);
                this.get_usrinfo(response.data.data.userId);
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
      get: function(item) {
        var dom = item.currentTarget;
        var style = "border-bottom: 2px solid blue;";
        var ele = document.createElement("style");
        ele.innerHTML = style;
        dom.appendChild(ele);
        console.log("ddd");
      },
      get_usrinfo:function(id){
        var axios=this.axios;
        var vm=this;
        var url='/user';
        axios.get(url,{
          params:{
            userId:id
          }
        })
        .then(function(response){
          console.log(response)
          if(response.status==200){
            vm.$store.commit('SET_NAME',response.data.data.name);
          }
        })
        .catch(function(error){
          console.log(error)
        });
      }
    }
  }
</script>

<style scoped="">
  .van-cell.van-field {
    line-height: 4;
    padding: 10px 16px;
    border-bottom: 1px solid darkgray;
  }

  .addstyle {
    border-bottom: 2px solid blue;
  }
</style>
<style>

</style>
