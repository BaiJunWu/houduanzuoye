<template>
  <div class="about">
    <div class="title">购物车</div>
    <van-card price="2.00" desc="描述信息" title="商品标题" thumb="https://img.yzcdn.cn/vant/t-thirt.jpg">
      <div slot="num">
        <van-stepper v-model="value" />
        <p>小计: ￥325.23元</p>
      </div>
      <div slot="footer">
        <van-checkbox />
      </div>
    </van-card>

    <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checked">全选</van-checkbox>
      <span slot="tip">
        你的收货地址不支持同城送,
        <span>修改地址</span>
      </span>
    </van-submit-bar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: 1
    }
  }
}
</script>

<style>
.title {
  width: 100%;
  height: 50px;
  background-color: #ff6064;
  color: #ffffff;
  font-weight: 600;
  text-align: center;
  line-height: 50px;
}

.van-submit-bar {
  bottom: 50px;
}
</style>
