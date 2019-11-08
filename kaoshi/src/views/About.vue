<template>
  <div class="about">
    <div class="title">购物车</div>
    <van-checkbox-group v-model="checkedGoods" ref="checkboxGroup" @change="(checkedG())">
      <van-card
        v-for="(item,index) in categor"
        :key="item.id"
        :price="item.price"
        :title="item.goods_name"
        :thumb="item.image"
      >
        <div slot="num">
          <van-stepper @change="totalPriceFn()" v-model="value[index]" />
          <p>小计: ￥{{(item.price * value[index]).toFixed(2)}}元</p>
        </div>
        <div slot="footer">
          <van-checkbox :name="item.id"></van-checkbox>
        </div>
      </van-card>
    </van-checkbox-group>

    <van-submit-bar :price="totalPrice"
      :disabled="!checkedGoods.length"
      :button-text="submitBarText">
      <van-checkbox v-model="checked" @click="checke()">全选</van-checkbox>
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
    var id = JSON.parse(localStorage.getItem('id'))
    for (var i = 0; i < id.length; i++) {
      this.value.push(id[i].count)
      this.$http.get(`/index_goods/${id[i].id}`).then(res => {
        this.categor.push(res.data.data)
      })
    }
  },
  data () {
    return {
      // 选中的
      checkedGoods: [],
      // 购物列表
      categor: [],
      // 对象
      value: [],
      // 全选
      checked: false,
      // 总价
      totalPrice: null
    }
  },
  methods: {
    checkedG () {
      this.totalPriceFn()
    },
    checke () {
      if (this.checked) {
        this.$refs.checkboxGroup.toggleAll()
      } else {
        this.$refs.checkboxGroup.toggleAll(true)
      }
      this.totalPriceFn()
    },
    totalPriceFn () {
      this.totalPrice = null

      for (let i = 0; i < this.categor.length; i++) {
        for (let j = 0; j < this.checkedGoods.length; j++) {
          if (this.categor[i].id === this.checkedGoods[j]) {
            this.totalPrice += Number(this.categor[i].price * this.value[i] * 100)
            // console.log(this.categor[i].price * this.value[i] * 100)
          }
        }
      }
    }
  },
  computed: {
    submitBarText () {
      const count = this.checkedGoods.length
      return '结算' + (count ? `(${count})` : '')
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
