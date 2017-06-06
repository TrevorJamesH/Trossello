
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('labels', function(table){
      table.increments('id')
      table.integer('board_id')
      table.string('name')
      table.string('color')
      table.foreign('board_id').references('boards.id').onDelete('cascade')
    }),
    knex.schema.createTable('card_labels', function(table){
      table.increments('id')
      table.integer('card_id')
      table.integer('label_id')
      table.foreign('card_id').references('cards.id').onDelete('cascade')
      table.foreign('label_id').references('labels.id').onDelete('cascade')
    })
  ])
};

exports.down = function(knex, Promise) {

  return Promise.all([
    knex.schema.dropTable('labels'),
    knex.schema.dropTable('card_labels'),
  ])
};
