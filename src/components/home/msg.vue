<template>
  <div style="height: 100%;">
    <van-nav-bar title="通知" class="account_title" left-text="" left-arrow @click-left="$router.back(-1)">
    </van-nav-bar>
    <div style="padding: 2vw;height: calc(100% - 44px);overflow-y: scroll">
      <div @click="goRouter('meet_detail',item.meet_id)" v-for="(item,index) in Messages" style="display: flex;margin-bottom: 5vw;align-items: end;">
        <van-image round width="3rem" height="3rem" :src="pic_url+'/msg.png'" />
        <div style="width: 80vw;display: inline-block;background-color: white;padding: 2vw;margin-left: 2vw;border-radius: 2vw;line-height: 2;">
          <div style="color: #fe9b08;padding: 0px 16px;">{{item.meet_name}}</div>
          <div style="font-size: 15px;color: gray;padding: 0px 16px;">
            <div>发起人：{{item.meet_initiator}}</div>
            <div>会议地点：{{item.meet_room}}</div>
            <div>会议时间：{{item.meet_date}}</div>
          </div>
          <van-cell title="查看详情" is-link style="border-top: 1px solid gainsboro;" />
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  export default {
    name: 'msg',
    data() {
      return {
        msg: [{
            "msg": "张三向您发来会议邀请",
            "meet_room": "A301",
            "meet_id": 41,
            "meet_initiator": "张三",
            "title": "会议邀请",
            "meet_name": "ddddd",
            "meet_date": "2020-04-18"
          },
          {
            "title": "会议邀请1",
            "msg": "小明向你发来会议邀请",
            "meet_name": "第七次会议",
            "meet_date": "2020-04-05",
            "meet_initiator": "王小明",
            "meet_room": "会议室101",
            "meet_id": "12"
          }
        ],
        pic_url:'http://120.26.48.169:8081/'
      }
    },
    computed: mapState(['Messages']),
    mounted() {

    },
    created() {

    },
    methods:{
      goRouter: function(pos, id) {
        console.log(id)
        this.$router.push({
          path: pos,
          query: {
            'meetid': id
          }
        }).catch(data => {})
      },
    }
  }
</script>

<style>
</style>
