<template>
  <div>
    <van-nav-bar title="选择答题的分类" />

    <van-grid >
      <van-grid-item v-for="(item, index) in categories" :key="index" :text="item.cat_name" :to="'/categories/' + item.id + '/question'" @click="steCateName(item.cat_name)" />
    </van-grid>
  </div>
</template>

<script>
export default {
  data () {
    return {
      categories: [
        {
          'id': 1,
          'cat_name': 'HTML'
        }, {
          'id': 2,
          'cat_name': 'CSS'
        },
        {
          'id': 3,
          'cat_name': 'JavaScript'
        },
        {
          'id': 4,
          'cat_name': 'Vue'
        },
        {
          'id': 5,
          'cat_name': 'Express'
        },
        {
          'id': 6,
          'cat_name': 'Node'
        }
      ]
    }
  },
  methods: {
    steCateName (catName) {
      sessionStorage.setItem('catName', catName)
    }
  }
}
</script>
