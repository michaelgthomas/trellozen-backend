const env = process.env.NODE_ENV || 'development'
const Koa = require('koa')
const app = new Koa()
const { router } = require('./router')

const port = process.env.PORT || 3000

app.use(router.routes()).use(router.allowedMethods())
if (env !== 'test') {
  require('dotenv-safe').config({ silent: true })
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
