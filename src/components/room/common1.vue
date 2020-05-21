<template>
  <div style="width: 100%;">
    <div style="color: gray;font-size: 15px;overflow: hidden;">
      <van-tag mark type="success" size="medium">{{name}}</van-tag>
      <div style="float: right;">08：00~21：00</div>
    </div>
    <div class="room_use_detail">
      <div v-for="(item, index) in time" v-bind:key="index" v-bind:class="(index==1||index==17||index==40||index==52)? 'text_use_detail_time':''">
        <div class="little_time1" v-bind:style="item.state==0?'#c0c0c0':(item.state==1)?'background:#ffbd5f':'background:#efeff4'">
          <div class="hu_time" v-if="index==1">8:00</div>
          <div class="hu_time" v-if="index==17">12:00</div>
          <div class="hu_time" v-if="index==40">18:00</div>
          <div class="hu_time" v-if="index==52">21:00</div>
        </div>
      </div>
    </div>
    <div>
      <div style="font-size: 15px;color: gray;float: left;width: 40%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap">
        <van-icon name="location-o" size="m" />{{address}}
      </div>
      <div style="float: right;height: 1.5rem;">
        <a @click="send_msg()">
          <v-icon style="width: 1.5rem;height: 1.5rem;color:#ff976a" name="arrow-right-circle"></v-icon>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: [
      'time', 'name', 'address', 'room', 'viewapi'
    ],
    data() {
      return {
        choose_room: {},
        coom_viewapi: null,
        timeok: []
      }
    },
    watch: {
      room: function(newval, oldval) {
        this.choose_room = newval;
      },
      viewapi: function(newval, oldval) {
        console.log(newval)
        this.coom_viewapi = newval
      },
    },
    methods: {
      send_msg: function() {
        this.$emit('func', this.choose_room);

      }
    }
  }
</script>

<style>

</style>
