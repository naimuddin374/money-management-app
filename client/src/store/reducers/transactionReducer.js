import * as Types from '../actions/types'

const transactionReducer = (state = [], action) => {
    switch (action.type) {
        case Types.LOAD_TRANSACTIONS: {
            return action.payload.transactions
        }
        default: return state
    }
}

export default transactionReducer