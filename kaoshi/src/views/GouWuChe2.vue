<template>
  <div class="cart">
    <van-nav-bar title="购物车" />
    <!-- 商品列表 -->
    <van-checkbox
      :label-disabled="true"
      v-model="cart.info[item.id].ischk"
      v-for="(item,index) in goods"
      :key="index"
    >
      <van-card :price="item.price" :title="item.goods_name" :thumb="item.image">
        <!-- 组件插槽的使用 -->
        <van-stepper slot="num" v-model="cart.info[item.id].count" />

        <!-- 自定义右下角 -->
      </van-card>
    </van-checkbox>
    <van-submit-bar :price="totalPrice" button-text="提交订单">
      <van-checkbox v-model="chkAll">全选</van-checkbox>
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
      cart: JSON.parse(localStorage.getItem('cart')), // 获取购物车 如果没有就设置为空数组
      goods: [] // 保存所有的商品信息
    }
  },
  created () {
    // console.log(this.cart)
    if (this.cart !== null) {
      // 把商品id转换成字符串
      this.$http.get('/index_good?id=' + this.cart.ids.join(',')).then(res => {
        // console.log(res)
        this.goods = res.data.data
      })
    }
  },
  //   计算属性 当一个数据需要计算的时候
  computed: {
    // 全选按钮是不是选中状态
    chkAll: {
      // 只读
      get: function () {
        // 循环所有商品
        for (let i in this.cart.info) {
          if (this.cart.info[i].ischk === false) {
            return false
          }
        }

        return true
      },
      //   修改
      //   当修改时 这个函数调用
      set: function (newValue) {
        for (let i in this.cart.info) {
          this.cart.info[i].ischk = newValue
        }
      }
    },
    totalPrice: function () {
      let sum = 0 // 保存总价
      //   循环数组
      this.goods.forEach(c => {
        //   只有勾选的时候才判断
        if (this.cart.info[c.id].ischk) {
          sum += c.price * this.cart.info[c.id].count
        }
      })
      return sum * 100
    }
  }
  //   监听器 监听一个数据 当这个数据发生变化时触发一个函数
  //   注意 如果监听的数据是一个对象 那么需要深度监听
  // watch: {
  //   // 监听cart对象
  //   cart: {
  //     deep: true, // 深度监听 (监听对象时)
  //     headler: function () {
  //       // 把cart写道浏览器中
  //       localStorage.setItem('cart', JSON.stringify(this.cart))
  //     }
  //   }
  // }
}
</script>

<style lang="less">
.cart {
  .van-submit-bar {
    margin-bottom: 50px;
  }
}
</style>
