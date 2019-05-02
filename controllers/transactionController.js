const Transaction = require('../model/transactionModel')
const User = require('../model/userModel')
const { serverError, resourceError, validationError } = require('../util/error')
const transactionValidator = require('../validators/transactionValidator')

module.exports = {
    create(req, res) {
        let { type, amount, note } = req.body
        let userId = req.user._id

        let transaction = new Transaction({
            type, amount, note, author: userId
        })
        let validate = transactionValidator({ type, amount })
        if (!validate.isValid) {
            return validationError(res, 'Validation Failed!', validate.error)
        }
        transaction.save()
            .then(trans => {
                User.findById(userId)
                    .then(user => {
                        if (type === 'income') {
                            user.income = user.income + amount
                            user.balance = user.balance + amount
                        } else if (type === 'expense') {
                            user.expense = user.expense + amount
                            user.balance = user.balance - amount
                        }
                        user.transaction.push(trans._id)
                        User.findByIdAndUpdate(userId, { $set: user }, { new: true })
                            .then(result => {
                                res.status(201).json({
                                    message: 'Transaction Created Successful',
                                    ...result._doc
                                })
                            })
                            .catch(error => serverError(res, error))
                    })
                    .catch(error => serverError(res, error))
            })
            .catch(error => serverError(res, error))
    },
    getAll(req, res) {
        Transaction.find({author: req.user._id})
            .then(transaction => {
                if (transaction.length === 0) {
                    return res.status(200).json({
                        message: 'Transaction Not Found!'
                    })
                }
                res.status(200).json(transaction)
            })
            .catch(error => serverError(res, error))
    },
    getDetail(req, res) {
        let { transactionId } = req.params
        Transaction.findById(transactionId)
            .then(transaction => {
                if (transaction.length === 0) {
                    return res.status(200).json({
                        message: 'Transaction Not Found!'
                    })
                }
                res.status(200).json(transaction)
            })
            .catch(error => serverError(res, error))
    },
    update(req, res) {
        let { transactionId } = req.params
        User.findByIdAndUpdate(transactionId, { $set: req.body }, { new: true })
            .then(result => {
                res.status(200).json({
                    message: 'Updated Successful',
                    ...result
                })
            })
            .catch(error => serverError(res, error))
    },
    remove(req, res) {
        let { transactionId } = req.params
        Transaction.findByIdAndRemove(transactionId)
            .then(result => {
                res.status(200).json({
                    message: 'Transaction Deleted Successful',
                    ...result
                })
            })
            .catch(error => serverError(res, error))
    }
}