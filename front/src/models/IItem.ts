import IComment from "./IComment";

export default interface IItem{
  id:string,
  title: string,
  tags:string,
  comments: IComment[],
  likes: string[],
}