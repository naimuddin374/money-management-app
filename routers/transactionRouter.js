const router = require('express').Router()
const { create, getAll, getDetail, update, remove } = require('../controllers/transactionController')
const authenticate = require('../authenticate')

// Get All Data
router.get('/', authenticate, getAll)

// Create Data
router.post('/', authenticate, create)

// Get Detail Data
router.get('/:transactionId', authenticate, getDetail)

// Update Data
router.put('/:transactionId', authenticate, update)

// Delete Data
router.delete('/:transactionId', authenticate, remove)

module.exports = router