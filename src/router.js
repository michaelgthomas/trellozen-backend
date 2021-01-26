const Router = require('@koa/router')
const { healthCheck, fetchTrelloBoard, fetchTrelloLists, createTodoCard } = require('./services')
const koaBody = require('koa-body')

const router = new Router()

router.get('/', healthCheck)
router.get('/trello/board', fetchTrelloBoard)
router.get('/trello/lists/:boardid', fetchTrelloLists)
router.post('/trello/todo/add/:boardid', koaBody(), createTodoCard)

module.exports = { router }
