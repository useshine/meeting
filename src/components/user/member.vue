<template>
  <div class="lay">
    <van-nav-bar title="所有人员" class="account_title" left-arrow>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <div class="content">
      <van-tree-select height="100%" :items="items" :main-active-index.sync="active">
        <template #content>
          <van-image v-if="active === 0" src="https://img.yzcdn.cn/vant/apple-1.jpg" />
          <van-image v-if="active === 1" src="https://img.yzcdn.cn/vant/apple-2.jpg" />
          <van-image v-if="active === 2" src="https://img.yzcdn.cn/vant/apple-2.jpg" />
          <van-list v-if="active===3">
            <van-cell title="小胡" icon="user-o" size="medium">
              <!-- 使用 right-icon 插槽来自定义右侧图标 -->
              <template #title>
                <span style="font-size: 16px;">小胡，15478545562</span>
              </template>
            </van-cell>
            <van-cell title="小胡" icon="user-o" size="medium">
              <!-- 使用 right-icon 插槽来自定义右侧图标 -->
              <template #title>
                <span style="font-size: 16px;">小胡，15478545562</span>
              </template>
            </van-cell>
          </van-list>
        </template>
      </van-tree-select>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        active: 0,
        items: [{
          text: '全部人员'
        }, {
          text: '财务部'
        }, {
          text: '后勤部'
        }, {
          text: '绘画部'
        }]
      }
    },
  }
</script>

<style scoped="">
  a.van-sidebar-item.van-tree-select__nav-item {
    text-align: center;
    padding: 20px 12px 20px 8px;
  }
</style>
