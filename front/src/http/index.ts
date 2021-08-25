import axios from "axios";


let Url= ''
if (process.env.NODE_ENV !== 'production'){
  Url = 'http://localhost:4444'
}
else {
  Url = 'https://sleepy-mountain-25461.herokuapp.com/'
}

export const API_URL = Url

const $api= axios.create({
  withCredentials: true,
  baseURL: API_URL,
})

$api.interceptors.request.use((config)=>{
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

export default $api
