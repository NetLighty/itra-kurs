import {makeAutoObservable} from "mobx"
import AuthService from "../services/AuthService"
import IUser from "../models/IUser"
import {AuthResponse} from "../models/response/AuthResponse"
import axios from "axios"
import {API_URL} from "../http"
import UserService from "../services/UserService"
import CollectionService from "../services/CollectionService";

export default class Store{
  user= {} as IUser
  isAuth= false
  isLoading= false
  loginIncorrectUsername= false
  loginIncorrectPassword= false
  registrationEmailExist= false
  registrationUsernameExist= false
  theme='light'

  constructor() {
    makeAutoObservable(this)
  }

  setAuth(bool: boolean){
    this.isAuth=bool
  }

  setLoginIncorrectUsername(value: boolean) {
    this.loginIncorrectUsername = value;
  }

  setLoginIncorrectPassword(value: boolean) {
    this.loginIncorrectPassword = value;
  }

  setRegistrationEmailExist(value: boolean) {
    this.registrationEmailExist = value;
  }

  setRegistrationUsernameExist(value: boolean) {
    this.registrationUsernameExist = value;
  }

  setLoading(bool: boolean){
    this.isLoading=bool
  }

  setUser(user: IUser){
    this.user= user
  }

  async login(username: string, password: string){
    try{
      const response = await AuthService.login(username, password)
      console.log(response)
      localStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    }
    catch(e){
      this.analyseLoginResponse(e.response?.data?.message)
    }
  }

  analyseLoginResponse(e: string){
    e==='Password is incorrect'
      ? this.loginIncorrectPassword=true : this.loginIncorrectPassword=false
    e==='User doesn\'t exist'
      ? this.loginIncorrectUsername=true : this.loginIncorrectUsername=false
  }

  async setTheme(theme: string){
    try{
      localStorage.setItem('theme', theme)
      this.theme=theme
      if(this.isAuth) {
        await UserService.changeTheme(this.user.id)
      }
    }
    catch(e){
      console.log(e.response?.data?.message)
    }
  }

  async registration(username: string, email: string, password: string){
    try{
      const response = await AuthService.registration(username, email, password)
      localStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    }
    catch(e){
      this.analyseRegistrationResponse(e.response?.data?.message)
    }
  }

  analyseRegistrationResponse(e: string){
    e===`User with this email already exists`
      ? this.registrationEmailExist=true : this.registrationEmailExist=false
    e===`User with this username already exists`
      ? this.registrationUsernameExist=true : this.registrationUsernameExist=false
  }

  async logout(){
    try{
      await AuthService.logout()
      localStorage.removeItem('token')
      this.setAuth(false)
      this.setUser({} as IUser)
    }
    catch(e){
      console.log(e.response?.data?.message)
    }
  }

  async checkAuth(){
    this.setLoading(true)
    try{
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
      console.log(response)
      localStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    }
    catch(e){
      console.log(e.response?.data?.message)
    }
    finally {
      this.setLoading(false)
    }
  }

  async createCollection(title: string, description: string, theme: string, userId: string){
    try{
      await CollectionService.createCollection(title, description, theme, userId)
    }
    catch(e){
      console.log(e)
    }
  }

}