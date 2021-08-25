const jwt = require('jsonwebtoken')
const tokenModel = require('../models/token-model.js')

const secretAccess = 'hehehe'
const secretRefresh = 'ehehehe'

class TokenService{
  generateTokens(payload){
    const accessToken = jwt.sign(payload, secretAccess, {expiresIn: '15m'})
    const refreshToken = jwt.sign(payload, secretRefresh, {expiresIn: '3d'})
    return{
      accessToken,
      refreshToken
    }
  }

  validateAccessToken(token){
    try{
      const userData= jwt.verify(token, secretAccess)
      return userData
    }
    catch(e){
      return null
    }
  }

  validateRefreshToken(token){
    try{
      const userData= jwt.verify(token, secretRefresh)
      return userData
    }
    catch(e){
      return null
    }
  }

  async saveToken(userId, refreshToken){
    const tokenData = await tokenModel.findOne({user: userId})
    if(tokenData){
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }
    const token = await tokenModel.create({user: userId, refreshToken})
    return token
  }

  async removeToken(refreshToken){
    const tokenData = await tokenModel.deleteOne({refreshToken})
    return tokenData
  }

  async findToken(refreshToken){
    const tokenData = await tokenModel.findOne({refreshToken})
    return tokenData
  }
}

module.exports= new TokenService()