const router = require('express').Router()
const { create, getAll, getDetail, update, remove } = require('../controllers/transactionController')
const authenticate = require('../authenticate')

// Get All Data
router.get('/', authenticate, getAll)

// Create Data
router.post('/', create)

// Get Detail Data
router.get('/:transactionId', getDetail)

// Update Data
router.put('/:transactionId', update)

// Delete Data
router.delete('/:transactionId', remove)

module.exports = router