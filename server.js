const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const path = require('path')


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

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.get('/', (req, res) => {
    res.json('Welcome to Our Application')
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Server is running is port ${PORT}`)
    // mongoose.connect('mongodb://localhost:27017/money-management-app', { useNewUrlParser: true }, () => {
    //     console.log('Database Connected...')
    // });
    // mongoose.connect(`mongodb+srv://${process.env.dbUsername}:${process.env.dbPassword}@monyappcluster-zn1vp.mongodb.net/test?retryWrites=true`, { useNewUrlParser: true }, () => {
    //     console.log('Database Connected...')
    // });
})