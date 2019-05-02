const router = require('express').Router()
const { login, register, getAll, getDetail, remove } = require('../controllers/userController')
const authenticate = require('../authenticate')

// Login 
router.post('/login', login)

router.post('/register', register)

router.get('/', authenticate, getAll)

router.get('/:userId', authenticate, getDetail)

router.delete('/:userId', remove)


module.exports = router