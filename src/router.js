const Router = require('@koa/router')
const { healthCheck, fetchTrelloBoard, postNewTodo, postNewDoing } = require('./services')

const router = new Router()

router.get('/', healthCheck)
router.get('/trello/fetchBoard', fetchTrelloBoard)
router.post('/trello/addTodo', postNewTodo)
router.post('/trello/addDoing', postNewDoing)

module.exports = { router }
