import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { loadTransactions } from '../../store/actions/transactionActions'
import CreateTransaction from './CreateTransaction'

class Transaction extends React.Component {

    componentDidMount() {
        this.props.loadTransactions()
    }

    state = {
        createModalOpen: false
    }
    openCreateModal = () => {
        this.setState({
            createModalOpen: true
        })
    }
    closeCreateModal = () => {
        this.setState({
            createModalOpen: false
        })
    }

    render() {
        let { auth, transactions } = this.props
        return (
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <h1>Hello, {auth.user.name}</h1>
                    <p>Your email address {auth.user.email}</p>
                    <br />
                    <button
                        className="btn btn-success"
                        onClick={this.openCreateModal}
                    >
                        Add New
                    </button>
                    <CreateTransaction
                        isOpen={this.state.createModalOpen}
                        isClose={this.closeCreateModal}
                    />
                    <br />
                    <ul className="list-group">
                        {
                            transactions.map(transaction => (
                                <li className="list-group-item" key={transaction._id}>
                                    <p><b>Type:</b> {transaction.type}</p>
                                    <p><b>Amount:</b> {transaction.amount}</p>
                                    <p><b>Note:</b> {transaction.note}</p>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    transactions: state.transactions
})

export default connect(mapStateToProps, { loadTransactions })(Transaction)