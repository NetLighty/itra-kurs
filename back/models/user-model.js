const {Schema, model}= require('mongoose')
const {CollectionSchema} = require('./collection-model').schema

const UserSchema= new Schema({
  id:{type: String},
  username: {type: String, unique: true, required:true},
  email: {type: String, unique: true, required:true},
  password: {type: String, unique: false, required:true},
  role:{type: String, unique: false, required: true},
  status:{type: String, unique:false , required:true},
  theme:{type: String, unique: false, required:true},
  collections:[{type: Schema.Types.ObjectId, ref: 'Collection'}],
  likesDeliveredId:[{type: String}]
})

module.exports = model('User', UserSchema)