const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(morgan('dev'))
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json('Welcome to Our Application')
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Server is running is port ${PORT}`)
})