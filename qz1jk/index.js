const express = require('express')
const config = require('./config')
const bodyParser = require('body-parser')
const app = express()
// 配置bodyparser
app.use(bodyParser.urlencoded({ extended:true }))

// 配置路由'
// 引入登陆路由
// app.get('/', (req, res) => res.send('Hello World!'))
const login = require('./routers/login')
app.use('/api/v1', login)


app.listen(config.server.port,
    config.server.ip,
    () => {
        console.log(`启动，监听端口：${config.server.ip}:${config.server.port}!`)
    }
)