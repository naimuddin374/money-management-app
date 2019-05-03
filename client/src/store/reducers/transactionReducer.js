import * as Types from '../actions/types'

const init = {
    transactionData: {},
    error: {},
    message: '',
    isSuccess: false
}

const transactionReducer = (state = init, action) => {
    switch (action.type) {
        case Types.LOAD_TRANSACTIONS: {
            return {
                transactionData: action.payload.transactions,
                error: {}
            }
        }
        case Types.CREATE_TRANSACTION: {
            let transactions = [...state.transactionData]
            transactions.unshift(action.payload.transaction)
            return {
                transactionData: transactions,
                error: {},
                message: action.payload.message,
                isSuccess: action.payload.isSuccess,
            }
        }
        case Types.TRANSACTIONS_ERROR: {
            return {
                ...state,
                error: action.payload.error,
                message: action.payload.message,
                isSuccess: action.payload.isSuccess
            }
        }
        default: return state
    }
}

export default transactionReducer