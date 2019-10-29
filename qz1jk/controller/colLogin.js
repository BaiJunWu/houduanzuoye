const conn  = require('../db')

module.exports.postLogin = (req, res) => {
    const username = req.body.username
    const password = req.body.password

    if(username == undefined) {
        res.json({
            "code": 400,
            "error": "必须填写用户名"
        })
        return
    }
    if(username.length < 2 || username.length > 18) {
        res.json({
            "code": 400,
            "error": "用户名必须2-18位"
        })
    }
    if(password == undefined) {
        res.json({
            "code": 400,
            "error": "必须要填写密码"
        })
        // 退出当前这个接口的程序，不再向后执行了
        return
    }
    if(password.length < 6 || password.length > 18) {
        res.json({
            "code": 400,
            "error": "密码必须 6 ~ 18 位"
        })
        // 退出当前这个接口的程序，不再向后执行了
        return
    }
    let sql = 'select * from user where username = ?'
    conn.query(sql, username, (error,results,fields)=> {
        if(results.length === 0) {
            res.json({
                "code": 400,
                "error":"账号不存在"
            })
        } else {
            if(results[0].password == password) {
                let token = jwt.sign({
                    id: results[0].id,
                }, secret)
            }
        }
    })
}