const router = require('express').Router()
const controller = require('../controller/colLogin')
const apiName = 'access_token'
// 登陆接口
router.post(`/${apiName}`, controller.postLogin)
// 查询多个
router.get(`/${apiName}`, controller.getLogins)
// 查询一个
router.get(`/${apiName}/:id(\\d+)`, controller.getLogin)
// 修改
router.put(`/${apiName}/:id(\\d+)`, controller.putLogin)
// 删除
router.delete(`/${apiName}/:id(\\d+)`, controller.deleteLogin)

module.exports = router