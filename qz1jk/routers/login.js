const router = require('express').Router()
const controller = require('../controller/colLogin')
const apiName = 'access_token'

router.post(`/${apiName}`, controller.postLogin)

// 接口名称
// const apiName = 'access_token'

// router.post(`/${apiName}`, (req, res)=>{
//     res.json({
//         "code":200,
//         "msg":"登陆成功"
//     })
// })

module.exports = router