const validator = require('validator')

const loginValidator = user => {
    let error = {}

    if (!user.email) {
        error.email = 'Please Provide Email'
    } else if (!validator.isEmail(user.email)) {
        error.email = 'Please Provide a Valid Email'
    }

    if (!user.password) {
        error.password = 'Please Provide Password'
    }

    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}

module.exports = loginValidator