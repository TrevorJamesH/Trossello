import knex from './knex'


const getRecords = (table) =>
  knex.table(table).select('*')

const getRecordById = (table, id) =>
  knex.table(table).where('id', id).first('*')

const getUsers = () =>
  getRecords('users')

const getUserById = (id) =>
  knex.table('users').where('id', id).first('*')

const getBoardsByUserId = (userId) =>
  knex.table('boards')
    .select('boards.*')
    .join('user_boards', 'boards.id', '=', 'user_boards.board_id')
    .whereIn('user_boards.user_id', userId)
    .where('archived', false)

const getBoardMoveTargetsForUserId = (userId) =>
  getBoardsByUserId(userId).then(boards =>
    knex.table('lists')
      .select('lists.*')
      .count('cards.id AS card_count')
      .join('cards', 'cards.list_id', '=', 'lists.id')
      .whereIn('lists.board_id', boards.map(board => board.id))
      .orderBy('lists.board_id', 'asc')
      .orderBy('lists.order', 'asc')
      .groupBy('lists.id')
      .then(lists => {
        lists.forEach(lists => lists.card_count = Number(lists.card_count))
        boards.forEach(board => {
          board.lists = lists.filter(list => list.board_id === board.id)
        })
        return boards
      })
  )

const getUsersForBoard = (board) => {
  return knex.table('users')
    .select('users.*')
    .join('user_boards', 'users.id', '=', 'user_boards.user_id' )
    .whereIn('user_boards.board_id', board.id)
    .then( users => {
      board.users = users
      return board
    })
}

const getLabelsForBoard = (board) => {
  console.log('getLabelsForBoard ran')
  return knex.table('labels')
  .select('*')
  .where('board_id', board.id)
  .then( labels => {
    board.labels = labels
    console.log(labels)
    return board
  })
}

const getBoardById = (id) =>
  getRecordById('boards', id)
    .then( board => {
      if (board){
        return Promise.all([
          getListsAndCardsForBoard(board),
          getUsersForBoard(board),
          getLabelsForBoard(board),
        ]).then( () => board)
      }else{
        return Promise.resolve(board)
      }
    })

const getSearchResult = (userId, searchTerm) => {
  if (!searchTerm) return Promise.resolve([])
  return knex.table('cards')
    .select('*')
    .join('user_boards', 'cards.board_id', '=', 'user_boards.board_id')
    .whereIn('user_boards.user_id', userId)
    .where(knex.raw('archived = false AND lower(content) LIKE ?', `%${searchTerm.toLowerCase()}%`))
    .orderBy('id', 'asc')
}

const getListsAndCardsForBoard = (board) => {
  return knex.table('lists')
    .select('*')
    .where({
      board_id: board.id
    })
    .orderBy('order', 'asc')
    .then(lists => {
      board.lists = lists
      const listIds = lists.map(list => list.id)
      return knex.table('cards')
        .select('*')
        .whereIn('list_id', listIds)
        .orderBy('list_id', 'asc')
        .orderBy('order', 'asc')
        .then(cards => {
          board.cards = cards
          return board
        })
    })
}

const getListById = (id) =>
  getRecordById('lists', id)


const getCardById = (id) => {
  // getRecordById('cards', id)
  return knex.table('cards')
  .select('*')
  .where('id',id)
  .innerJoin('card_labels','cards.id','card_labels.card_id')
  .innerJoin('labels', 'card_labels.label_id', 'labels.id')
}

// INVITES

const getInviteByToken = (token) => {
  return knex.table('invites')
    .select('*')
    .where('token', token)
    .first()
}

// const getLabelsByCard = ( card ) => {
//   return knex
//   .select('*')
//   .from('card_labels')
//   .where('card_id', card.id )
//   .innerJoin('labels','card_labels.label_id','labels.id')
// }
//
// const getLabelsByBoard = ( board ) => {
//   return knex.table('labels')
//   .select('*')
//   .where('labels.board_id', board.id )
// }

export default {
  // getLabelsByCard,
  // getLabelsByBoard,
  getUsers,
  getUserById,
  getCardById,
  getSearchResult,
  getBoardsByUserId,
  getBoardById,
  getListById,
  getInviteByToken,
  getBoardMoveTargetsForUserId,
}
