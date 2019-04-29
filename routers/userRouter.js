const router = require('express').Router()
const { login, register } = require('../controllers/userController')

// Login 
router.post('/login', login)

// Register 
router.post('/register', register)


module.exports = router