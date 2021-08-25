const UserModel= require('../models/user-model.js')
const CollectionModel= require('../models/collection-model.js')
const ApiError = require('../exceptions/api-error.js')
const fileService = require('./file-service.js')

class CollectionService {
  async createCollection(userId, title, description, theme, picture) {
    const creator = await UserModel.findById(userId)
    if(!creator){
      throw ApiError.BadRequest(`User doesn't exist`)
    }
    const fileName = fileService.saveFile(picture)
    const newCollection = await CollectionModel.create({user: creator, title, description, theme, picture: fileName})
    await CollectionModel.findByIdAndUpdate(newCollection._id, {id: newCollection._id})
    //await UserModel.findByIdAndUpdate(user._id, {collection: user._id})
  }

  async findCollectionsByCreator(creator){
    const collections = await CollectionModel.find({user: creator})
    return collections
  }

  async createItem(userId, CollectionId, title, description, theme, picture) {
    /*const candidateEmail = await UserModel.findOne({email})
    if (candidateEmail) {
      throw ApiError.BadRequest(`User with this email already exists`)
    }
    const candidateUsername = await UserModel.findOne({username})
    if (candidateUsername) {
      throw ApiError.BadRequest(`User with this username already exists`)
    }*/
    const creator = await UserModel.findById(userId)
    if(!creator){
      throw ApiError.BadRequest(`User doesn't exist`)
    }
    const newCollection = await CollectionModel.create({user: creator, title, description, theme})
    await CollectionModel.findByIdAndUpdate(newCollection._id, {id: newCollection._id})
    //await UserModel.findByIdAndUpdate(user._id, {collection: user._id})
  }
}

module.exports = new CollectionService()