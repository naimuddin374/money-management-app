module.exports = {
    serverError(res, error) {
        console.log(error)
        res.status(500).json({
            message: 'Server Error Occurred',
            error
        })
    },
    resourceError(res, message) {
        res.status(400).json({
            error: {
                message
            }
        })
    },
    validationError(res, message, error) {
        res.status(400).json({
            message,
            error
        })
    }
}