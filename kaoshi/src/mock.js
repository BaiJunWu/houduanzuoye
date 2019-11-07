import Mock from 'mockjs'

// 获取答题分类
Mock.mock('http://localhost:9999/api/v1/main_ad_images', 'get', {
  'ok': 1,
  'data|4-6': [
    {
      'image': '@image(375x200, #fb0a2a)',
      'link': 'http://www.baidu.com'
    }
  ]
})

Mock.mock('http://localhost:9999/api/v1/index_categories', 'get', {
  'ok': 1,
  'data|8-12': [
    {
      'id|+1': 1,
      'cat_name': '@ctitle(2,4)'
    }
  ]
})

Mock.mock(/http:\/\/localhost:9999\/api\/v1\/index_goods\?page=\d+&per_page=\d+/, 'get', {
  'ok': 1,
  'data|10': [
    {
      'id|+1': 1,
      'goods_name': '@ctitle(2,4)',
      'price': '@integer(1000,9999)',
      'image': '@image(130x130, #fb0a2a)'
    }
  ]
})
