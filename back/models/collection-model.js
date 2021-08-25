const {Schema, model}= require('mongoose')
//const ItemSchema = require('./item-model').schema

const CollectionSchema= new Schema({
  id: {type: String, unique: true, required: false},
  picture: {type: String, unique: true, required: false},
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  title:{type: String, unique: false, required:true},
  description:{type: String, unique:false, required:true},
  theme:{type:String, unique:false, required:true},
  items: [{type: Schema.Types.ObjectId, ref: 'Item'}],
  likes:[{type: Schema.Types.ObjectId, ref: 'User'}],
})

module.exports = model('Collection', CollectionSchema)