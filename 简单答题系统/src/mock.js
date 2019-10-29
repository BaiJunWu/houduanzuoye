import Mock from 'mockjs'

// 登录
Mock.mock('http://localhost:9999/api/v1/access_token', 'post', {
  'ok': '@integer(0,1)',
  'error': '用户名或者密码错误！',
  'data': {
    'token': 'fdasdfdsaffew',
    'integral': '@integer(23,99999)'
  }
})

// 分类接口
Mock.mock('http://localhost:9999/api/v1/categories', 'get', {
  'ok': 1,
  'data|5-20': [
    {
      'id|+1': 1,
      'cat_name': '@ctitle'
    }
  ]
})

// 根据分类获取题目
Mock.mock(/http:\/\/localhost:9999\/api\/v1\/categories\/\d+\/questions/, 'get', {
  'ok': 1,
  'data|10-100': [
    {
      'id|+1': 1,
      'title': '@ctitle',
      'options': ['@ctitle', '@ctitle', '@ctitle', '@ctitle'], // 所有的选项
      'right': '@integer(0,3)' // 正确答案的下标
    }
  ]
})

// 排行榜接口
Mock.mock('http://localhost:9999/api/v1/topn', 'get', {
  'ok': 1,
  'data': [
    {
      'username': '@cname',
      'integral': '@integer(32,99999)'
    }
  ]
})

// 提交答案
// \d ：0~9 中的任意一个数字
// [0123] 或者 [0-3] ：0-3之间任意一个数字
Mock.mock(/http:\/\/localhost:9999\/api\/v1\/questions\/\d+\/[0123]/, 'post', {
  'ok': 1,
  'error': 'ID 不正确'
})
