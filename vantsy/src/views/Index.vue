<template>
  <div>
    <van-nav-bar title="选择答题的分类" />

    <van-grid>
      <van-grid-item
        v-for="(item, index) in categories"
        :key="index"
        :text="item.cat_name"
        :to="'/categories/' + item.id + '/question'"
        @click="steCateName(item.cat_name)"
      />
    </van-grid>
  </div>
</template>

<script>
export default {
  created () {
    // 获取页面数据
    this.$http.get('/categories').then(res => {
      this.categories = res.data.data
    })
  },
  data () {
    return {
      categories: [1]
    }
  },
  methods: {
    steCateName (catName) {
      sessionStorage.setItem('catName', catName)
    }
  }
}
</script>
