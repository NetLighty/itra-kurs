const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.static(__dirname))
app.use(express.static(path.resolve(__dirname)))

app.get('*', (req, res)=>{
  res.sendfile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(PORT)