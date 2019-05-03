import Axios from 'axios'
import * as Types from './types'

export const loadTransactions = () => dispatch => {
    Axios.get('/api/transactions')
        .then(response => {
            dispatch({
                type: Types.LOAD_TRANSACTIONS,
                payload: {
                    transactions: response.data
                }
            })
        })
        .catch(error => console.log(error))
}

export const createNewTransaction = transaction => dispatch => {
    Axios.post('/api/transactions', transaction)
        .then(response => {
            dispatch({
                type: Types.CREATE_TRANSACTION,
                payload: {
                    transaction: response.data.transaction,
                    message: response.data.message,
                    isSuccess: true
                }
            })
        })
        .catch(error => {
            dispatch({
                type: Types.TRANSACTIONS_ERROR,
                payload: {
                    error: error.response.data.error,
                    message: error.response.data.message,
                    isSuccess: false
                }
            })
        })
}