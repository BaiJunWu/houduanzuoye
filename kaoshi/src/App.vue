<template>
  <div id="app">
    <router-view />
    <van-tabbar :route="true">
      <van-tabbar-item icon="home-o" to="/guc">首页</van-tabbar-item>
      <van-tabbar-item icon="search">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" to="/gucc">购物车</van-tabbar-item>
      <van-tabbar-item icon="setting-o" :to="to">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      num: '',
      to: ''
    }
  },
  created () {
    // var id = JSON.parse(localStorage.getItem('id'))
    // // console.log(id.count)
    // var num1 = 0
    // for (var i = 0; i < id.length; i++) {
    //   // console.log(i)
    //   num1 += id[i].count
    // }
    // this.num = num1

    const token = localStorage.getItem('token')
    if (!token) {
      this.to = '/login'
    } else {
      this.to = '/me'
    }
  }
}
</script>
