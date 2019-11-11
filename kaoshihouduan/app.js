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

app.listen(9999, () => {
    console.log('成功！监听：127.0.0.1:9999')
})