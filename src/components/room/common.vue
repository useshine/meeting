<template>
   <div class="room_use_detail">
     <div v-for="(item, index) in morn" v-bind:key="index" v-bind:class="(index==8||index==23)? 'text_use_detail_time':''">
       <div class="little_time2" v-bind:style="item.state==0?'#c0c0c0':(item.state==1)?'background:#ffbd5f':'background:#ddd'">
         <div class="hu_time" v-if="index==8">8:00</div>
         <div class="hu_time" v-if="index==23">12:00</div>
       </div>
     </div>
     <div v-for="(item, index) in mid" v-bind:key="index" v-bind:class="(index==0||index==23)? 'text_use_detail_time':''">
       <div class="little_time2" v-bind:style="item.state==0?'#c0c0c0':(item.state==1)?'background:#ffbd5f':'background:#ddd'">
         <div class="hu_time" v-if="index==0">12:00</div>
         <div class="hu_time" v-if="index==23">18:00</div>
       </div>
     </div>
     <div v-for="(item, index) in even" v-bind:key="index" v-bind:class="(index==0||index==23)? 'text_use_detail_time':''">
       <div class="little_time2" v-bind:style="item.state==0?'#c0c0c0':(item.state==1)?'background:#ffbd5f':'background:#ddd'">
         <div class="hu_time" v-if="index==0">18:00</div>
         <div class="hu_time" v-if="index==12">21:00</div>
       </div>
     </div>
   </div>
  <!-- <div style="overflow: hidden;">
     <div style="font-size: 15px;color: gray;float: left;">
       <span class="mui-icon mui-icon-map" style="font-size: 20px;"></span> 浙江省杭州市将该拿去
     </div>
   </div> -->
</template>

<script>
  export default{
    props:[
      'morn','mid','even'
    ]
  }
</script>

<style>

</style>
