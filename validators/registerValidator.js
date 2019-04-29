const validator = require('validator')

const registerValidator = user => {
    let error = {}

    if (!user.name) {
        error.name = 'Please Provide Name.'
    }

    if (!user.email) {
        error.email = 'Please Provide Email'
    } else if (!validator.isEmail(user.email)) {
        error.email = 'Please Provide a Valid Email'
    }

    if (!user.password) {
        error.password = 'Please Provide Password'
    } else if (!user.confirmPassword) {
        error.confirmPassword = 'Please Provide Confirm Password'
    } else if (user.password !== user.confirmPassword) {
        error.confirmPassword = 'Confirm Password Doesn\'t Match'
    }

    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}

module.exports = registerValidator