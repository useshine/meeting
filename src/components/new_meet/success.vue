<template>
  <div id="map" style="width:100%; height:100%">
    <van-nav-bar title="附近" class="account_title" left-text="" left-arrow @click-left="$router.back(-1)">
    </van-nav-bar>
    <!--头部-->
    <div id="container" style="width:100%;height: calc(100% - 44px); "></div>
    <div id="plant" v-if="plant" @click="goRouter('room',1)">
      <img src="../../../dist/static/pic/pic2.jpg" style="margin-top: 3%; width: 30%;margin-right: 3vw;height: 80%;" />
      <div>
        <div style="color: black;font-size: 16px;line-height: 2;">会议室101  >></div>
        <div style="font-size: 14px;">地址:杭州市江干区白杨街道学府街112号</div>
        <div style="float: right;font-size: 13px;">距离您：400米</div>
      </div>
    </div>
  </div>
</template>

<script>
  import AMap from 'AMap'
  const position = [{
    lng: 120.389866,
    lat: 30.313311
  }, {
    lng: 120.390559,
    lat: 30.310213
  }, {
    lng: 120.391348,
    lat: 30.314405
  }, {
    lng: 120.394082,
    lat: 30.313159
  },{
    lng:120.39149,
    lat:30.31204
  }]
  //  var geolocation, markers
  var map, placeSearch, self, placeSearchOptions, listCount, marker
  //  var poisArrr
  var num = []
  var poisArrCopy = []
  var numIndex = 0
  export default {
    components: {},
    mounted: function() {
      let _self = this
      let promise = new Promise(function(resolve, reject) {
        _self.init()
        resolve()
      })
      promise.then(function() {
        _self.searchData()
        _self.demo()
      }).then(function() {})
    },
    created() {},
    data() {
      self = this
      return {
        position: position,
        listCount: listCount,
        center: {
          lng: 0,
          lat: 0
        },
        num: num,
        footer_button: 'footer_button',
        plant:false
      }
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
      init: function() {
        map = new AMap.Map('container', {
          resizeEnable: true
        })
        AMap.plugin(['AMap.Geolocation', 'AMap.PlaceSearch', 'AMap.ToolBar'],
          function() {
            var geolocation = new AMap.Geolocation({
              enableHighAccuracy: true, //是否使用高精度定位，默认:true
              timeout: 10000, //超过10秒后停止定位，默认：无穷大
              maximumAge: 0, //定位结果缓存0毫秒，默认：0
              convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
              showButton: true, //显示定位按钮，默认：true
              buttonPosition: 'LB', //定位按钮停靠位置，默认：'LB'，左下角
              buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
              showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
              showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
              panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
              zoomToAccuracy: true //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            });
            map.addControl(geolocation);
            map.addControl(new AMap.ToolBar());
            geolocation.getCurrentPosition();
            AMap.event.addListener(geolocation, 'complete', onComplete); //返回定位信息
            AMap.event.addListener(geolocation, 'error', onError); //返回定位出错信息
            function onComplete(data) {
              console.log(data);
              let addresscomp = data.addressComponent;
              let add = addresscomp.province + addresscomp.city + addresscomp.district + addresscomp.township +
                addresscomp.street +
                addresscomp.streetNumber;
              console.log(add);
              window.localStorage.setItem('address', add);
            };

            function onError(data) {
              console.log(data)
            }
          })
      },
      searchData: function() {
        for (let i = 0; i < self.position.length; i++) {
          marker = new AMap.Marker({
            title: 'abc',
            icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b' + (i + 1) + '.png',
            position: [self.position[i].lng, self.position[i].lat],
            offset: new AMap.Pixel(-24, 5),
            zIndex: 1,
            map: map,
            clickable: true
          })
          AMap.event.addListener(marker, 'click', function() {
            console.log(i);
            self.plant=true;
            marker.setIcon('https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png')
          });
        }
      },
      listClose() {
        let content = document.getElementsByClassName('content')[0]
        content.style.visibility = 'hidden'
      },
      listOpen() {
        let content = document.getElementsByClassName('content')[0]
        content.style.visibility = 'visible'
      },
      demo: function() {
        numIndex++
        if (numIndex > 4) {
          if (self.num.length > 0) {
            return map.clearMap() // 清除地图覆盖物
          }
        }
      },
      /*  注册每项的点击事件,默认显示num0，也就是交通，实际上所有的数据已经请求到了，点击按钮只是用来切换maker */
    }
  }
</script>

<style>
  #map {
    position: absolute;
    padding: 0;
    width: 100%;
    background: #FFFFFF;
  }

  #container {
    width: 100%;
    height: 100%;
    font-size: 15px;
  }

  .enroll {
    display: inline-block;
    width: 28%;
    background: #fe4a4a;
    color: #FFFFFF;
  }

  #plant {
    width: 80%;
    position: absolute;
    height: 120px;
    z-index: 999;
    top: 50%;
    background-color: white;
    left: 10%;
    border-radius: 3vw;
    font-size: 15px;
    padding: 3vw;
    color: gray;
    display: flex;
  }
</style>
