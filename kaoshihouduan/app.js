const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors())
// app.use(bodyParser.json(cors()))

const mysql = require('mysql');
let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'fullstack12shop'
})
// 链接mysql
db.connect(err => {
    if (err) {
        console.log('链接失败！')
    }
})

app.get('/api/v1/main_ad_images', (req, res) => {
    let sql = 'select image,link from index_image'
    db.query(sql, (err, data) => {
        if (err) {
            res.json({
                'ok': 0,
                'error': err
            })
        } else {
            res.json({
                'ok': 1,
                'data': data
            })
        }
    })
})

app.get('/api/v1/index_categories', (req, res) => {
    let sql = 'select * from index_categories'
    db.query(sql, (err, data) => {
        if (err) {
            res.json({
                'ok': 0,
                'error': err
            })
        } else {
            res.json({
                'ok': 1,
                'data': data
            })
        }
    })
})

app.get('/api/v1/index_goods', (req, res) => {
    let page = req.query.page || 1
    let per_page = req.query.per_page || 20

    let offset = (page - 1) * per_page

    let sql = `select * from index_goods limit ${offset},${per_page}`
    db.query(sql, (err, data) => {
        if (err) {
            res.json({
                'ok': 0,
                'error': err
            })
        } else {
            res.json({
                'ok': 1,
                'data': data
            })
        }
    })
})

app.get(`/api/v1/index_good`, (req, res) => {
    let id = req.query.id
    // console.log(id)
    // 拼问号
    let wenhao = []  // 把所有的问号都存在这这个数组里面
    // 所有的id都用，隔开
    id = id.split(',')
    // 循环id这个数组把？存进wenhao数组中
    id.forEach(v => {
        wenhao.push('?')
    })
    // 把wenhao的数组转换成字符串
    wenhao = wenhao.join(',')
    let sql = `SELECT * FROM index_goods WHERE id IN(${wenhao})`
    
    db.query(sql, id, (err, data) => {
        if (err) {
            res.json({
                "code": 0,
                "error": err
            })
        } else {
            res.json({
                "code": 1,
                'sql': sql,
                "data": data
            })
        }
    })
})

// 注册
app.post(`/api/v1/regist`, (req, res) => {
    // 获取登陆手机号
    const mobile = req.body.mobile
    // 获取登陆密码
    const password = req.body.password
    // 验证手机号的正则
    let mobileRE = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
    // 判断手机号格式正确不正确 判断传过来的手机号如果和正则不相符
    if(!mobileRE.test(mobile)) {
        // 那么返回不正确
        res.json({
            'ok': 0,
            'error': '手机号格式不正确！'
        })
        
        return
    }
})

// 注册接口
app.post('/api/v1/regist', (req, res)=>{
    // 1. 接收表单中的参数
    let mobile = req.body.mobile
    let password = req.body.password
    // 2. 验证数据
    let mobileRE = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
    if( !mobileRE.test(mobile) ) {
        res.json({
            'ok': 0,
            'error': '手机号码格式不正确！'
        })
        // 退出函数，后面代码不再执行了
        return
    }
    if(password.length < 6 || password.length > 18) {
        res.json({
            'ok': 0,
            'error': '密码必须是 6~18 位'
        })
        // 退出函数，后面代码不再执行了
        return
    }
    // 3. 先到数据库中查询这个手机号码是否已经存在
    let sql = 'SELECT COUNT(*) c FROM shop_users WHERE mobile = ?'
    db.query(sql, mobile, (err, data) => {
        // 如果执行 SQL 失败
        if(err) {
            res.json({
                'ok': 0,
                'error': err
            })
            // 退出函数，后面代码不再执行了
            return
        } else {
            // 如果手机号码已经在数据库中存在
            if(data[0].c > 0) {
                res.json({
                    'ok': 0,
                    'error': '手机号码已经存在！请换一个~'
                })
                // 退出函数，后面代码不再执行了
                return
            } else {
                // 把账号插入到数据库中
                sql = 'INSERT INTO shop_users SET ?'
                // 获取当前时间的时间戳，以秒为单位
                let regtime = parseInt(new Date().getTime()/1000)
                let data = {
                    // 字段  :  插入的值
                    mobile: mobile,
                    password: md5(password + secret),
                    regtime: regtime
                }
                // 执行 SQL
                db.query(sql, data, (err, data)=>{
                    if(err) {
                        res.json({
                            'ok': 0,
                            'error': err
                        })
                        // 退出函数，后面代码不再执行了
                        return
                    } else {
                        res.json({
                            'ok': 1
                        })
                    }
                })
            }
        }
    })
})

// 登录接口
app.post('/api/v1/login', (req, res)=>{
    // 1. 接收表单中的参数
    let mobile = req.body.mobile
    let password = req.body.password

    // console.log(mobile, password)

    // 2. 验证数据
    let mobileRE = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
    if( !mobileRE.test(mobile) ) {
        res.json({
            'ok': 0,
            'error': '手机号码格式不正确！'
        })
        // 退出函数，后面代码不再执行了
        return
    }
    if(password.length < 6 || password.length > 18) {
        res.json({
            'ok': 0,
            'error': '密码必须是 6~18 位'
        })
        // 退出函数，后面代码不再执行了
        return
    }
    // 3. 先使用手机号码到数据库中查询把这个账号的ID和密码查询出来，因为要用
    let sql = 'SELECT id,password FROM shop_users WHERE mobile = ?'
    db.query(sql, mobile, (err, data) => {
        // 如果执行 SQL 失败就返回失败的原因
        if(err) {
            res.json({
                'ok': 0,
                'error': err
            })
            // 退出函数，后面代码不再执行了
            return
        } else {
            // 为了测试，把数据库的返回结果返回看看什么样
            // res.json(data)
            if(data.length === 0) {
                res.json({
                    'ok': 0,
                    'error': '账号不存在！'
                })
                // 退出函数，后面代码不再执行了
                return
            } else {
                // 如果账号存在，再判断用户输入的密码和数据库中查询出来的密码是否一致
                if(data[0].password === md5(password + secret)) {
                    // 登录成功之后，我们需要生成一个令牌
                    // 生成令牌时要把这个用户的信息（ID 等）保存到令牌
                    let token = jsonwebtoken.sign({
                        id: data[0].id
                    }, secret, {expiresIn: 60*60*24*30*6})   // 半年，过期时间 ，单位秒
                    res.json({
                        'ok': 1,
                        'data': {
                            'token': token
                        }
                    })
                    // 退出函数，后面代码不再执行了
                    return
                } else {
                    res.json({
                        'ok': 0,
                        'error': '密码错误！'
                    })
                    // 退出函数，后面代码不再执行了
                    return
                }
            }
        }
    })
})

app.listen(9999, () => {
    console.log('成功！监听：127.0.0.1:9999')
})