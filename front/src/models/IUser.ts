export default interface IUser{
  id:string,
  username: string,
  email:string,
  password: string,
  role: string,
  theme: string,
  status: string,
  likesDelivered: string[],
}