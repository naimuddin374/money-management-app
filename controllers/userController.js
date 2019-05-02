const jwt = require('jsonwebtoken')
const registerValidator = require('../validators/registerValidator')
const loginValidator = require('../validators/loginValidator')
const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const { serverError, resourceError, validationError } = require('../util/error')

// Registration, Login, Logout Controller
module.exports = {
    register(req, res) {
        let { name, email, password, confirmPassword } = req.body
        let validate = registerValidator({ name, email, password, confirmPassword })
        if (!validate.isValid) {
            return validationError(res, 'Validation Failed!', validate.error)
        }
        User.findOne({ email })
            .then(user => {
                if (user) {
                    return resourceError(res, 'Email Already Exist')
                } else {
                    bcrypt.hash(password, 11, (err, hash) => {
                        if (err) {
                            return serverError(res, error)
                        }
                        // User Registered 
                        let user = new User({
                            name,
                            email,
                            password: hash,
                            balance: 0,
                            income: 0,
                            expense: 0,
                            transaction: []
                        })
                        user.save()
                            .then(user => {
                                res.status(201).json({
                                    message: 'User Registered Successful',
                                    user
                                })
                            })
                            .catch(error => {
                                return serverError(res, error)
                            })
                    })
                }
            })
            .catch(error => {
                return serverError(res, error)
            })
    },
    login(req, res) {
        let { email, password } = req.body
        let validate = loginValidator({ email, password })

        if (!validate.isValid) {
            return validationError(res, 'Validation Failed!', validate.error)
        }

        User.findOne({ email })
            .then(user => {
                if (!user) {
                    return resourceError(res, 'User Not Found!')
                } else {
                    bcrypt.compare(password, user.password, function (err, result) {
                        if (err) {
                            return serverError(res, err)
                        }
                        if (!result) {
                            return resourceError(res, 'Password Doesn\'t Match')
                        }
                        let token = jwt.sign({
                            _id: user._id,
                            name: user.name,
                            email: user.email,
                        }, 'SECRET', { expiresIn: '1d' })

                        res.status(200).json({
                            message: 'Login Successful',
                            token: `Bearer ${token}`
                        })
                    });
                }
            })
            .catch(error => serverError(res, error))
    },
    getAll(req, res) {
        User.find()
            .then(user => {
                if (!user) {
                    return res.status(200).json({
                        message: 'User Not Found!'
                    })
                }
                res.status(200).json(user)
            })
            .catch(error => serverError(res, error))
    },
    getDetail(req, res) {
        let { userId } = req.params
        User.findById(userId)
            .then(user => {
                if (!user) {
                    return res.status(200).json({
                        message: 'User Not Found!'
                    })
                }
                res.status(200).json(user)
            })
            .catch(error => serverError(res, error))
    },
    remove(req, res) {
        User.findByIdAndRemove(req.params.userId)
            .then(user => {
                res.status(200).json({
                    message: 'User Deleted Successful',
                    user
                })
            })
            .catch(error => serverError(res, error))
    }
}