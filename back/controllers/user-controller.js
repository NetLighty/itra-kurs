const userService = require('../service/user-service.js')
const {validationResult}= require('express-validator')
const ApiError= require('../exceptions/api-error.js')

class UserController{
  async registration(req, res, next){
    try{
      const errors = validationResult(req)
      if(!errors.isEmpty()){
        return next(ApiError.BadRequest('Validation error', errors.array()))
      }
      const {username, email, password}= req.body
      const userData= await userService.registration(username, email, password)
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 3*24*60*60*1000, httpOnly: true})
      return res.json(userData)
    }
    catch (e){
      next(e)
    }
  }

  async login(req, res, next){
    try{
      const {username, password}= req.body
      const userData= await userService.login(username, password)
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 4*24*60*60*1000, httpOnly: true})
      return res.json(userData)
    }
    catch (e){
      next(e)

    }
  }

  async logout(req, res, next){
    try{
      const {refreshToken} = req.cookies
      const token = await userService.logout(refreshToken)
      res.clearCookie('refreshToken')
      return res.json(token)
    }
    catch (e){
      next(e)
    }
  }

  async getUsers(req, res, next){
    try{
      const users = await userService.getAllUsers()
      return res.json(users)
    }
    catch (e){
      next(e)
    }
  }

  async getUser(req, res, next){
    try{
      const {id} = req.params
      if(!id){
        return next(ApiError.BadRequest('incorrect _id '))
      }
      const user = await userService.getUserById(id)
      return res.json(user)
    }
    catch (e){
      next(e)
    }
  }

  async setAdminRole(req, res, next){
    try{
      const {id} = req.params
      if(!id){
        return next(ApiError.BadRequest('incorrect _id '))
      }
      await userService.setAdminRole(id)
      return res.status(200)
    }
    catch (e){
      next(e)
    }
  }

  async setUserRole(req, res, next){
    try{
      const {id} = req.params
      if(!id){
        return next(ApiError.BadRequest('incorrect _id '))
      }
      await userService.setUserRole(id)
      return res.status(200)
    }
    catch (e){
      next(e)
    }
  }

  async blockUser(req, res, next){
    try{
      const {id} = req.params
      if(!id){
        return next(ApiError.BadRequest('incorrect _id '))
      }
      await userService.blockUser(id)
      return res.status(200)
    }
    catch (e){
      next(e)
    }
  }

  async unBlockUser(req, res, next){
    try{
      const {id} = req.params
      if(!id){
        return next(ApiError.BadRequest('incorrect _id '))
      }
      await userService.unBlockUser(id)
      return res.status(200)
    }
    catch (e){
      next(e)
    }
  }

  async changeTheme(req, res, next){
    try{
      const {id} = req.params
      console.log(req.params)
      if(!id){
        return next(ApiError.BadRequest('incorrect _id '))
      }
      await userService.changeTheme(id)
      return res.status(200)
    }
    catch (e){
      next(e)
    }
  }

  async refresh(req, res, next){
    try{
      const {refreshToken} = req.cookies
      const userData= await userService.refresh(refreshToken)
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 4*24*60*60*1000, httpOnly: true})
      return res.json(userData)
    }
    catch (e){
      next(e)

    }
  }

}

module.exports = new UserController()