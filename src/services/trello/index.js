// const { TRELLO_API_KEY, TRELLO_TOKEN } = process.env

function fetchTrelloBoard (ctx) {
  ctx.body = 'Fetching board details'
}

function postNewTodo (ctx) {
  ctx.body = 'Todo posted'
}

function postNewDoing (ctx) {
  ctx.body = 'Doing posted'
}

module.exports = {
  fetchTrelloBoard, postNewTodo, postNewDoing
}
