const Koa = require('koa');
const app = new Koa();
// const cors = require('koa-cors');
// const bodyParser = require('koa-bodyParser');

// 配置路由
// const router = require('./router/index')
// app.use(bodyParser())  // 使用解析上下文插件
// app.use(cors())
// app.use(router.routers())
app.use(async ctx => {
    ctx.body = 'Hello World'
})


app.listen(9999) // 服务器启动端口