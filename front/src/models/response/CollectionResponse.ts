import ICollection from "../IUser";

export interface CollectionResponse{
  accessToken: string,
  refreshToken: string,
  collection: ICollection,
}