import Mock from 'mockjs'
// 获取答题分类
Mock.mock('http://localhost:9999/api/v1/categories', 'get', {
  'ok': 1,
  'data|30-100': [
    {
      'id|+1': 1,
      'cat_name': '@ctitle'
    }
  ]
})

// 查询学生做题信息
Mock.mock(/http:\/\/localhost:9999\/api\/v1\/categories\/\d+\/questions_count_info/, 'get', {
  'ok': 1,
  'data': {
    'total': 130,
    'right': 100,
    'wrong': 10,
    'undo': 20
  }
})

// 根据分类查询题目
Mock.mock(/http:\/\/localhost:9999\/api\/v1\/categories\/\d+\/questions\?type=(all|wrong|right|undo)/, 'get', {
  'ok': 1,
  'data|30-100': [
    {
      'id|+1': 1,
      'title': '@ctitle',
      'options': '@ctitle(5,10),@ctitle(5,10),@ctitle(5,10),@ctitle(5,10)',
      'right': '@integer(0,3)',
      'category_id': 1
    }
  ]
})
