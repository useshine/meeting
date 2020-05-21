<template>
  <div>
    <header class="mui-bar mui-bar-nav hu_header" >
      <van-icon name="arrow-left" style="line-height: 44px" @click="$router.back(-1)" />
      <h1 class="mui-title account_title">部门管理</h1>
      <span class="mui-icon mui-icon-plus add" @click="add_department()"></span>
    </header>
    <div class="mui-content">
      <div id="pullrefresh" class="mui-content mui-scroll-wrapper">
        <div class="mui-scroll">
          <!--数据列表-->
          <div id='list' class="mui-indexed-list">
            <div class="mui-indexed-list-search mui-input-row mui-search">
              <input type="search" class="mui-input-clear mui-indexed-list-search-input" placeholder="搜索部门">
            </div>
            <div class="mui-indexed-list-bar">
              <a>A</a>
              <a>B</a>
              <a>C</a>
              <a>D</a>
              <a>E</a>
              <a>F</a>
              <a>G</a>
              <a>H</a>
              <a>I</a>
              <a>J</a>
              <a>K</a>
              <a>L</a>
              <a>M</a>
              <a>N</a>
              <a>O</a>
              <a>P</a>
              <a>Q</a>
              <a>R</a>
              <a>S</a>
              <a>T</a>
              <a>U</a>
              <a>V</a>
              <a>W</a>
              <a>X</a>
              <a>Y</a>
              <a>Z</a>
            </div>
            <div class="mui-indexed-list-alert"></div>
            <div class="mui-indexed-list-inner">
              <div class="mui-indexed-list-empty-alert">没有数据</div>
              <ul class="mui-table-view mui-table-view-chevron" id="department">
                <template v-for="(item,index) in department1">
                  <template v-if="index!=0">
                    <template v-if="department1[index].value[0]!=department1[index-1].value[0]">
                      <li :data-group="item.value[0]" class="mui-table-view-divider mui-indexed-list-group">
                        {{ item.value[0]}}
                      </li>
                    </template>
                  </template>
                  <template v-else>
                    <li :data-group="item.value[0]" class="mui-table-view-divider mui-indexed-list-group">
                      {{item.value[0]}}
                    </li>
                  </template>
                  <li :data-value="item.value" :data-tags="item.value[0]" class="mui-table-view-cell mui-indexed-list-item" style="padding: 0 25px 0 15px;height: 14vw;">
                    <!-- {{item.departmentName}} -->
                    <van-swipe-cell :before-close="beforeClose" v-bind:name="item.departmentId">
                      <van-cell v-bind:title="item.departmentName" style="height: 14vw;line-height: 10vw;" />
                      <template #right>
                        <van-button square type="danger" text="删除" style="height: 14vw;"/>
                      </template>
                    </van-swipe-cell>
                  </li>
                </template>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-dialog v-model="show" title="添加部门" show-cancel-button v-on:confirm="department(value)">
      <van-field v-model="value" placeholder="请输入部门名称" />
    </van-dialog>
  </div>
</template>

<script>
  require('../../../static/mui/js/mui.indexedlist.js')
  export default {
    name: 'department',
    data() {
      return {
        department1: [{
            departmentName: "财务部",
            value: "CWB"
          },
          {
            departmentName: "创意部",
            value: "CYB"
          },
          {
            departmentName: "活动部",
            value: "HDB"
          },
          {
            departmentName: "行政部",
            value: "XZB"
          },
          {
            departmentName: "卫生部",
            value: "WSB"
          },
          {
            departmentName: "宣传部",
            value: "XCB"
          },
        ],
        show:false,
        value:''
      }
    },
    components:{
       // [Dialog.Component.name]: Dialog.Component
    },
    mounted() {
      var mui = this.mui;
      var vm = this;
      mui.init({
        pullRefresh: {
          container: '#pullrefresh',
          down: {
            style: 'circle',
            callback: pulldownRefresh
          }
        }
      });
      mui.ready(function() {
        var header = document.querySelector('header.mui-bar');
        var list = document.getElementById('list');
        //calc hieght
        list.style.height = (document.body.offsetHeight - header.offsetHeight) + 'px';
        //create
        window.indexedList = new mui.IndexedList(list);
      });

      function pulldownRefresh() {
        setTimeout(function() {
          fresh();
          mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
        }, 1500);
      }

      function fresh() {
        var table = document.body.querySelector('.mui-table-view');
        var cells = document.body.querySelectorAll('.mui-table-view-cell');
        vm.getDepartment();
      }
    },
    created() {
      var pinyin = require("pinyin");
      console.log(pinyin("中心", {
        style: pinyin.STYLE_FIRST_LETTER, // 设置拼音风格
        heteronym: true
      }));
      this.getDepartment();
    },
    methods: {
      add_department: function(e) {
        var vm = this;
        vm.show=true;
      },
      getDepartment: function() {
        var compare = function(obj1, obj2) {
          var val1 = obj1.value[0];
          var val2 = obj2.value[0];
          if (val1 < val2) {
            return -1;
          } else if (val1 > val2) {
            return 1;
          } else {
            return 0;
          }
        }
        var axios = this.axios;
        var vm = this;
        var url =  '/department';
        axios.get(url)
          .then(function(response) {
            console.log(response)
            if (response.status == 200) {
              var pinyin = require("pinyin");
              let msg = response.data.data;
              for (let de of msg) {
                var value = pinyin(de.departmentName, {
                  style: pinyin.STYLE_FIRST_LETTER, // 设置拼音风格
                  heteronym: true
                }).join('');
                de.value = value;
              }
              vm.department1 = msg.sort(compare)
              console.log(vm.department1)
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      department: function(department) {
        console.log(department)
        var axios = this.axios;
        var vm = this;
        var url ='/department' + '?departmentName=' + department;
        axios.post(url)
          .then(function(response) {
            console.log(response)
            if (response.status == 200) {
              vm.getDepartment()
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      beforeClose({name,
        position,
        instance
      }) {
        switch (position) {
          case 'left':
          case 'cell':
          case 'outside':
            instance.close();
            break;
          case 'right':
            this.$dialog.confirm({
              message: '确定删除吗？'
            }).then(() => {
              this.delete_department(name)
              instance.close();
            });
            break;
        }
      },
      delete_department:function(name){
        var axios = this.axios;
        var vm = this;
        var url ='/department/delete' + '?departmentId=' + name;
        axios.post(url)
          .then(function(response) {
            console.log(response)
            if (response.status == 200) {
              vm.getDepartment()
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      }
    }
  }
</script>

<style scoped="">
  @import url("../../../static/mui/css/mui.indexedlist.css");

  #pullrefresh {
    top: 44px;
  }

  .mui-scroll-wrapper .mui-pull-top-pocket {
    top: 0px;
  }

  .mui-bar {
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  .van-dialog__content{
    padding: 2vw 4vw;
  }
</style>
