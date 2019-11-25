<template>
  <div class="home">
    <van-row>
      <van-col span="8">
        <van-cell-group>
          <van-field label="商品名称" v-model="name" />
        </van-cell-group>
      </van-col>
      <van-col span="8">
        <van-cell-group>
          <van-field label="价格" v-model="parce" />
        </van-cell-group>
      </van-col>
      <van-col span="8">
        <van-cell-group>
          <van-field label="数量" v-model="num" />
        </van-cell-group>
      </van-col>
    </van-row>
    <van-button type="primary" @click="addCategories()">加入购物车</van-button>

    <table border="2" bordercolor="black" cellspacing="0" cellpadding="1">
      <tr>
        <th>编号</th>
        <th>编号</th>
        <th>名称</th>
        <th>价格</th>
        <th>数量</th>
        <th>小计</th>
        <th>删除</th>
      </tr>
      <tr v-for="(item,index) in cart" :key="index">
        <td><van-checkbox
          :label-disabled="true"
          v-model="cart[index].ischk" />
        </td>
        <td>{{index}}</td>
        <td>{{item.name}}</td>
        <td>{{item.parce}}</td>
        <td>
          <van-stepper slot="num" v-model="cart[index].num" />
        </td>
        <td>{{item.parce * item.num}}</td>
        <td>
          <van-button type="primary" @click="deleteGoods(index)">删除</van-button>
        </td>
      </tr>
    </table>

    <van-submit-bar :price="totalPrice" button-text="提交订单">
      <van-checkbox v-model="chkAll">全选</van-checkbox>
      <van-button type="primary" @click="deleteGood()">删除所选</van-button>
      <span slot="tip">
        你的收货地址不支持同城送,
        <span>修改地址</span>
      </span>
    </van-submit-bar>
  </div>
</template>

<script>
export default {
  created () {
    let cart = JSON.parse(localStorage.getItem('cart'))
    this.cart = cart
  },
  data () {
    return {
      name: '',
      parce: '',
      num: '',
      cart: [],
      index: 0
    }
  },
  methods: {
    deleteGoods (index) {
      this.cart.splice(index, 1)
    },
    deleteGood () {
      this.cart = this.cart.filter(function (val) {
        return !val.ischk
      })
    },
    addCategories () {
      let name = this.cart.findIndex(name => name.name === this.name)
      // console.log(name)
      if (name === -1) {
        this.cart.push({
          name: this.name,
          parce: this.parce,
          num: this.num,
          ischk: true,
          total: 0
        })
      } else {
        return false
      }
      localStorage.setItem('cart', JSON.stringify(this.cart))
    }
  },
  computed: {
    chkAll: {
      // 只读
      get: function () {
        // 循环所有商品
        for (let i in this.cart) {
          if (this.cart[i].ischk === false) {
            return false
          }
        }

        return true
      },
      //   当修改时 这个函数调用
      set: function (newValue) {
        for (let i in this.cart) {
          this.cart[i].ischk = newValue
        }
      }
    },
    totalPrice: function () {
      let sum = 0 // 保存总价
      //   循环数组
      for (var i = 0; i < this.cart.length; i++) {
        if (this.cart[i].ischk) {
          sum += this.cart[i].parce * this.cart[i].num
          // console.log(sum)
        }
      }
      return sum * 100
    }
  },
  watch: {
    cart: {
      deep: true, // 深度监听（监听对象时）
      handler: function () {
        // 把 cart 写到浏览器中
        localStorage.setItem('cart', JSON.stringify(this.cart))
      }
    }
  }
}
</script>

<style>
</style>
