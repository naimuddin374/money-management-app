const transactionValidator = transaction => {
    let error = {}

    if (!transaction.type) {
        error.type = 'Please Provide Type'
    }

    if (!transaction.amount) {
        error.amount = 'Please Provide Amount'
    }

    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}

module.exports = transactionValidator