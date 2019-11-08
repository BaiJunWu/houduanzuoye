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

app.get(`/api/v1/index_goods/:id(\\d+)`, (req, res) => {
    let sql = `select * from index_goods where id=?`
    
    // let sql = `select * from index_goods WHERE set ?`
    // 获取id
    let id = req.params.id
    db.query(sql, id, (err, results, fields) => {
        if (err) {
            res.json({
                "code": 400,
                "error": err
            })
        } else {
            res.json({
                "code": 200,
                "data": results[0]
            })
        }
    })
})

app.listen(9999, () => {
    console.log('成功！监听：127.0.0.1:9999')
})