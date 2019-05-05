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
        case Types.REMOVE_TRANSACTION: {
            let transactions = [...state.transactionData]
            return transactions.filter(tran => {
                return tran._id !== action.payload._id
            })
        }
        case Types.UPDATE_TRANSACTION: {
            let transactions = [...state.transactionData]
            return transactions.map(tran => {
                if (tran._id === action.payload.transaction._id) {
                    return action.payload.transaction
                }
                return tran
            })
        }
        default: return state
    }
}

export default transactionReducer