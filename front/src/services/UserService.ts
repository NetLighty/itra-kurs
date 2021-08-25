import {AxiosResponse} from "axios"
import $api from "../http"
import IUser from "../models/IUser"

export default class UserService{
  static fetchUsers():Promise<AxiosResponse<IUser[]>>{
    return $api.get<IUser[]>('/users')
  }

  static fetchUser(id : string):Promise<AxiosResponse<IUser>>{
    return $api.get<IUser>('/users/'+id)
  }

  static async blockUser(id : string): Promise<void>{
    return $api.post('/block/'+id)
  }

  static async unBlockUser(id : string): Promise<void>{
    return $api.post('/unblock/'+id)
  }

  static async changeTheme(id : string): Promise<void>{
    return $api.post('/changeTheme/'+id)
  }

  static async setAdminRole(id : string): Promise<void>{
    return $api.post('/makeAdmin/'+id)
  }

  static async setUserRole(id : string): Promise<void>{
    return $api.post('/makeUser/'+id)
  }
}