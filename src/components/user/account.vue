<template>
  <div style="background-color: #efeff4;height: 100%;">
    <van-nav-bar title="账号管理" class="account_title" left-text="" left-arrow @click-left="$router.back(-1)">
    </van-nav-bar>
    <div class="mui-content">
      <van-cell-group title="个人信息">
        <van-cell title="身份认证" is-link to="/identify" />
      </van-cell-group>
      <van-cell-group title="管理">
         <van-cell title="部门管理" is-link to="/department" />
         <van-cell title="会议室管理" is-link to="/room_list" />
      </van-cell-group>
<!--      <van-cell-group title="成员信息">
        <van-cell title="全部成员" is-link to="/member" />
      </van-cell-group> -->
    </div>
    <van-popup v-model="showList" round="" position="bottom" style="">
      <van-list v-model="loading" :finished="finished" finished-text="" @load="onLoad">
        <van-radio-group v-model="radio">
          <van-cell-group>
            <van-cell v-for="item in list" :key="item.id" :title="item.name" clickable @click="click_ra(item)">
              <template #right-icon>
                <van-radio v-bind:name="item.id" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </van-list>
    </van-popup>
  </div>
</template>

<script>
  export default {
    name: 'account',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        department:'财务部',
        list: [{
            id: 1,
            name: "财务部",
            tel: ''
          },
          {
            id: 2,
            name: "宣传部",
            tel: ''
          }
        ],
        showList: false,
        loading: false,
        finished: false,
        radio: '1'
      };
    },
    mounted() {

    },
    computed: {

    },
    methods: {
      onLoad() {
        this.finished = true
      },
      click_ra(key){
        this.radio=key.id;
        this.showList=false;
        this.department=key.name;
      }
    }
  }
</script>

<style>
  @import url("../../assets/css/common.css");
</style>
