const fetch = require('node-fetch')

function errorHandler (ctx, err) {
  ctx.status = err.status || 500
  ctx.body = err.message
  ctx.app.emit('error', err, ctx)
}

async function fetchTrelloBoard (ctx) {
  const { TRELLO_API_URL, TRELLO_API_KEY, TRELLO_TOKEN } = process.env
  try {
    const response = await fetch(
      `${TRELLO_API_URL}/1/members/me/boards?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}`
    )
    const boards = await response.json()

    ctx.body = boards
  } catch (err) {
    errorHandler(ctx, err)
  }
}

async function fetchTrelloLists (ctx) {
  const { TRELLO_API_URL, TRELLO_API_KEY, TRELLO_TOKEN } = process.env
  try {
    const response = await fetch(
      `${TRELLO_API_URL}/1/boards/${ctx.params.boardid}/lists?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}`
    )
    const lists = await response.json()

    const listsWithCards = await Promise.all(
      lists.map(async (list) => {
        const response = await fetch(
          `${TRELLO_API_URL}/1/lists/${list.id}/cards?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}`
        )
        const cards = await response.json()
        return {
          ...list,
          cards
        }
      })
    )

    ctx.body = listsWithCards
  } catch (err) {
    errorHandler(ctx, err)
  }
}

async function createTodoCard (ctx) {
  // The assisgnment specifically states to add the card to the TODO list (not to give the user an option) - thus we specifically search for the To Do list
  // rather than having this dynamic
  // If we were to give the user an option we would pass the list id through as part of the request body
  const { TRELLO_API_URL, TRELLO_API_KEY, TRELLO_TOKEN } = process.env
  try {
    const response = await fetch(
        `${TRELLO_API_URL}/1/boards/${ctx.params.boardid}/lists?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}`
    )
    const lists = await response.json()

    const todoList = lists.find(({ name }) => name === 'To Do')
    const { id: todoListId } = todoList

    const { name: cardName } = JSON.parse(ctx.request.body)
    const postResponse = await fetch(
        `${TRELLO_API_URL}/1/cards?name=${cardName}&idList=${todoListId}&key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}`,
        { method: 'POST' }
    )
    const result = await postResponse.json()

    ctx.body = result
  } catch (err) {
    errorHandler(ctx, err)
  }
}

module.exports = {
  fetchTrelloBoard,
  fetchTrelloLists,
  createTodoCard
}
