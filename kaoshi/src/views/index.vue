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
      let Id = this.categor.findIndex(Id => Id.id === id)
      // console.log(Id)
      if (Id === -1) {
        this.categor.push({ id: id, count: 1 })
        // console.log(this.categor)
      } else {
        this.categor[Id].count++
      }
      this.$parent.num++
      localStorage.setItem('id', JSON.stringify(this.categor))
    }
  }
}
</script>

<style>
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
