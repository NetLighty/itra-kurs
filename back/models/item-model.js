const {Schema, model}= require('mongoose')

const ItemSchema= new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  id:{type: String, unique: true, required: false},
  name:{type: String, unique: false, required: true},
  tags:{type: String, unique: false, required: true},
  likes:[{type: Schema.Types.ObjectId, ref: 'User'}],
  comments:[{type: Schema.Types.ObjectId, ref: 'Comment'}],
})

module.exports = model('Item', ItemSchema)