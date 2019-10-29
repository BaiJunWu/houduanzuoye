const express = require('express')
const config = require('./config')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
app.use(cors())

// 配置bodyparser
app.use(bodyParser.urlencoded({ extended:true }))
app.use(bodyParser.json())
// 配置路由'
// 引入登陆路由
const login = require('./routers/login')
app.use('/api/v1', login)


app.listen(config.server.port,
    config.server.ip,
    () => {
        console.log(`启动，监听端口：${config.server.ip}:${config.server.port}!`)
    }
)