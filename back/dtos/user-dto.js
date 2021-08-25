module.exports = class UserDto{
  email
  id
  username
  role
  status
  theme

  constructor(model) {
    this.email = model.email
    this.id= model._id
    this.username=model.username
    this.role=model.role
    this.status=model.status
    this.theme=model.theme
  }
}