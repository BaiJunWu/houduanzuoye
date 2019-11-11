<template>
  <div class="index">
    <van-swipe :autoplay="3000" indicator-color="blue" :height="200">
      <van-swipe-item v-for="(item,index) in Image" :key="index">
        <img :src="item.image" />
      </van-swipe-item>
    </van-swipe>

    <van-grid :column-num="4">
      <van-grid-item v-for="(item,index) in ctitle" :key="index" :text="item.cat_name" />
    </van-grid>

    <van-list v-model="loading" :finished="finished" finished-text="没有了" @load="onLoad">
      <van-row class="row">
        <van-col span="12" v-for="(item,index) in Goods" :key="index">
          <img :src="item.image" />
          <span>{{item.goods_name}}</span>
          <van-button type="warning" size="small" @click="addCategories(item.id)">加入购物车</van-button>
          <span class="mn">￥{{item.price}}</span>
        </van-col>
      </van-row>
    </van-list>
  </div>
</template>

<script>
export default {
  created () {
    this.$http.get('/main_ad_images').then(res => {
      // console.log(res)
      this.Image = res.data.data
      // console.log(this.Image)
    })
    this.$http.get('/index_categories').then(res => {
      // console.log(res)
      this.ctitle = res.data.data
    })
    let id = JSON.parse(localStorage.getItem('id'))
    if (id) {
      this.categor = id
    }
  },
  data () {
    return {
      Image: [],
      ctitle: [],
      Goods: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 10,
      categor: []
    }
  },
  methods: {
    onLoad () {
      this.$http
        .get(`/index_goods?page=${this.page}&per_page=${this.per_page}`)
        .then(res => {
          for (let i = 0; i < res.data.data.length; i++) {
            this.Goods.push(res.data.data[i])
          }
          this.loading = false
          this.page++
          if (this.Goods.length >= 40) {
            this.finished = true
          }
        })
    },
    addCategories (id) {
      // (1)先取出来保存的商品 然后转回对象
      let cart = JSON.parse(localStorage.getItem('cart'))

      // 判断购物车中是否有这件商品
      if (cart === null) {
        // 先把cart设置成一个对象
        cart = {
          ids: [id],
          info: {
            [id]: {
              // [id]: 解析id的值 使用id的值作为建
              count: 1,
              ischk: true
            }
          }
        }
      } else {
        //   判断购物车中是否已经有这件商品的ID
        if (cart.ids.indexOf(id) === -1) {
          cart.ids.push(id)
          cart.info[id] = {
            count: 1,
            ischk: true
          }
        } else {
          cart.info[id].count++
        }
      }

      //   // (2)修改cart
      //   cart.ids.push(id)
      //   cart.info[id] = {
      //     count: 1,
      //     ischk: true
      //   }
      // let cart = {
      //   ids: [id], // 保存所有的商品
      //   info: {
      //     id: { //  使用id作建
      //       count: 1,
      //       ischk: true // 默认勾选
      //     }
      //   }
      // }
      // (3)在保存到浏览器中
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }
}
</script>

<style lang="less">
.van-swipe {
  background-color: aqua;
}

.row {
  text-align: center;
}

.row span {
  display: inline-block;
}

.row img {
  display: block;
  width: 130px;
  height: 130px;
  background-color: aqua;
  margin: auto;
}

.row .van-button {
  text-align: center;
  display: block;
  margin: auto;
}

.mn {
  color: red;
  font-weight: 700;
}
.van-list__finished-text {
  margin-bottom: 100px;
}
</style>
