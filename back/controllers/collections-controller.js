const CollectionService = require('../service/collection-service')
const UserModel= require('../models/user-model')

class CollectionsController {
  async createCollection(req, res, next) {
    try {
      const {userId, title, description, theme} = req.body
      const picture = req.files.picture
      const newCollection = await CollectionService.createCollection(userId, title, description, theme, picture)
      return res.json(newCollection)
    } catch (e) {
      next(e)
    }
  }

  async findCollectionsByCreator(req, res, next){
    try{
      const {id} = req.params
      const creator= await UserModel.findById(id)
      const collections = await CollectionService.findCollectionsByCreator(creator)
      return res.json(collections)
    }
    catch (e){
      next(e)
    }
  }
}

module.exports = new CollectionsController()

