<template>
  <div class="me">
    <img
      class="user-poster"
      src="https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png"
    />

    <van-grid clickable :column-num="4">
      <van-grid-item icon="send-gift-o" text="待付款" to />
      <van-grid-item icon="balance-list-o" text="待接单" to />
      <van-grid-item icon="tosend" text="待发货" to />
      <van-grid-item icon="logistics" text="已发货" to />
    </van-grid>

    <van-cell-group class="group">
        <van-cell icon="records" title="全部订单" is-link />
    </van-cell-group>

    <van-cell-group>
      <van-cell icon="points" title="我的积分" is-link />
      <van-cell icon="gold-coin-o" title="我的优惠券" is-link />
      <van-cell icon="gift-o" title="我收到的礼物" is-link />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  created () {
    const token = sessionStorage.getItem('token')
    if (token === null) {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less">
html,body {
    margin: 0;
    padding: 0;
    background-color: #f8f8f8;
}
img {
  width: 100%;
  height: 53vw;
  display: block;
}

.group {
   margin-bottom: 15px;
}
</style>
