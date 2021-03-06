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

export const removeTransaction = id => dispatch => {
    Axios.delete(`/api/transactions/${id}`)
        .then(response => {
            dispatch({
                type: Types.REMOVE_TRANSACTION,
                payload: {
                    _id: response.data._id,
                    message: response.data.message,
                    isSuccess: true
                }
            })
        })
        .catch(error => console.log(error))
}

export const updateTransaction = (id, transaction) => dispatch => {
    Axios.put(`/api/transactions/${id}`, transaction)
        .then(response => {
            dispatch({
                type: Types.UPDATE_TRANSACTION,
                payload: {
                    transaction: response.data
                }
            })
            console.log(response.data)
        })
        .catch(error => console.log(error))
}