const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const connection = require('./src/helpers/mysql')
const path = require('path');

connection.connect(function (error) {
    if (error) throw error;
    console.log('Database has connected!');
});

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, 'public')))

app.use(cors())
app.use('/', require('./src/routes'))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('This aplication running in http://localhost:' + PORT)
})

