import {AxiosResponse} from 'axios'
import $api from '../http'
import ICollection from '../models/ICollection'
import {CollectionResponse} from '../models/response/CollectionResponse'
import {AuthResponse} from "../models/response/AuthResponse";

export default class CollectionService {
  static fetchCollections(id: string): Promise<AxiosResponse<ICollection[]>> {
    return $api.get<ICollection[]>('/collections/'+id)
  }

  static createCollection(title: string, description: string, theme: string, userId: string): Promise<AxiosResponse<AuthResponse>>{
    return $api.post<AuthResponse>('/createCollection', {title, description, theme, userId})
  }

}