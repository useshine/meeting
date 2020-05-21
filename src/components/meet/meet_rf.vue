<template>
  <div style="height: 100%;">
    <van-nav-bar title="发表评价" class="account_title" :color="'#0FAFAA'" left-arrow @click-left="$router.back(-1)" @click-right="remark()">
      <template #right>
        <span  style="letter-spacing: 0px;color: #FF9800;font-size: 16px;">发布</span>
      </template>
    </van-nav-bar>
    <div style="width: 96%;margin: 2vw auto;">
      <van-cell is-link="" :title="meet.room" value="详情" size="large" label="" @click="goRouter('room',meet.roomId)">
        <template #label>
          <van-icon name="location-o" />
          <span>{{meet.address}}</span>
        </template>
      </van-cell>
      <van-field style="padding: 4vw;" name="rate" label="评分">
        <template #input>
          <van-rate v-model="rate" />
        </template>
      </van-field>
      <van-field style="margin-top: 2vw;border-radius: 2vw 2vw 0 0;" v-model="message" rows="7" autosize label="留言" type="textarea" maxlength="300" placeholder="请输入留言"
        show-word-limit />
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        rate: 0,
        message:' ',
        meetid:'',
        participantId:'',
        meet:[]
      }
    },
    created() {
      this.getParams();
      this.participantId=this.$store.state.user
    },
    methods:{
      goRouter: function(pos, id) {
        this.$router.push({
          path: pos,
          query: {
            'roomid': id
          }
        }).catch(data => {})
      },
      getParams: function() {
        var vm=this;
        // 取到路由带过来的参数
        vm.meetid = vm.$route.query.meetid;
        // 将数据放在当前组件的数据内
        vm.get_detail()
      },
      remark:function(){
        var axios=this.axios;
        var vm=this;
        let params=new URLSearchParams();
        let url='/evaluate'
        params.append('conferenceId',vm.meetid);
        params.append('participantId',vm.participantId);
        params.append('mark',vm.rate);
        params.append('evaluate',vm.message);
        axios.post(url,params)
        .then(function(response){
           if(response.data.code==200){
              vm.$toast.success('评价成功！');
           }
        })
        .catch(function(error){
          console.log(error)
        })
      },
      get_detail() {
        let axios = this.axios;
        var vm = this;
        axios.get('/conference/detail', {
          params: {
            conferenceId: vm.meetid
          }
        }).then(function(response) {
          if (response.data.code == 200) {
            vm.meet = response.data.data;
          }
        }).catch(function(error) {
          console.log(error)
        });
      },
    }
  }
</script>

<style scoped="">
  .van-field__control{
    padding: 2vw;
    background-color: #FAFAFA;
  }
</style>
