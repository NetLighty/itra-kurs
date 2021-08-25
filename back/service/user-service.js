const UserModel= require('../models/user-model.js')
const bcrypt = require('bcrypt')
const tokenService = require('./token-service.js')
const UserDto= require('../dtos/user-dto.js')
const ApiError = require('../exceptions/api-error.js')

class UserService{
  async registration(username, email, password){
    const candidateEmail = await UserModel.findOne({email})
    if(candidateEmail){
      throw ApiError.BadRequest(`User with this email already exists`)
    }
    const candidateUsername = await UserModel.findOne({username})
    if(candidateUsername){
      throw ApiError.BadRequest(`User with this username already exists`)
    }
    const hashPassword= await bcrypt.hash(password, 4)
    const user= await UserModel.create({username, email,
      password: hashPassword, role: 'user', theme: 'light', status: 'active'})
    await UserModel.findByIdAndUpdate(user._id, {id: user._id})
    const userDto= new UserDto(user)// id, email
    const tokens = tokenService.generateTokens({...userDto})
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return{...tokens, user: userDto}
  }

  async login(username, password){
    const user= await UserModel.findOne({username})
    if(!user){
      throw ApiError.BadRequest(`User doesn't exist`)
    }
    const isPassEquals  = await bcrypt.compare(password, user.password)
    if(!isPassEquals){
      throw ApiError.BadRequest(`Password is incorrect`)
    }
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({...userDto})

    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {...tokens, user: userDto}
  }

  async logout(refreshToken){
    const token = await tokenService.removeToken(refreshToken)
    return token
  }

  async refresh(refreshToken){
    if(!refreshToken){
      throw ApiError.UnauthorizedError()
    }
    const userData = tokenService.validateRefreshToken(refreshToken)//Если не валиден, то вернёт null (это не точно)
    const tokenFromDb = await tokenService.findToken(refreshToken)//аналогично, только если не найдёт в базе
    if(!userData|| !tokenFromDb){
      throw ApiError.UnauthorizedError()
    }
    const user = await UserModel.findById(userData.id)
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({...userDto})

    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return {...tokens, user: userDto}
  }

  async getAllUsers(){
    const users = await UserModel.find()
    return users
  }

  async getUserById(id){
    const user = await UserModel.findById(id)
    return user
  }

  async setAdminRole(id){
    await UserModel.findByIdAndUpdate(id, {role: 'admin'})
  }

  async setUserRole(id){
    await UserModel.findByIdAndUpdate(id, {role: 'user'})
  }

  async blockUser(id){
    await UserModel.findByIdAndUpdate(id, {status: 'blocked'})
  }

  async unBlockUser(id){
    await UserModel.findByIdAndUpdate(id, {status: 'active'})
  }

  async changeTheme(id){
    const user= await UserModel.findById(id)
    user.theme==='light' ? await UserModel.findByIdAndUpdate(id , {theme:'dark'})
        : await UserModel.findByIdAndUpdate(id, {theme: 'light'})
  }

}

module.exports = new UserService()