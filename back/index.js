if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const express = require('express')
const cors = require('cors')
const events= require('events')
const cookieParser= require('cookie-parser')
const mongoose= require('mongoose')
const router = require('./router/index.js')
const errorMiddleware = require('./middlewares/error-middleware.js')
const fileUpload = require('express-fileupload')

let origin=null
process.env.NODE_ENV !== 'production' ? origin = 'http://localhost:3000' : 'https://react-kurs-itra.herokuapp.com'
const PORT =process.env.PORT || 4444;
const app = express()

app.use(express.json())
app.use(express.static('static'))
app.use(fileUpload({}))
app.use(cookieParser())
app.use(cors({
  credentials: true,
  origin: origin
}))
app.use('', router)
app.use(errorMiddleware)

const emitter = new events.EventEmitter()

const start = async () => {
  try{
    await mongoose.connect('mongodb+srv://user:1111@cluster0.zod8h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology:true
    })
    app.listen(PORT,()=> console.log(`server started on port: ${PORT}`))
  }
  catch (e){
    console.log(e)
  }
}

start()


app.get('get-messages', (req, res)=>{
    emitter.once('newMessage', (message)=>{
    res.json(message)
  })
})

app.post('new-messages', ((req, res)=>{
  const message= req.body
  emitter.emit('newMessage', message)
  res.status(200)
}))
