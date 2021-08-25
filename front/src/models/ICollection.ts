import IItem from './IItem'

export default interface ICollection{
  id: string,
  title: string,
  description: string,
  theme: string,
  picture: string,
  items: IItem[],
  likes:string[],
}