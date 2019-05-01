const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const passport = require('passport')


const app = express()
app.use(morgan('dev'))
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(passport.initialize())
require('./passport')(passport)

// Routes
app.use('/api/users', require('./routers/userRouter'))
app.use('/api/transactions', require('./routers/transactionRouter'))

app.get('/', (req, res) => {
    res.json('Welcome to Our Application')
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Server is running is port ${PORT}`)
    mongoose.connect('mongodb://localhost:27017/money-management-app', { useNewUrlParser: true }, () => {
        console.log('Database Connected...')
    });
})