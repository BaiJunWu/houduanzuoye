const conn = require('../db')
const jwt = require('jsonwebtoken')
const { secret_key } = require('../config')
// 登陆
module.exports.postLogin = (req, res) => {
    const username = req.body.username
    const password = req.body.password

    if (username == undefined) {
        res.json({
            "code": 400,
            "error": "必须填写用户名"
        })
        return
    }
    if (username.length < 2 || username.length > 18) {
        res.json({
            "code": 400,
            "error": "用户名必须2-18位"
        })
    }
    if (password == undefined) {
        res.json({
            "code": 400,
            "error": "必须要填写密码"
        })
        // 退出当前这个接口的程序，不再向后执行了
        return
    }
    if (password.length < 6 || password.length > 18) {
        res.json({
            "code": 400,
            "error": "密码必须 6 ~ 18 位"
        })
        // 退出当前这个接口的程序，不再向后执行了
        return
    }
    conn.query('select * from user where username = ?', username, (error, results, fields) => {
        // console.log(results)
        if (results[0]) {
            // 成功的话就和数据库里的password做对比
            if (results[0].password == password) {
                // 生成token
                let token = jwt.sign({
                    id: results[0].id,
                }, secret_key, {
                    expiresIn: '2h'
                })
                res.json({
                    "code": 200,
                    "token": token
                })
            } else {
                res.json({
                    "code": 400,
                    "error": "密码错误！"
                })
            }
        } else {
            res.json({
                "code": 400,
                "error": "账号不存在"
            })
        }
    })
}
// 查询多个及分页的原理
module.exports.getLogins = (req, res) => {
    let pagenum = req.query.pagenum || 1
    let pagesize = req.query.pagesize || 5
    let sortid = req.query.sortId || 'id'
    let sortway = req.query.sortway || 'asc'
    let name = req.query.name

    // 计算出翻页的limit原理
    let offset = (pagenum - 1) * pagesize
    let limit = `limit ${offset},${pagesize}`

    let orderby = `order by ${sortid} ${sortway}`

    // 拼出搜索的where
    let where = ''
    let data = []
    if(name) {
        where = 'where username like ?'
        data[0] = `%${name}%`
    }

    let sql = `select id,username from ${表明} ${where} ${orderby} ${limit}`
    conn.query(sel, data, (error, results, fields) => {
        // 查询出总的记录数
        sql = `select count(*) total from ${biaoming} ${where}`
        conn.query(sql, data, (error1,results1,fields1) => {
            if(error) {
                results.json({
                    "code": 400,
                    "error": error
                })
            }else {
                res.json({
                    "code": 200,
                    "total": results1[0].total,
                    "data": results
                })
            }
        })
    })
}

// 查询一个
module.exports.getLogin = (req, res) => {
    let sql =  `select id,username from ${表明} where id=?`
    // 获取id
    let id = req.params.id
    conn.query(sql,id,(err,results,fields)=>{
        if(err) {
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
}
// 修改
module.exports.putLogin = (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let sql = `update from ${表明} set ? where id = ?`
    let data = {
        username,
        password
    }
    let id = req.params.id
    conn.query(sql, [data,id], (err,results,fields) => {
        if(err) {
            res.json({
                "code": 400,
                "error": err
            })
        } else {
            res.json({
                "code": 200
            })
        }
    })
}

module.exports.deleteLogin = (req, res) => {
    let sql = `delete from ${biaoming} where id=?`
    let id = req.params.id
    conn.query(sql, id, (error,results,fields) => {
        if(error) {
            res.json({
                "code": 400,
                "error": error
            })
        } else {
            res.json({
                "code": 200
            })
        }
    })
}