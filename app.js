const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('hello world!')
})
const PORT = 3000
app.listen(PORT, (req, res) => {
    console.log('This aplication running in http://localhost:'+PORT)
})