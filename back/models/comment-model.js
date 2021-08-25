const {Schema, model}= require('mongoose')
//const ItemSchema = require('./item-model').schema

const CommentSchema= new Schema({
  commentatorId: {type: Schema.Types.ObjectId, ref: 'User'},
  text:{type: String},
})

module.exports = model('Comment', CommentSchema)